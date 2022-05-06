# Gothamist Web Client

## IMPORTANT
if you get this error, or any other error:
"nuxi requires @nuxt/kit to be installed in your project. Try installing nuxt3 or @nuxt/bridge"

first run this install to fix it:
```bash
npm i nuxt@3.0.0-rc.2
```

We recommend to look at the [Nuxt 3 documentation](https://v3.nuxtjs.org).

## Setup

This project expects 
node version `16.14.2`
npm version 8.6.0

to install the npm version, run the following
npm install npm@8.6.0 -g

```bash
npm install
npm i nuxt@3.0.0-rc.2
```

For more info on the nuxt release candidates see https://github.com/nuxt/framework/releases

in VS Code, use the following plugin for formatting. Be sure to install the older version 0.33.10:
https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar

## Development

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

To avoid a CORS error, open a new Chrome window from the terminal with web security disabled:

Mac OS
```bash
open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security
```

Windows cmd prompt
```bash
cd c:\Program Files\Google\Chrome\Application
chrome.exe --disable-web-security --user-data-dir=c:\my-chrome-data\data --new-window http://localhost:3000/
```
You can create a .bat file as well:
```bash
cd "C:\Program Files\Google\Chrome\Application\"
start chrome.exe --disable-web-security --user-data-dir=c:\my-chrome-data\data --new-window http://localhost:3000/

```


## Production

Build the application for production:

```bash
docker build -t gothamist-vue3 .
docker run -p 3000:3000 -e HOST=0.0.0.0 gothamist-vue3 -e API_URL=https://api.demo2.wnyc.net
```
