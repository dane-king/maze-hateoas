module.exports = function() {
    return {
        bindToController: {
            data: '=',
            action: '&'
        },
        controller: function() {
            this.update = () => {
                console.log(this);
            }
        },
        controllerAs: 'vm',
        template: '<button ng-click="vm.action({dir:vm.data.href})">{{vm.data.rel}}</button>'
    };
}