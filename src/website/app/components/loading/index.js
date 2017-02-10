/**
 * Created by Labtec on 08.02.2017.
 */
'use strict';

import LoadingComponent from './loading.component';

let loadingModule = angular.module('app.directives.loading', [])
    .component('loading', LoadingComponent);

export default loadingModule;
