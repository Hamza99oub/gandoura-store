const { loadEnv, defineConfig } = require("@medusajs/framework/utils")

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  plugins: [],
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    ...(process.env.REDIS_URL && { redisUrl: process.env.REDIS_URL }),
    databaseDriverOptions: process.env.NODE_ENV === "production"
      ? { connection: { ssl: { rejectUnauthorized: false } } }
      : {},
    http: {
      host: process.env.HOST || "0.0.0.0",
      port: parseInt(process.env.PORT) || 9000,
      storeCors: process.env.STORE_CORS || "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000",
      authCors: process.env.AUTH_CORS || "http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || "temp-jwt-secret",
      cookieSecret: process.env.COOKIE_SECRET || "temp-cookie-secret",
    },
  },
  admin: {
    disable: false,
  },
  modules: {
    product: true,
    cart: true,
    order: true,
    payment: true,
    fulfillment: true,
    customer: true,
    inventory: true,
  },
})
