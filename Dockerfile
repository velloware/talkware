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

RUN curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash && sudo NEW_RELIC_API_KEY=${NEW_RELIC_KEY} NEW_RELIC_ACCOUNT_ID=3721999 /usr/local/bin/newrelic install -n node-agent-installer

COPY tsconfig.json .
COPY src ./src 
RUN npm run build

ENV PM2_PUBLIC_KEY ${PM2_PUBLIC_KEY_ARG}
ENV PM2_SECRET_KEY ${PM2_SECRET_KEY_ARG}

COPY . .

EXPOSE ${PORT_EXPOSE}
CMD ["pm2-runtime", "start", "ecosystem.config.js"]