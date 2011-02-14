#!/usr/bin/env node
require.paths.unshift(__dirname + '/deps');

var reporter = require('nodeunit').reporters.default;
reporter.run(['test']);

