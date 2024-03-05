import '@testing-library/jest-native/extend-expect';

global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};

global.setImmediate = global.setTimeout;
global.clearImmediate = global.clearTimeout;
