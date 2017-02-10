/**
 * Created by Labtec on 26.01.2017.
 */
'use strict';

class AppCtrl {
    /*@ngInject*/

    constructor($rootScope, $scope, $state, $window, $document, $localStorage, $timeout) {
        this.$rootScope = $rootScope;
        this.app = $rootScope.app;
        this.$scope = $scope;
        this.$state = $state;
        this.$localStorage = $localStorage;
        this.$window = $window;
        this.$document = $document;
        this.$timeout = $timeout;

        console.log('test');
    }

    $onInit() {
        let $win = $(this.$window);

        this.$rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
            // Save the route title
            this.$rootScope.currTitle = this.$state.current.title;
        });

        this.$rootScope.pageTitle = () => {
            return this.$rootScope.app.name + ' - ' + (this.$rootScope.currTitle || this.$rootScope.app.description);
        };

        // State not found
        this.$rootScope.$on('$stateNotFound', (event, unfoundState, fromState, fromParams) => {
            //$rootScope.loading = false;
            console.log(unfoundState.to);
            // "lazy.state"
            console.log(unfoundState.toParams);
            // {a:1, b:2}
            console.log(unfoundState.options);
            // {inherit:false} + default options
        });

        // save settings to local storage
        if (angular.isDefined(this.$localStorage.layout)) {
            this.$scope.app.layout = this.$localStorage.layout;
        } else {
            this.$localStorage.layout = this.$scope.app.layout;
        }
        this.$scope.$watch('app.layout', () => {
            // save to local storage
            this.$localStorage.layout = this.$scope.app.layout;
        }, true);


        // Function that find the exact height and width of the viewport in a cross-browser way
        let viewport = () => {
            let e = window, a = 'inner';

            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width : e[a + 'Width'],
                height : e[a + 'Height']
            };
        };
        // function that adds information in a scope of the height and width of the page
        this.$scope.getWindowDimensions = () => {
            return {
                'h' : viewport().height,
                'w' : viewport().width
            };
        };
        // Detect when window is resized and set some variables
        this.$scope.$watch(this.$scope.getWindowDimensions, (newValue, oldValue) => {
            this.$scope.windowHeight = newValue.h;
            this.$scope.windowWidth = newValue.w;

            this.$scope.isLargeDevice = newValue.w >= 992;
            this.$scope.isSmallDevice = newValue.w < 992;
            this.$scope.isMobileDevice = newValue.w <= 768;
        }, true);

        // Apply on resize
        $win.on('resize', () => {
            this.$scope.$apply();

            if (this.$scope.isLargeDevice) {
                $('#app .main-content').css({
                    position : 'relative',
                    top : 'auto',
                    width: 'auto'
                });
            }
        });

    }
}

export default AppCtrl;
