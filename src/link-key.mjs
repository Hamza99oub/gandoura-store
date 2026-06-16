export default async ({ container }) => {
  const apiKeyModule = container.resolve("api_key");
  const salesChannelModule = container.resolve("sales_channel");

  const keys = await apiKeyModule.listApiKeys({ type: "publishable" });
  const channels = await salesChannelModule.listSalesChannels();

  if (keys.length === 0 || channels.length === 0) {
    process.stdout.write("Missing keys or channels\n");
    return;
  }

  const key = keys[0];
  const channel = channels[0];

  const remoteLink = container.resolve("remoteLink");
  if (remoteLink && typeof remoteLink.create === "function") {
    await remoteLink.create([
      {
        [key.id]: {
          api_key_id: key.id,
          sales_channel_id: channel.id,
        },
      },
    ]);
    process.stdout.write("Linked via remoteLink\n");
    return;
  }

  process.stdout.write(`remoteLink not available, trying direct...\n`);

  try {
    const { LINKS } = require("@medusajs/framework/utils");
    const linkDef = container.resolve(LINKS.PublishableApiKeySalesChannel);
    if (linkDef) {
      await linkDef.create({ publishable_key_id: key.id, sales_channel_id: channel.id });
      process.stdout.write("Linked via linkDef\n");
    }
  } catch (e) {
    process.stdout.write(`Error: ${e.message}\n`);
  }
};
