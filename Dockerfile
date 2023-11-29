FROM node:18.18.2 as build

ARG SENTRY_DSN
ARG SENTRY_ENV
ARG HTL_CSS
ARG HTL_JS
ARG HTL_IS_TESTING
ARG API_URL
ARG IMAGE_BASE_URL
ARG IMAGE_CDN_URL
ARG GA_MEASUREMENT_ID
ARG GTM_ID
ARG OPENWEB_SPOT_ID
ARG OG_IMAGE
ARG CANONICAL_HOST
ARG NEWSLETTER_API
ARG NEWSLETTER_MAIN_LIST_ID
ARG NEWSLETTER_MULTI_LIST_IDS
ARG LIVESTREAM_URL
ARG NEWRELIC_AGENT
ARG OPTIN_MONSTER_ACCOUNT_ID
ARG OPTIN_MONSTER_USER_ID
ARG WALL_ALLOW_LIST
ARG SENTRY_AUTH_TOKEN

WORKDIR /code

COPY ./.npmrc .
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
RUN npm install sass

COPY . .
RUN npm run build

FROM node:18.18.2-slim as app


WORKDIR /app

RUN apt-get update \
    && apt-get install -y \
    curl \
    netcat-traditional \
    nginx-extras \
    python3 \
    python3-pip \
    python3-setuptools \
    unzip \
    supervisor

COPY scripts/entrypoint.sh ./scripts/entrypoint.sh

COPY nginx/*.conf /etc/nginx/
COPY public/robots* ./public/

COPY --from=build /code/.output/ ./.output/
COPY --from=build /code/.nuxt/ ./.nuxt/
COPY --from=build /code/node_modules/ ./node_modules/
COPY --from=build /code/package.json .

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 80
ENTRYPOINT ["./scripts/entrypoint.sh" ]