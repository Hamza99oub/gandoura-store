export default async ({ container }) => {
  const product = container.resolve("product");
  const products = await product.listProducts({ status: "draft" });
  for (const p of products) {
    await product.updateProducts({ id: p.id }, { status: "published" });
    process.stdout.write(`Published: ${p.title}\n`);
  }
  process.stdout.write("Done\n");
};
