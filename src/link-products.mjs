import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { LINKS, Modules } = require("@medusajs/framework/utils");

export default async ({ container }) => {
  process.stdout.write(`Available registrations:\n`);
  const registrations = container.registrations || [];
  const names = [];
  if (container.registrations) {
    for (const key of Object.keys(container.registrations).sort()) {
      if (key.includes("link") || key.includes("product") || key.includes("channel")) {
        names.push(key);
      }
    }
  }
  process.stdout.write(`  ${names.join("\n  ")}\n`);

  process.stdout.write(`LINKS.ProductSalesChannel: ${LINKS.ProductSalesChannel}\n`);

  const productModuleService = container.resolve("product");
  const salesChannelModuleService = container.resolve("sales_channel");

  const channels = await salesChannelModuleService.listSalesChannels();
  const products = await productModuleService.listProducts();

  if (channels.length === 0 || products.length === 0) {
    process.stdout.write("Missing channels or products\n");
    return;
  }

  const channel = channels[0];
  const remoteLink = container.resolve("remoteLink");

  if (!remoteLink) {
    // Try direct link module
    const linkModule = container.resolve(LINKS.ProductSalesChannel);
    if (linkModule) {
      for (const product of products) {
        await linkModule.create(product.id, channel.id);
        process.stdout.write(`Linked ${product.title} via linkModule\n`);
      }
    }
    return;
  }

  process.stdout.write("remoteLink found, creating links...\n");
  try {
    await remoteLink.create([
      {
        [LINKS.ProductSalesChannel]: {
          product_id: "prod-classic-white",
          sales_channel_id: channel.id,
        },
      },
    ]);
    process.stdout.write("Linked successfully via remoteLink\n");
  } catch (e) {
    process.stdout.write(`Error: ${e.message}\n`);
  }
};
