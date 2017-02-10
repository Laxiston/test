/**
 * Created by Labtec on 27.01.2017.
 */
'use strict';

import {
    createPageComponent
} from '../pages';

//noinspection JSUnresolvedVariable
import template from './dashboard.tpl.html';
import './dashboard.scss';

class DashboardCtrl {

    constructor($element) {
        'ngInject';

        this.$element = $element;

        console.log('Dashboard');
    }
}

export default createPageComponent(template, DashboardCtrl);
