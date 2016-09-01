'use strict';

/**
 * getMediaSize
 * @param  {image|video|canvas|context} media The element to read the size from
 * @param  {number} scale                     Optional. Convenience feature to transform the size if you're using retina canvas, for example
 * @return {object}                           Contains width and height of the passed media
 */

function getMediaSize(media, scale) {
	if (!media) {
		return {
			width: 0,
			height: 0
		};
	}

	if (media.canvas) { // it's a ctx
		media = media.canvas;
	}

	const size = {
		width: media.getContext ? media.width : media.naturalWidth || media.videoWidth,
		height: media.getContext ? media.height : media.naturalHeight || media.videoHeight
	};

	if (scale) {
		size.width /= scale;
		size.height /= scale;
	}

	return size;
}

export default function getMediaSizeAsync(media, scale) {
	return new Promise(resolve => {
		const instantSize = getMediaSize(media, scale);
		if (instantSize.width) {
			return resolve(instantSize);
		}
		if (media instanceof HTMLVideoElement) {
			return media.addEventListener('loadedmetadata', () => resolve(getMediaSize(media, scale)));
		}
		setTimeout(function check() {
			const size = getMediaSize(media, scale);
			if (size.width) {
				resolve(size);
			} else {
				setTimeout(check, 100);
			}
		}, 100);
	});
}

getMediaSizeAsync.sync = getMediaSize;
