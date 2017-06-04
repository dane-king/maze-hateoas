const MazeController = function(mazeService) {
    const updateMaze = (dir) => {
        mazeService.loadMaze(dir).then((maze) => {
            this.title = maze.title || 'No Title';
            this.location = maze.location || 'No Location';
            this.doors = maze.doors || [];
        })
    }

    updateMaze();

    this.updateMaze = updateMaze;
}
MazeController.$inject = ['mazeService']

module.exports = MazeController;