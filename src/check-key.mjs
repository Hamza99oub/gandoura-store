export default async ({ container }) => {
  const apiKeyModule = container.resolve("api_key");
  const keys = await apiKeyModule.listApiKeys();
  process.stdout.write(`Found ${keys.length} API keys:\n`);
  for (const k of keys) {
    process.stdout.write(`  - ${k.title}: ${k.token} (type: ${k.type}, revoked: ${k.revoked_at})\n`);
  }
};
