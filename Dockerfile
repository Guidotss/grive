FROM node:20.5.1 as build 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:20.5.1 as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./


CMD ["node", "./dist/app.js"]


