FROM node:14-alpine3.13 AS builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i 

COPY . .

RUN npm run build

FROM node:14-alpine3.13

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/*.json ./

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4444

CMD npm run start:prod