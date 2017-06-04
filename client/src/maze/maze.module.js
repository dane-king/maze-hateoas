'use strict'

const mazeButtonDirective = require('./buttons/maze.button.directive');
const mazeService = require('./maze.service')
const MazeController = require('./maze.controller');

angular.module('app.maze', [])
    .factory('mazeService', mazeService)
    .controller('MazeController', MazeController)
    .directive('mazeButton', mazeButtonDirective)