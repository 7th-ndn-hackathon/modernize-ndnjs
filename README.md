# Modernize ndn.js Demo Application

## TypeScript Consumer

[consumer.ts](src/consumer.ts) demonstrates that having TypeScript declaration files enables type checking in ndn-js applications.
Notice the `"strict": true` setting in [tsconfig.json](tsconfig.json).

```
npm run build
DEBUG=* node build/consumer.js
```

## Browser ndnping

[ndnping.html](src/ndnping.html) demonstrates a `ndn.js` bundle compiled with [Browserify](http://browserify.org/).
It also uses `Face.prototype.expressInterestPromise` API instead of callback-based `Face.prototype.expressInterest`.
