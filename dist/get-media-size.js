(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.getMediaSize = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
	value: true
});
function warn(msg) {
	if (window.console && window.console.warn) {
		window.console.warn(msg);
	}
}
/**
 * getMediaSize
 * @param  {image|video|canvas|context} media The element to read the size from
 * @param  {number} scale                     Optional. Convenience feature to transform the size if you're using retina canvas, for example
 * @return {object}                           Contains width and height of the passed media
 */

exports['default'] = function (media, scale) {
	var size = undefined;

	if (!media) {
		warn('Missing media');
		size = {
			width: 0,
			height: 0
		};
	}

	if (media.canvas) {
		// it's a ctx
		media = media.canvas;
	}
	if (media.getContext) {
		// it's a canvas
		size = {
			width: media.width,
			height: media.height
		};
	} else {
		// image or video
		size = {
			width: media.naturalWidth || media.videoWidth || 0,
			height: media.naturalHeight || media.videoHeight || 0
		};
	}

	if (scale) {
		size.width /= scale;
		size.height /= scale;
	}

	if (!size.width || !size.height) {
		warn('Media has no size');
	}
	return size;
};

module.exports = exports['default'];

},{}]},{},[1])(1)
});