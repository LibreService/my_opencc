# My OpenCC
![](https://img.shields.io/github/license/LibreService/my_opencc)

Convert between Simplified and Traditional Chinese.

https://my-opencc.vercel.app/

## Transform matrix
源\目标|s|t|tw|hk|jp
-|-|-|-|-|-
s|-|s2t|s2tw(p)|s2hk|-
t|t2s|-|t2tw|t2hk|t2jp
tw|tw2s(p)|tw2t|-|-|-
hk|hk2s|hk2t|-|-|-
jp|-|jp2t|-|-|-

## Self host
Download latest [artifact](https://github.com/LibreService/my_opencc/releases/download/latest/my-opencc-dist.zip) built by GitHub Actions.

## Development workflow
My OpenCC can be built on Linux and macOS.

For Windows, you may use WSL.

### Install node
You may use [nvm](https://github.com/nvm-sh/nvm) to install node.
### Install pnpm and dev dependencies
```sh
npm i -g pnpm
pnpm i
```
### Install emsdk
https://emscripten.org/docs/getting_started/downloads.html
### Get submodule
```sh
git submodule init
git submodule update
```
### Build wasm
```sh
pnpm run native
pnpm run lib
pnpm run wasm
```
### Run develop server
```sh
pnpm run dev
```
### Lint
```sh
pnpm run lint:fix
```
### Check type
```sh
pnpm run check
```
### Build
```sh
pnpm run build
```
### Test
```sh
pnpm run test
```
### Preview
```sh
pnpm run preview
```
### Deploy
```sh
export LIBRESERVICE_CDN=https://cdn.jsdelivr.net/npm/@libreservice/my-opencc@VERSION/dist/ # optional
vercel build --prod
vercel deploy --prebuilt --prod
```

## License
AGPLv3+
