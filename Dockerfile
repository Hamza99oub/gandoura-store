FROM node:20-alpine

RUN apk add --no-cache python3 make g++
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production
EXPOSE 9000

CMD ["sh", "start.sh"]
