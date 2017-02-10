'use strict';

import services from './services/services';
import components from './components/components';
import pages from './pages/pages';

import { config } from './app.config';
import routes from './app.routes';
import run from './app.run';
import AppCtrl from './app.ctrl';

const app = angular.module('app', [
    'ui.router',
    'ngCookies',
    'ngTouch',
    'ngAnimate',
    'ngSanitize',
    'ngStorage',
    'ngAria',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ui.bootstrap',

    // Services
    services.name,

    // Pages
    pages.module.name,

    // Components
    components.module,
])
    .config(config)
    .config(routes)
    .run(run)
    .controller('AppCtrl', AppCtrl);

export default app;
