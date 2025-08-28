-- DropForeignKey
ALTER TABLE "public"."Estoque" DROP CONSTRAINT "Estoque_produtoId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Estoque" ADD CONSTRAINT "Estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
