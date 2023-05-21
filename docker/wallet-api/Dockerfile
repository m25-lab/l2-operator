FROM node:18 AS development

WORKDIR /app

RUN chown node:node /app

RUN ls /app -al

COPY --chown=node:node ../../package.json .
# COPY --chown=node:node ../../yarn.lock .

RUN npm install --frozen-lockfile

COPY --chown=node:node . .

RUN npm run build wallet-api


FROM node:18 AS production

WORKDIR /app

COPY --chown=node:node ../../package.json .
# COPY --chown=node:node yarn.lock .
# COPY .env .
RUN npm install --production

COPY --from=development --chown=node:node /app/dist/apps/wallet-api ./dist/apps/wallet-api
RUN ls /app/dist/apps/wallet-api -al

EXPOSE 3000

CMD ["node", "dist/apps/wallet-api/main"]