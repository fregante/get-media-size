import test from 'ava';
import getMediaSize from '.';

function HTMLVideoElement(ready) {
	this.tagName = 'VIDEO';
	if (ready) {
		this.videoWidth = 1280;
		this.videoHeight = 720;
		return;
	}
	this.videoWidth = 0;
	this.videoHeight = 0;
	this.addEventListener = (type, listener) => {
		this.videoWidth = 1280;
		this.videoHeight = 720;
		setTimeout(listener, 500);
	};
}

function HTMLImageElement(ready) {
	if (ready) {
		this.naturalWidth = 1280;
		this.naturalHeight = 720;
		return;
	}
	this.naturalWidth = 0;
	this.naturalHeight = 0;
	setTimeout(() => {
		this.naturalWidth = 1280;
		this.naturalHeight = 720;
	}, 350);
}

const successfulSize = {
	width: 1280,
	height: 720
};

const successfulHalfSize = {
	width: 640,
	height: 360
};

const failedSize = {
	width: 0,
	height: 0
};

const readyImageStub = new HTMLImageElement(true);

const nonReadyImageStub = {
	naturalWidth: 0,
	naturalHeight: 0
};

const readyVideoStub = new HTMLVideoElement(true);

const nonReadyVideoStub = {
	videoWidth: 0,
	videoHeight: 0
};

const canvasStub = {
	getContext() {},
	width: 1280,
	height: 720
};

const contextStub = {
	canvas: canvasStub
};

/**
 * SYNC TESTS
 */
test('sync: ready image success', t => {
	t.deepEqual(getMediaSize.sync(readyImageStub), successfulSize);
});

test('sync: non-ready image fail', t => {
	t.deepEqual(getMediaSize.sync(nonReadyImageStub), failedSize);
});

test('sync: ready video success', t => {
	t.deepEqual(getMediaSize.sync(readyVideoStub), successfulSize);
});

test('sync: non-ready video fail', t => {
	t.deepEqual(getMediaSize.sync(nonReadyVideoStub), failedSize);
});

test('sync: canvas success', t => {
	t.deepEqual(getMediaSize.sync(canvasStub), successfulSize);
});

test('sync: context success', t => {
	t.deepEqual(getMediaSize.sync(contextStub), successfulSize);
});

test('sync: no argument fail', t => {
	t.deepEqual(getMediaSize.sync(), failedSize);
});

test('sync: image scale', t => {
	t.deepEqual(getMediaSize.sync(readyImageStub, 2), successfulHalfSize);
});

/**
 * ASYNC TESTS
 */
test('async: ready image success', async t => {
	t.deepEqual(await getMediaSize(new HTMLImageElement(true)), successfulSize);
});

test('async: non-ready image success', async t => {
	t.deepEqual(await getMediaSize(new HTMLImageElement()), successfulSize);
});

test('async: ready video success', async t => {
	t.deepEqual(await getMediaSize(new HTMLVideoElement(true)), successfulSize);
});

test('async: non-ready video success', async t => {
	t.deepEqual(await getMediaSize(new HTMLVideoElement()), successfulSize);
});

test('async: canvas success', async t => {
	t.deepEqual(await getMediaSize(canvasStub), successfulSize);
});

test('async: context success', async t => {
	t.deepEqual(await getMediaSize(contextStub), successfulSize);
});

// test('async: no argument fail', async t => {
// 	t.throws(getMediaSize(), failedSize);
// });

test('async: image scale', async t => {
	t.deepEqual(await getMediaSize(new HTMLImageElement(), 2), successfulHalfSize);
});
