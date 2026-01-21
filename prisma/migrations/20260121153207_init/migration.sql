-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "firmName" TEXT,
    "phone" TEXT,
    "preparerName" TEXT,
    "preparerPtin" TEXT,
    "preparerAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ein" TEXT,
    "entityType" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "contactName" TEXT,
    "contactPhone" TEXT,
    "contactEmail" TEXT,
    "taxYearEnd" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Filing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "taxYearOfChange" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "dcn" TEXT,
    "changeType" TEXT,
    "partI" TEXT,
    "partII" TEXT,
    "partIII" TEXT,
    "partIV" TEXT,
    "scheduleA" TEXT,
    "scheduleB" TEXT,
    "scheduleC" TEXT,
    "scheduleD" TEXT,
    "scheduleE" TEXT,
    "section481aAdjustment" DECIMAL,
    "spreadPeriod" INTEGER,
    "completionPercentage" INTEGER NOT NULL DEFAULT 0,
    "lastSavedStep" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Filing_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DcnReference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dcnNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isAutomatic" BOOLEAN NOT NULL DEFAULT true,
    "requires481a" BOOLEAN NOT NULL DEFAULT true,
    "spreadPeriod" INTEGER,
    "requiresScheduleA" BOOLEAN NOT NULL DEFAULT false,
    "requiresScheduleB" BOOLEAN NOT NULL DEFAULT false,
    "requiresScheduleC" BOOLEAN NOT NULL DEFAULT false,
    "requiresScheduleD" BOOLEAN NOT NULL DEFAULT false,
    "requiresScheduleE" BOOLEAN NOT NULL DEFAULT false,
    "revProcReference" TEXT,
    "effectiveDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Client_userId_idx" ON "Client"("userId");

-- CreateIndex
CREATE INDEX "Filing_clientId_idx" ON "Filing"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "DcnReference_dcnNumber_key" ON "DcnReference"("dcnNumber");
