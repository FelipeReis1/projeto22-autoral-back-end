-- CreateTable
CREATE TABLE "adresses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "cep" VARCHAR(10) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT '2023-06-04'::date,
    "updatedAt" DATE NOT NULL DEFAULT '2023-06-04'::date,

    CONSTRAINT "adresses_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "cart_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" DECIMAL NOT NULL,
    "image" TEXT NOT NULL,
    "itemQuality" DECIMAL NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT '2023-06-04'::date,
    "updatedAt" DATE NOT NULL DEFAULT '2023-06-04'::date,

    CONSTRAINT "products_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "purchaseDate" DATE NOT NULL DEFAULT '2023-06-04'::date,

    CONSTRAINT "purchases_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "stock_pk" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "password" VARCHAR(120) NOT NULL,
    "type" VARCHAR(4),
    "createdAt" DATE NOT NULL DEFAULT '2023-06-04'::date,
    "updatedAt" DATE NOT NULL DEFAULT '2023-06-04'::date,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_fk1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_fk1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_fk0" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
