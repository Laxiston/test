'use strict';

import './core/googleFonts';
import 'angular-loading-bar/build/loading-bar.min.css';
import 'font-awesome/css/font-awesome.css';
import './app.scss';

//import 'angular-ui-router';
//import 'angular-ui-bootstrap';
import 'oclazyload';
import 'angular-cookies';
import 'angular-touch';
import 'angular-sanitize';
import 'angular-aria';
import 'angular-loading-bar';
import 'ngstorage';

import app from './app.module';

if (__PROD__) {
    app.config(($compileProvider, $httpProvider) => {
        $compileProvider.debugInfoEnabled(false);
        $httpProvider.useApplyAsync(true);
    });
}

angular.element(document).ready(() => {
    //document.body.innerHTML = '<app> Loading... </app>';
    angular.bootstrap(document, [app.name], {
        strictDi: true
    });
});
