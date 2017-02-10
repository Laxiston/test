/**
 * Created by Labtec on 26.01.2017.
 */
'use strict';

export default ($urlRouterProvider, $stateProvider, $locationProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('app', {
            url: '/',
            //abstract: true,
            views: {
                'layout': {
                    template: require('./app.html')
                },
                'sidebar@app': {
                    template: require('./partials/sidebar.html')
                },
                'navbar@app': {
                    template: require('./partials/top-navbar.html')
                },
                'footer@app': {
                    template: require('./partials/footer.html')
                }
            }
        })
        .state('app.dashboard', {
            url: 'dashboard',
            template: '<dashboard />',
            parent: 'app'
        })
        .state('app.ui', {
            url: 'ui',
            template: '<ui />',
            parent: 'app'
        });
};
