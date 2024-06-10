# build

FROM node:18-alpine as build

USER node

WORKDIR /app

COPY prisma ./prisma/

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate && npm run build

# run

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/.env .

COPY --from=build /app/prisma ./prisma

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist

CMD ["node", "dist/main.js"]