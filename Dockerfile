FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

ARG PORT_EXPOSE=5337
ARG PM2_PUBLIC_KEY_ARG=""
ARG PM2_SECRET_KEY_ARG=""
ARG NEW_RELIC_KEY=""

RUN npm install pm2 -g
RUN npm ci i
RUN npx prisma generate
RUN npm run prisma:deploy
RUN npm run prisma:seed

COPY tsconfig.json .
COPY src ./src 
RUN npm run build

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY 50fvqcd9aq8nint
ENV PM2_SECRET_KEY gimlkkifqatypao

COPY . .

EXPOSE ${PORT_EXPOSE}
CMD ["pm2-runtime", "start", "ecosystem.config.js"]