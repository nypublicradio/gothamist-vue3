# Gothamist Web Client

## Setup

This project expects 
node version `16.14.2`
npm version 8.6.0

to install the npm version, run the following
npm install npm@8.6.0 -g

```bash
npm install
```

in VS Code, use the following plugins for formatting:
https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar
https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin

## Create .npmrc file

```bash
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
