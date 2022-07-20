FROM node:16.14.2 as build

ARG SENTRY_DSN
ARG SENTRY_ENV
ARG HTL_CSS
ARG HTL_JS
ARG HTL_IS_TESTING
ARG API_URL
ARG IMAGE_BASE_URL
ARG GA_MEASUREMENT_ID
ARG NEWSLETTER_API

WORKDIR /code

COPY ./.npmrc .
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
RUN npm install sass

COPY . .
RUN npm run build

FROM node:16.14.2-slim as app
WORKDIR /app

COPY --from=build /code/.output/ ./.output/
COPY --from=build /code/.nuxt/ ./.nuxt/
COPY --from=build /code/node_modules/ ./node_modules/
COPY --from=build /code/package.json .

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000
CMD ["npm", "start"]
