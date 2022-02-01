-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imageTitle" TEXT NOT NULL,
    "imageSmall" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "limit" DECIMAL(65,30) NOT NULL,
    "genre" TEXT NOT NULL,
    "isSeries" BOOLEAN NOT NULL DEFAULT false,
    "listId" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "List" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");

-- CreateIndex
CREATE UNIQUE INDEX "List_title_key" ON "List"("title");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
