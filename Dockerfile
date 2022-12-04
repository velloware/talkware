FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

ARG PORT_EXPOSE=5337

RUN npm ci i
RUN npx prisma generate
RUN npm run prisma:deploy
RUN npm run prisma:seed

COPY tsconfig.json .
COPY src ./src 
RUN npm run build

ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true \
  NEW_RELIC_LOG=stdout
ENV NODE_ENV=production

COPY . .

EXPOSE ${PORT_EXPOSE}
CMD ["node", "dist/server.js"]