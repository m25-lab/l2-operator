FROM node:18 AS development

WORKDIR /app

RUN chown node:node /app

RUN ls /app -al

COPY --chown=node:node ../../package.json .
# COPY --chown=node:node ../../yarn.lock .

RUN npm install --frozen-lockfile

COPY --chown=node:node . .

RUN npm run build admin-api


FROM node:18 AS production

WORKDIR /app

COPY --chown=node:node ../../package.json .
# COPY --chown=node:node yarn.lock .
# COPY .env .
RUN npm install --production

COPY --from=development --chown=node:node /app/dist/apps/admin-api ./dist/apps/admin-api
RUN ls /app/dist/apps/admin-api -al

EXPOSE 3001

CMD ["node", "dist/apps/admin-api/main"]