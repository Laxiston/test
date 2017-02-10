/**
 * Created by Labtec on 27.01.2017.
 */
'use strict';

//noinspection JSUnresolvedVariable
import dashboardTpl from './dashboard.tpl.html';
import './dashboard.scss';

class DashboardCtrl {

    constructor($element) {
        'ngInject';

        this.$element = $element;

        console.log('Dashboard');
    }
}

const DashboardComponent = {
    template: dashboardTpl,
    bindings: {
        name: '@'
    },
    controller: DashboardCtrl,
    controllerAs: 'vm'
};

export default DashboardComponent;
