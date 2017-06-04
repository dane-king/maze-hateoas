const mazeService = function($http) {
    const vm = this;


    const getDoors = (acc, curr) => {
        if (curr.href.indexOf('move') > 0) {
            acc.push(curr)
        }
        return acc
    };



    const loadMaze = (resource = { dir: '' }) => {
        return $http({
            method: 'GET',
            url: 'http://localhost:8082/' + resource.dir,
            headers: {
                'accept': 'application/hal+json'
            }
        }).then((resp) => {
            const data = resp.data
            const maze = {
                title: data.title,
                location: data.location,
                doors: data._links.reduce(getDoors, [])
            }
            return maze;
        })

    }
    return {
        loadMaze: loadMaze
    }
}
mazeService.$inject = ['$http']

module.exports = mazeService;