# VVV Delta wedstrijdschema

The one on their website returns incorrect data, and searches and filters clientside which isn't great. This is my experiment to see how hard it would be to build a better version.

## How to run

Start yourself off with a good old-fashioned

```shell
pnpm i
```

If you don't use pnpm, `npm` should work well enough. Maybe yarn will work too, I'm not sure.

Because CORS is a giant pain in the ass, we also need an API proxy backend. It needs network permissions for obvious reasons, and fs/env permissions because it uses a couple of packages from NPM. At least, I think that's why, I'm not super familiar with Deno (but I do like it!)

```shell
cd /api-proxy
deno run --allow-net --allow-read --allow-env ./index.ts
```

and then you can

```shell
cd <project root>
pnpm dev
```

## Known issues

This is just a PoC.

- Loading from the API is slow.
- UI controls are not blocked while requests are in flight.
- In fact, there's no user feedback whatsoever.
- I used TS out of habit but the types are an absolute mess.
- There's no 'all teams' option.

## Stuff that would be cool to add

- Caching data on the API proxy
- Prefetching API data on proxy start
- Support for other clubs
- Idk, styling?
