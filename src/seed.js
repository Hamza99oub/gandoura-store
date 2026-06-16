const { MedusaContainer } = require("@medusajs/framework/utils");

module.exports = async ({ container }) => {
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

  // Create collections
  const collections = [
    {
      id: "col-classic",
      title: "Classic Collection",
      handle: "classic",
    },
    {
      id: "col-premium",
      title: "Premium Collection",
      handle: "premium",
    },
    {
      id: "col-modern",
      title: "Modern Collection",
      handle: "modern",
    },
    {
      id: "col-ceremonial",
      title: "Ceremonial",
      handle: "ceremonial",
    },
  ];

  for (const col of collections) {
    const existing = await productModuleService.listCollections({
      id: col.id,
    });
    if (existing.length === 0) {
      await productModuleService.createCollections(col);
    }
  }

  // Create products
  const products = [
    {
      id: "prod-classic-white",
      title: "Classic White Gandoura",
      handle: "classic-white-gandoura",
      description:
        "A timeless white gandoura crafted from premium cotton. Perfect for everyday elegance with traditional Moroccan tailoring.",
      collection_id: "col-classic",
      categories: [],
      options: [
        { id: "opt-size", title: "Size", values: ["S", "M", "L", "XL", "XXL"] },
      ],
      variants: [
        { id: "var-classic-white-s", title: "S / White", options: { "opt-size": "S" }, prices: [{ amount: 890, currency_code: "mad" }], manage_inventory: false },
        { id: "var-classic-white-m", title: "M / White", options: { "opt-size": "M" }, prices: [{ amount: 890, currency_code: "mad" }], manage_inventory: false },
        { id: "var-classic-white-l", title: "L / White", options: { "opt-size": "L" }, prices: [{ amount: 890, currency_code: "mad" }], manage_inventory: false },
        { id: "var-classic-white-xl", title: "XL / White", options: { "opt-size": "XL" }, prices: [{ amount: 990, currency_code: "mad" }], manage_inventory: false },
        { id: "var-classic-white-xxl", title: "XXL / White", options: { "opt-size": "XXL" }, prices: [{ amount: 1090, currency_code: "mad" }], manage_inventory: false },
      ],
      weight: 400,
      height: 140,
      width: 60,
      length: 30,
    },
    {
      id: "prod-classic-ivory",
      title: "Ivory Silk Gandoura",
      handle: "ivory-silk-gandoura",
      description:
        "Luxurious ivory gandoura woven from the finest silk. Features intricate embroidery along the neckline and cuffs.",
      collection_id: "col-classic",
      options: [
        { id: "opt-size", title: "Size", values: ["M", "L", "XL"] },
      ],
      variants: [
        { id: "var-classic-ivory-m", title: "M / Ivory", options: { "opt-size": "M" }, prices: [{ amount: 1490, currency_code: "mad" }], manage_inventory: false },
        { id: "var-classic-ivory-l", title: "L / Ivory", options: { "opt-size": "L" }, prices: [{ amount: 1490, currency_code: "mad" }], manage_inventory: false },
        { id: "var-classic-ivory-xl", title: "XL / Ivory", options: { "opt-size": "XL" }, prices: [{ amount: 1590, currency_code: "mad" }], manage_inventory: false },
      ],
      weight: 350,
      height: 140,
      width: 60,
      length: 30,
    },
    {
      id: "prod-premium-gold",
      title: "Royal Gold Gandoura",
      handle: "royal-gold-gandoura",
      description:
        "An opulent gandoura adorned with gold-thread embroidery. Handcrafted by master artisans in Fez using traditional techniques.",
      collection_id: "col-premium",
      options: [
        { id: "opt-size", title: "Size", values: ["M", "L", "XL"] },
      ],
      variants: [
        { id: "var-premium-gold-m", title: "M / Gold", options: { "opt-size": "M" }, prices: [{ amount: 2900, currency_code: "mad" }], manage_inventory: false },
        { id: "var-premium-gold-l", title: "L / Gold", options: { "opt-size": "L" }, prices: [{ amount: 2900, currency_code: "mad" }], manage_inventory: false },
        { id: "var-premium-gold-xl", title: "XL / Gold", options: { "opt-size": "XL" }, prices: [{ amount: 3200, currency_code: "mad" }], manage_inventory: false },
      ],
      weight: 500,
      height: 145,
      width: 65,
      length: 35,
      is_giftcard: false,
      discountable: true,
    },
    {
      id: "prod-premium-green",
      title: "Emerald Green Gandoura",
      handle: "emerald-green-gandoura",
      description:
        "Rich emerald green gandoura made from high-quality wool blend. Features subtle geometric patterns inspired by Moroccan architecture.",
      collection_id: "col-premium",
      options: [
        { id: "opt-size", title: "Size", values: ["S", "M", "L", "XL"] },
      ],
      variants: [
        { id: "var-premium-green-s", title: "S / Green", options: { "opt-size": "S" }, prices: [{ amount: 1900, currency_code: "mad" }], manage_inventory: false },
        { id: "var-premium-green-m", title: "M / Green", options: { "opt-size": "M" }, prices: [{ amount: 1900, currency_code: "mad" }], manage_inventory: false },
        { id: "var-premium-green-l", title: "L / Green", options: { "opt-size": "L" }, prices: [{ amount: 1900, currency_code: "mad" }], manage_inventory: false },
        { id: "var-premium-green-xl", title: "XL / Green", options: { "opt-size": "XL" }, prices: [{ amount: 2100, currency_code: "mad" }], manage_inventory: false },
      ],
      weight: 600,
      height: 145,
      width: 65,
      length: 35,
    },
    {
      id: "prod-modern-charcoal",
      title: "Charcoal Linen Gandoura",
      handle: "charcoal-linen-gandoura",
      description:
        "A contemporary take on the traditional gandoura. Cut from breathable linen in a sophisticated charcoal hue. Minimalist design meets Moroccan heritage.",
      collection_id: "col-modern",
      options: [
        { id: "opt-size", title: "Size", values: ["S", "M", "L", "XL", "XXL"] },
      ],
      variants: [
        { id: "var-modern-charcoal-s", title: "S / Charcoal", options: { "opt-size": "S" }, prices: [{ amount: 1200, currency_code: "mad" }], manage_inventory: false },
        { id: "var-modern-charcoal-m", title: "M / Charcoal", options: { "opt-size": "M" }, prices: [{ amount: 1200, currency_code: "mad" }], manage_inventory: false },
        { id: "var-modern-charcoal-l", title: "L / Charcoal", options: { "opt-size": "L" }, prices: [{ amount: 1200, currency_code: "mad" }], manage_inventory: false },
        { id: "var-modern-charcoal-xl", title: "XL / Charcoal", options: { "opt-size": "XL" }, prices: [{ amount: 1350, currency_code: "mad" }], manage_inventory: false },
        { id: "var-modern-charcoal-xxl", title: "XXL / Charcoal", options: { "opt-size": "XXL" }, prices: [{ amount: 1450, currency_code: "mad" }], manage_inventory: false },
      ],
      weight: 450,
      height: 140,
      width: 60,
      length: 30,
    },
    {
      id: "prod-ceremonial-kaftan",
      title: "Ceremonial Grand Gandoura",
      handle: "ceremonial-grand-gandoura",
      description:
        "The pinnacle of Moroccan craftsmanship. This ceremonial gandoura features hand-stitched silver and gold threadwork, adorned with traditional motifs. Worn for weddings and special occasions.",
      collection_id: "col-ceremonial",
      options: [
        { id: "opt-size", title: "Size", values: ["M", "L", "XL"] },
      ],
      variants: [
        { id: "var-ceremonial-m", title: "M / Ivory-Gold", options: { "opt-size": "M" }, prices: [{ amount: 5900, currency_code: "mad" }], manage_inventory: false },
        { id: "var-ceremonial-l", title: "L / Ivory-Gold", options: { "opt-size": "L" }, prices: [{ amount: 5900, currency_code: "mad" }], manage_inventory: false },
        { id: "var-ceremonial-xl", title: "XL / Ivory-Gold", options: { "opt-size": "XL" }, prices: [{ amount: 6500, currency_code: "mad" }], manage_inventory: false },
      ],
      weight: 750,
      height: 150,
      width: 70,
      length: 40,
    },
  ];

  for (const product of products) {
    const existing = await productModuleService.listProducts({
      id: product.id,
    });
    if (existing.length > 0) continue;

    const { variants, options, ...productData } = product;
    const created = await productModuleService.createProducts({
      ...productData,
      options: options.map((o) => ({ title: o.title, values: o.values })),
    });

    // Create variants with prices
    for (const variant of variants) {
      const optionValues = [];
      for (const [key, value] of Object.entries(variant.options)) {
        const opt = created.options.find((o) => o.id === key || o.title === key);
        if (opt) {
          optionValues.push({
            option_id: opt.id,
            value: value,
          });
        }
      }

      await productModuleService.createVariants(created.id, {
        id: variant.id,
        title: variant.title,
        options: optionValues,
        prices: variant.prices.map((p) => ({
          amount: p.amount,
          currency_code: p.currency_code,
          region_id: defaultRegion.id,
        })),
        manage_inventory: variant.manage_inventory,
      });

      // Link variant to default sales channel
      await salesChannelModuleService.linkSalesChannelsToProducts({
        sales_channel_ids: [defaultSalesChannel.id],
        product_ids: [created.id],
      });
    }
  }

  process.stdout.write("Seed completed successfully.\n");
};
