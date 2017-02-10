/**
 * Created by Labtec on 27.01.2017.
 */
'use strict';

import DashboardComponent from './dashboard.component';

const dashboardModule = angular.module('dashboard', [])
    .component('dashboard', DashboardComponent);

export default dashboardModule;
