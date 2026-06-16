export default async ({ container }) => {
  const product = container.resolve("product");
  const products = await product.listProducts();
  for (const p of products) {
    process.stdout.write(`Product: ${p.title}\n`);
  }

  const variants = await product.listProductVariants();
  process.stdout.write(`Total variants: ${variants.length}\n`);
  for (const v of variants) {
    process.stdout.write(`  Variant: ${v.title} (product: ${v.product_id})\n`);
  }
};
