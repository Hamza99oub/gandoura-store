module.exports = { default: async ({ container }) => {
  const productModuleService = container.resolve("product");
  const regionModuleService = container.resolve("region");
  const salesChannelModuleService = container.resolve("sales_channel");

  // Create default sales channel
  let salesChannels = await salesChannelModuleService.listSalesChannels();
  let defaultSalesChannel;
  if (salesChannels.length === 0) {
    defaultSalesChannel = await salesChannelModuleService.createSalesChannels({
      name: "Default Sales Channel",
      description: "Default sales channel",
    });
  } else {
    defaultSalesChannel = salesChannels[0];
  }

  // Create regions
  let regions = await regionModuleService.listRegions();
  let defaultRegion;
  if (regions.length === 0) {
    defaultRegion = await regionModuleService.createRegions({
      name: "Morocco",
      currency_code: "mad",
      countries: ["ma"],
    });
  } else {
    defaultRegion = regions[0];
  }

  const collections = [
    { id: "col-classic", title: "Classic Collection", handle: "classic" },
    { id: "col-premium", title: "Premium Collection", handle: "premium" },
    { id: "col-modern", title: "Modern Collection", handle: "modern" },
    { id: "col-ceremonial", title: "Ceremonial", handle: "ceremonial" },
  ];

  for (const col of collections) {
    const existing = await productModuleService.listProductCollections({ id: col.id });
    if (existing.length === 0) {
      await productModuleService.createProductCollections(col);
    }
  }

  const products = [
    {
      id: "prod-classic-white",
      title: "Classic White Gandoura",
      handle: "classic-white-gandoura",
      description: "A timeless white gandoura crafted from premium cotton. Perfect for everyday elegance with traditional Moroccan tailoring.",
      collection_id: "col-classic",
      options: [{ title: "Size", values: ["S", "M", "L", "XL", "XXL"] }],
    },
    {
      id: "prod-classic-ivory",
      title: "Ivory Silk Gandoura",
      handle: "ivory-silk-gandoura",
      description: "Luxurious ivory gandoura woven from the finest silk. Features intricate embroidery along the neckline and cuffs.",
      collection_id: "col-classic",
      options: [{ title: "Size", values: ["M", "L", "XL"] }],
    },
    {
      id: "prod-premium-gold",
      title: "Royal Gold Gandoura",
      handle: "royal-gold-gandoura",
      description: "An opulent gandoura adorned with gold-thread embroidery. Handcrafted by master artisans in Fez using traditional techniques.",
      collection_id: "col-premium",
      options: [{ title: "Size", values: ["M", "L", "XL"] }],
    },
    {
      id: "prod-premium-green",
      title: "Emerald Green Gandoura",
      handle: "emerald-green-gandoura",
      description: "Rich emerald green gandoura made from high-quality wool blend. Features subtle geometric patterns inspired by Moroccan architecture.",
      collection_id: "col-premium",
      options: [{ title: "Size", values: ["S", "M", "L", "XL"] }],
    },
    {
      id: "prod-modern-charcoal",
      title: "Charcoal Linen Gandoura",
      handle: "charcoal-linen-gandoura",
      description: "A contemporary take on the traditional gandoura. Cut from breathable linen in a sophisticated charcoal hue.",
      collection_id: "col-modern",
      options: [{ title: "Size", values: ["S", "M", "L", "XL", "XXL"] }],
    },
    {
      id: "prod-ceremonial-kaftan",
      title: "Ceremonial Grand Gandoura",
      handle: "ceremonial-grand-gandoura",
      description: "The pinnacle of Moroccan craftsmanship. Features hand-stitched silver and gold threadwork with traditional motifs.",
      collection_id: "col-ceremonial",
      options: [{ title: "Size", values: ["M", "L", "XL"] }],
    },
  ];

  const variantData = {
    "prod-classic-white": [
      { title: "S / White", options: { Size: "S" }, prices: [{ amount: 890, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "M / White", options: { Size: "M" }, prices: [{ amount: 890, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "L / White", options: { Size: "L" }, prices: [{ amount: 890, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "XL / White", options: { Size: "XL" }, prices: [{ amount: 990, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "XXL / White", options: { Size: "XXL" }, prices: [{ amount: 1090, currency_code: "mad", region_id: defaultRegion.id }] },
    ],
    "prod-classic-ivory": [
      { title: "M / Ivory", options: { Size: "M" }, prices: [{ amount: 1490, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "L / Ivory", options: { Size: "L" }, prices: [{ amount: 1490, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "XL / Ivory", options: { Size: "XL" }, prices: [{ amount: 1590, currency_code: "mad", region_id: defaultRegion.id }] },
    ],
    "prod-premium-gold": [
      { title: "M / Gold", options: { Size: "M" }, prices: [{ amount: 2900, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "L / Gold", options: { Size: "L" }, prices: [{ amount: 2900, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "XL / Gold", options: { Size: "XL" }, prices: [{ amount: 3200, currency_code: "mad", region_id: defaultRegion.id }] },
    ],
    "prod-premium-green": [
      { title: "S / Green", options: { Size: "S" }, prices: [{ amount: 1900, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "M / Green", options: { Size: "M" }, prices: [{ amount: 1900, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "L / Green", options: { Size: "L" }, prices: [{ amount: 1900, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "XL / Green", options: { Size: "XL" }, prices: [{ amount: 2100, currency_code: "mad", region_id: defaultRegion.id }] },
    ],
    "prod-modern-charcoal": [
      { title: "S / Charcoal", options: { Size: "S" }, prices: [{ amount: 1200, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "M / Charcoal", options: { Size: "M" }, prices: [{ amount: 1200, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "L / Charcoal", options: { Size: "L" }, prices: [{ amount: 1200, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "XL / Charcoal", options: { Size: "XL" }, prices: [{ amount: 1350, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "XXL / Charcoal", options: { Size: "XXL" }, prices: [{ amount: 1450, currency_code: "mad", region_id: defaultRegion.id }] },
    ],
    "prod-ceremonial-kaftan": [
      { title: "M / Ivory-Gold", options: { Size: "M" }, prices: [{ amount: 5900, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "L / Ivory-Gold", options: { Size: "L" }, prices: [{ amount: 5900, currency_code: "mad", region_id: defaultRegion.id }] },
      { title: "XL / Ivory-Gold", options: { Size: "XL" }, prices: [{ amount: 6500, currency_code: "mad", region_id: defaultRegion.id }] },
    ],
  };

  for (const product of products) {
    const existing = await productModuleService.listProducts({ id: product.id });
    if (existing.length > 0) {
      process.stdout.write(`Product ${product.title} already exists, skipping.\n`);
      continue;
    }

    const created = await productModuleService.createProducts(product);

    const variants = variantData[product.id] || [];
    for (const v of variants) {
      await productModuleService.createProductVariants({
        ...v,
        product_id: created.id,
      });
    }

    process.stdout.write(`Created product: ${product.title}\n`);
  }

  process.stdout.write("Seed completed successfully.\n");
} };
