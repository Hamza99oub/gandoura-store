const { loadEnv, defineConfig } = require("@medusajs/framework/utils")

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  plugins: [],
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.NODE_ENV === "production"
      ? { connection: { ssl: { rejectUnauthorized: false } } }
      : {},
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000",
      authCors: process.env.AUTH_CORS || "http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
  admin: {
    disable: process.env.NODE_ENV === "production",
    path: process.env.ADMIN_PATH || "/app",
  },
})
