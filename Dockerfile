FROM node:19.2-alpine3.16 as dev
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .
CMD ["yarn", "start:dev"]


FROM node:19.2-alpine3.16 as builder
WORKDIR /app
COPY --from=dev /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:19-alpine3.15 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN yarn install --prod --frozen-lockfile

FROM node:19-alpine3.15 as prod
EXPOSE 3000
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD [ "node","dist/main.js"]