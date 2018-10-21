# Modernize ndn.js at 7th NDN Hackathon

Team members:

* [Junxiao Shi](https://github.com/yoursunny)
* [Mheni Merzouki](https://github.com/MheniMerz)
* [Omar Mimouni](https://github.com/elmiomar)

## Motivation, Goals, and Progress

### TypeScript declaration

[TypeScript](https://www.typescriptlang.org/) is a typed superset of JavaScript that compiles to plain JavaScript.
Junxiao selected TypeScript for several of my projects, because TypeScript performs type checking at compile time, and therefore reduces the chance of having a bug related to passing a variable with the wrong type.
One problem he's been encountering is that ndn.js lacks a TypeScript declaration file, and therefore the TypeScript compiler cannot perform type checking whenever he uses a class or function from ndn.js.

During this hackathon, Junxiao wrote a TypeScript declaration file for ndn.js.
It covers frequently used classes including `Name Name.Component Interest Data MetaInfo Signature KeyChain Face`.
After the hackathon, we plan to contribute this TypeScript declaration file to [DefinitelyTyped](https://definitelytyped.org) repository to be distributed as NPM `@types/ndn-js` package.

### Promise API

ndn.js's public APIs are mostly *callback*-based. For example,

```
face.expressInterest(
  interest,
  (interest, data) => { console.log("got Data"); },
  (interest) => { console.log("timeout"); },
  (interest, nack) => { console.log("got Nack"); },
);
```

A modern alternative to callbacks is *Promise*. This allows a simpler syntax:

```
const data = await face.expressInterestPromise(interest);
console.log("got Data");
```

During this hackathon, Omar wrote this function as well as `Face.prototype.registerPrefixPromise`.
We plan to contribute this to main ndn.js codebase.

### Browserify

ndn.js's browser bundle was built with Waf.
During this hackathon, Mheni tried several modern bundlers, and got *browserify* somewhat working.
We plan to fix the remaining bugs, and contribute this to main ndn.js codebase.

## Demos

### TypeScript Consumer

[consumer.ts](src/consumer.ts) demonstrates that having TypeScript declaration files enables type checking in ndn-js applications.
Notice the `"strict": true` setting in [tsconfig.json](tsconfig.json).

```
npm run build
DEBUG=* node build/consumer.js
```

### Browser ndnping

[ndnping.html](src/ndnping.html) demonstrates a `ndn.js` bundle compiled with [Browserify](http://browserify.org/).
It also uses `Face.prototype.expressInterestPromise` API instead of callback-based `Face.prototype.expressInterest`.
