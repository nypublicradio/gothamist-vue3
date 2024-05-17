FROM node:18.18.2 as build

ARG API_URL
ARG CANONICAL_HOST
ARG GA_MEASUREMENT_ID
ARG GTM_ID
ARG HTL_CSS
ARG HTL_IS_TESTING
ARG HTL_JS
ARG IMAGE_BASE_URL
ARG IMAGE_CDN_URL
ARG INTERNAL_API_URL
ARG LIVESTREAM_URL
ARG NEWRELIC_AGENT
ARG NEWSLETTER_API
ARG NEWSLETTER_MAIN_LIST_ID
ARG NEWSLETTER_MULTI_LIST_IDS
ARG OG_IMAGE
ARG OPENWEB_SPOT_ID
ARG OPTIN_MONSTER_ACCOUNT_ID
ARG OPTIN_MONSTER_USER_ID
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_DSN
ARG SENTRY_ENV
ARG WALL_ALLOW_LIST

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

# This patches some bothersome favicon code that exists within nitro 
# See original code here: https://github.com/unjs/nitro/blob/928373ccecffc7c1bf519543ffeba11bfcfeb4ea/src/runtime/renderer.ts#L26
# by modifying the code to never execute (the addition of 1 == 2).
# the original line of code reads: if (event.path.endsWith("/favicon.ico")) {
# the patched line of code reads: if (event.path.endsWith("/favicon.ico") && 1 == 2)
RUN find './.output/server/chunks/routes' -type f -exec sed -i 's/event\.path\.endsWith("\/favicon.ico")/event.path.endsWith("\/favicon.ico") \&\& 1 == 2/g' {} +;

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 80
ENTRYPOINT ["./scripts/entrypoint.sh" ]