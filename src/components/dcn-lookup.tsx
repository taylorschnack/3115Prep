"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAllDcns, type DcnReference } from "@/lib/actions/dcn"
import { DCN_CATEGORIES } from "@/lib/constants/dcn"

interface DcnLookupProps {
  onSelect: (dcn: DcnReference) => void
  selectedDcn?: string
}

export function DcnLookup({ onSelect, selectedDcn }: DcnLookupProps) {
  const [open, setOpen] = useState(false)
  const [dcns, setDcns] = useState<DcnReference[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDcns() {
      setLoading(true)
      const data = await getAllDcns()
      setDcns(data)
      setLoading(false)
    }
    loadDcns()
  }, [])

  const filteredDcns = useMemo(() => {
    let filtered = dcns

    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter((dcn) => dcn.category === categoryFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (dcn) =>
          dcn.dcnNumber.toLowerCase().includes(query) ||
          dcn.description.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [searchQuery, categoryFilter, dcns])

  function handleSelect(dcn: DcnReference) {
    onSelect(dcn)
    setOpen(false)
  }

  const getCategoryLabel = (category: string) => {
    return DCN_CATEGORIES.find((c) => c.value === category)?.label || category
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button" className="w-full justify-start">
          <Search className="mr-2 h-4 w-4" />
          {selectedDcn ? `DCN ${selectedDcn} selected` : "Look up DCN..."}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Designated Change Number (DCN) Lookup</DialogTitle>
          <DialogDescription>
            Search for the appropriate DCN from Rev. Proc. 2025-23
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by DCN number or description..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {DCN_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading DCN references...
            </div>
          ) : filteredDcns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No DCNs found matching your search
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDcns.map((dcn) => (
                <div
                  key={dcn.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${selectedDcn === dcn.dcnNumber ? "border-primary bg-primary/5" : ""
                    }`}
                  onClick={() => handleSelect(dcn)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg">DCN {dcn.dcnNumber}</span>
                        <Badge variant={dcn.isAutomatic ? "default" : "secondary"}>
                          {dcn.isAutomatic ? "Automatic" : "Non-Automatic"}
                        </Badge>
                        {dcn.requires481a && (
                          <Badge variant="outline">481(a) Required</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {dcn.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="bg-muted px-2 py-0.5 rounded">
                          {getCategoryLabel(dcn.category)}
                        </span>
                        {dcn.spreadPeriod && (
                          <span>{dcn.spreadPeriod}-year spread</span>
                        )}
                        {dcn.revProcReference && (
                          <span className="flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            {dcn.revProcReference}
                          </span>
                        )}
                      </div>
                    </div>
                    {selectedDcn === dcn.dcnNumber && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
