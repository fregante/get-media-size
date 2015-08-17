'use strict';
function warn (msg) {
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
export default function (media, scale) {
	let size;

	if (!media) {
		warn('Missing media');
		size = {
			width: 0,
			height: 0,
		};
	}

	if (media.canvas) { // it's a ctx
		media = media.canvas;
	}
	if (media.getContext) { // it's a canvas
		size = {
			width: media.width,
			height: media.height,
		};
	} else { // image or video
		size = {
			width: media.naturalWidth || media.videoWidth || 0,
			height: media.naturalHeight || media.videoHeight || 0,
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
}
