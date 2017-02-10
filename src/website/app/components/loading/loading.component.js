/**
 * Created by Labtec on 08.02.2017.
 */
'use strict';

class LoadingCtrl {
    constructor($rootScope, $element, $scope, $timeout, cfpLoadingBar) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$element = $element;
        this.$timeout = $timeout;
        this.cfpLoadingBar = cfpLoadingBar;
    }

    $postLink() {
        if (__TEST__) return;

        //if (!this.$element.hasClass('hide')) {
            //this.$element.addClass('animate');
        //}

        this.$rootScope.$on('$stateChangeStart', (event, toState) => {
            if (this.$element.hasClass('hide') && toState.specialClass === 'core') {
                this.$element.removeClass('hide');
            }
            this.cfpLoadingBar.start();
        });

        this.$rootScope.$on('$stateChangeSuccess', event => {
            event.targetScope.$watch('$viewContentLoaded', () => {
                //this.$timeout(() => {
                    this.$element.addClass('hide');
                    this.cfpLoadingBar.complete();
                //}, 1000);
            });
        });
    }
}

let LoadingComponent = {
    restrict: 'E',
    controller: LoadingCtrl,
    template: '<div class="loader"><div class="loader__spin1"></div><div class="loader__spin2"></div><div class="loader__spin3"></div><div class="loader__spin4"></div><div class="loader__spin5"></div></div>',
    controllerAs: 'loading',
    bindings: true
};

export default LoadingComponent;
