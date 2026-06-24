FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --omit=dev && npm install -g @medusajs/cli

COPY . .

EXPOSE 9000

ENV NODE_ENV=production

CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
