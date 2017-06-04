'use strict';
const app = require('angular')

require('./maze/maze.module')

angular.module('myApp', ['app.maze']);