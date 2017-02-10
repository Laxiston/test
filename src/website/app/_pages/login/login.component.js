/**
 * Created by Labtec on 27.01.2017.
 */
'use strict';

import {
    createPageComponent
} from '../pages';

//noinspection JSUnresolvedVariable
import template from './login.tpl.html';
import './login.scss';

class LoginCtrl {

    constructor($element) {
        'ngInject';

        this.$element = $element;

        console.log('Dashboard');
    }
}

export default createPageComponent(template, LoginCtrl);
