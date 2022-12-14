# Gothamist Web Client

## IMPORTANT
if you get this error, or any other error:
"nuxi requires @nuxt/kit to be installed in your project. Try installing nuxt3 or @nuxt/bridge"

first run this install to fix it:
```bash
npm i nuxt@3.0.0-rc.3
```

We recommend to look at the [Nuxt 3 documentation](https://v3.nuxtjs.org).

## Setup

This project expects 
node version `16.14.2`
npm version 8.6.0

to install the npm version, run the following
npm install npm@8.6.0 -g

in VS Code, use the following plugin for formatting. Be sure to install the older version 0.33.10:
https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar

## Create .env and .npmrc files

```bash
cp .env.sample .env
cp .npmrc.sample .npmrc
```

You will need to update the newly created .npmrc file and add your own personal access token at the end of line 2. You can create one in github under settings -> developer settings -> personal access tokens

## Development

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
docker build -t gothamist-vue3 .
docker run -p 3000:3000 -e HOST=0.0.0.0 gothamist-vue3 -e API_URL=https://api.demo2.wnyc.net
```
