const { initializeContainer } = require("@medusajs/framework");
const seed = require("./src/seed");
(async () => {
  try {
    const { container } = await initializeContainer(process.cwd());
    await seed({ container });
    console.log("Seed completed successfully.");
    process.exit(0);
  } catch (e) {
    console.error("Seed failed:", e);
    process.exit(1);
  }
})();
