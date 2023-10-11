# Gothamist Web Client

## Setup

### Requirements:
node version 16

### Create .npmrc file

To install our nypr-design-system dependency you need to create a personal access token through Github and add it to a local .npmrc file.

Create a personal access token in Github under Settings -> Developer settings -> Personal access tokens -> Tokens (classic). You will need to give your token the `read:packages` permission.

Copy the sample .npmrc file to a local version (will be .gitignore'd),
```bash
cp .npmrc.sample .npmrc
```
and add your token to the end of line 2 of `.npmrc`.

### Recommended VS Code plugins:
[Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

This project uses [antfu/eslint-config](https://github.com/antfu/eslint-config), [follow the instructions there to setup your VSCode to autoformat and fix errors](https://github.com/antfu/eslint-config#vs-code-support-auto-fix)

## Development

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

Run linter and tests

```
npm run test
```

If linter fails you can try to autofix errors

```
npm run lint:fix
```

## Production

Build the application for production:

```bash
docker build -t gothamist-vue3 .
docker run -p 3000:3000 -e HOST=0.0.0.0 gothamist-vue3 -e API_URL=https://api.demo2.wnyc.net
```
