FROM node:16.6-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:16.6-alpine
WORKDIR /app
COPY package.json .
COPY --from=builder /app/dist ./dist
RUN npm i -g serve
EXPOSE 3000
CMD ["serve","-s","dist","-p","3000"]