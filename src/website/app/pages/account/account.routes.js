/**
 * Created by Labtec on 09.02.2017.
 */
'use strict';

export default function routes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('login', {
            url: 'login',
            template: '<login />',
            controller: 'LoginCtrl',
            controllerAs: 'vm',
            parent: 'account'
        })
        /*.state('logout', {
            url: '/logout?referrer',
            referrer: 'main',
            template: '',
            controller($state, Auth) {
                'ngInject';

                var referrer = $state.params.referrer || $state.current.referrer || 'main';
                Auth.logout();
                $state.go(referrer);
            }
        })
        .state('signup', {
            url: '/signup',
            template: require('./signup/signup.html'),
            controller: 'SignupController',
            controllerAs: 'vm'
        })
        .state('settings', {
            url: '/settings',
            template: require('./settings/settings.html'),
            controller: 'SettingsController',
            controllerAs: 'vm',
            authenticate: true
        })*/;
}
