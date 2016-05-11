# get-media-size [![module gzipped size](https://badge-size.herokuapp.com/bfred-it/get-media-size/master/dist/get-media-size.node.min.js?compression=gzip)](https://github.com/bfred-it/get-media-size/blob/master/dist/get-media-size.min.js)

> Get the real size of an (already-loaded) `<img>`, `<video>`, or `<canvas>` in the browser.

## Usage

On images:

```js
var img = new Image();
img.onload = function () {
	console.log(getMediaSize(img));
	//==> {width: 275, height: 95}
};
img.src = 'http://www.google.com/images/logo.png';
```

On videos

```js
var video = document.createElement('video')
video.onloadedmetadata = function () {
	console.log(getMediaSize(video));
	//==> {width: 854, height: 480}
};
video.src = 'http://media.w3.org/2010/05/sintel/trailer.mp4';
```

On canvas

```js
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var canvasSize = getMediaSize(canvas); // it works with either the canvas element
var canvasSize = getMediaSize(ctx); // or the context object
```

## With browserify

```sh
npm install --save get-media-size
```

```js
var getMediaSize = require('get-media-size');
```

## API

### `getMediaSize(media[, scale])`

parameter | description
--- | ---
**`media`** | Type: `image` or `video` or `canvas` or `context`, *required* <br> The element to read the size from
**`scale`** | Type: `number`  *default:1* <br> Convenience feature to transform the size if you're using retina canvas, for example. Optional.
`@returns` | Type: `object` <br>With `width` and `height` of the passed media
 
## Files

Here's an explanation of the files included in this repo

* `index.js`: source file, in ES6
* `dist/get-media-size.min.js`: browser-ready file with AMD or a global variable called `getMediaSize`
* `dist/get-media-size.node.js`: used by node/browserify with `require('get-media-size')`

## Dependencies

No dependencies. It works in IE9+ since it depends on `naturalWidth`/`naturalHeight` for the images and `videoWidth`/`videoHeight` on videos.

## License

MIT © [Federico Brigante](http://twitter.com/bfred_it)
