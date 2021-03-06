const chalk = require('chalk');
process.env.NODE_ENV = 'test';

console.log(chalk.yellow('SETTING UP ENVIORNMENT FOR TESTING'));

// setup babel
require('@babel/polyfill');
require('@babel/register');
require('ignore-styles');

// imports
const Enzyme = require('enzyme');
const { JSDOM } = require('jsdom');

// setup jsdom
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};
copyProps(window, global);

// setup enzyme
const EnzymeAdapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new EnzymeAdapter() });
