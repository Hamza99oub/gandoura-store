FROM node:20-slim AS builder

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN rm -rf .medusa/types && npm run build

FROM node:20-slim

RUN apt-get update && apt-get install -y python3 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/package.json ./
COPY --from=builder /app/medusa-config.js ./
COPY --from=builder /app/static ./static

EXPOSE 9000

CMD ["npm", "run", "start"]
