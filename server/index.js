const restify = require('restify');
const restifyJSONHAL = require('restify-json-hal');
const restifyEtagCache = require('restify-etag-cache');
const fs = require('fs');


let maze = require('./data/maze.json')
let currentCell;
let cells = maze.cells

const reloadMaze = () => {

    const maze_data = fs.readFileSync('./data/maze.json', 'utf8')

    maze = JSON.parse(maze_data);
    cells = maze.cells;

};

const server = restify.createServer();


server.use(function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
})

server.use(restifyEtagCache({ weak: false }));
server.use(restifyJSONHAL(server));


const directions = ['east', 'north', 'west', 'south']


const respondWithCell = (response) => {

    let cell = cells[currentCell]
    let doors = cell.doors;

    for (var i = 0; i < doors.length; i++) {
        if (doors[i]) response.addLink("get", `/move/${doors[i]}`, directions[i]);
    }

    response.send({
        title: maze.title,
        location: cell.title

    });
}

server.get('/', (request, response, next) => {
    reloadMaze();
    currentCell = 'cell0'
    respondWithCell(response)

    return next();
});

server.get('/current', (request, response, next) => {
    respondWithCell(response)

    return next();
});


server.get('/move/:direction', (request, response, next) => {
    currentCell = request.params.direction;
    respondWithCell(response);
    return next();
});



server.listen(8082, () => console.log('%s listening at %s', server.name, server.url))