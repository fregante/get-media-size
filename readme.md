# get-media-size

> Get the real size of an `<img>`, `<video>`, or `<canvas>` in the browser.

[![gzipped size](https://badges.herokuapp.com/size/github/bfred-it/get-media-size/master/dist/get-media-size.browser.js?gzip=true&label=gzipped%20size)](#readme)
[![Travis build status](https://api.travis-ci.org/bfred-it/get-media-size.svg?branch=master)](https://travis-ci.org/bfred-it/get-media-size)
[![npm version](https://img.shields.io/npm/v/get-media-size.svg)](https://www.npmjs.com/package/get-media-size) 

It works in IE9+ since it depends on `naturalWidth`/`naturalHeight` for the images and `videoWidth`/`videoHeight` on videos.

## Install

```sh
npm install --save get-media-size
```
```js
import loadImage from 'get-media-size';
```

If you don't use node/babel, include this:

```html
<script src="dist/get-media-size.browser.js"></script>
```

## Usage

### Async usage

Use this on images or videos that might not yet be loaded. It only needs a few KB of the media to be loaded, so you'll get the size long before its `load` event.

```js
var video = document.querySelector('video');
getMediaSize(video).then(console.log)
//==> Promise resolves with {width: 1280, height: 720}
```

### Sync usage

Use this on `canvas` or media that is already loaded, otherwise it'll return `{width: 0, height: 0}`

#### Example with images or videos

```js
var img = document.querySelector('img');
console.log(img.complete, getMediaSize.sync(img));
//==> true, {width: 275, height: 95}
```

#### Example with canvas

```js
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var canvasSize = getMediaSize.sync(canvas); // it works with either the canvas element
var canvasSize = getMediaSize.sync(ctx); // or the context object
```

## API

### `getMediaSize(media[, scale])`

parameter | description
--- | ---
**`media`** | Type: `image` or `video` or `canvas` or `context`, *required* <br> The element to read the size from
**`scale`** | Type: `number`  *default:1* <br> Convenience feature to transform the size if you're using retina canvas, for example. Optional.
`@returns` | Type: `Promise` <br>Resolves with an object with `width` and `height` of the passed media

### `getMediaSize.sync(media[, scale])`

parameter | description
--- | ---
**`media`** | Matches the `getMediaSize()` function
**`scale`** | Matches the `getMediaSize()` function
`@returns` | Type: `object` <br>With `width` and `height` of the passed media

## Dependencies

None! But for the _async_ method you need to polyfill `window.Promise` in IE9-11

## License

MIT © [Federico Brigante](http://twitter.com/bfred_it)
