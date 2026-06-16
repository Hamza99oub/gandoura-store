export default async ({ container }) => {
  const apiKeyModule = container.resolve("api_key");
  const userModule = container.resolve("user");
  const users = await userModule.listUsers();
  const createdBy = users.length > 0 ? users[0].id : "seed";
  const existing = await apiKeyModule.listApiKeys({ title: "Storefront" });
  if (existing.length > 0) {
    process.stdout.write(`API_KEY=${existing[0].token}\n`);
    return;
  }
  const key = await apiKeyModule.createApiKeys({
    title: "Storefront",
    type: "publishable",
    created_by: createdBy,
  });
  process.stdout.write(`API_KEY=${key.token}\n`);
};
