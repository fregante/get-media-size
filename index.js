'use strict';

/**
 * getMediaSize
 * @param  {image|video|canvas|context} media The element to read the size from
 * @param  {number} scale                     Optional. Convenience feature to transform the size if you're using retina canvas, for example
 * @return {object}                           Contains width and height of the passed media
 */
export default function (media, scale) {
	if (!media) {
		return {
			width: 0,
			height: 0,
		};
	}

	if (media.canvas) { // it's a ctx
		media = media.canvas;
	}
	
	const size = {
		width: media.naturalWidth || media.videoWidth || media.width || 0,
		height: media.naturalHeight || media.videoHeight || media.height || 0,
	};

	if (scale) {
		size.width /= scale;
		size.height /= scale;
	}
	
	return size;
}
