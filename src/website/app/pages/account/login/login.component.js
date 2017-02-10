/**
 * Created by Labtec on 09.02.2017.
 */
'use strict';

//noinspection JSUnresolvedVariable
import loginTpl from './login.tpl.html';

class LoginCtrl {
    constructor($element) {
        'ngInject';

        this.$element = $element;

        console.log('Login');
    }
}

const LoginComponent = {
    template: loginTpl,
    bindings: {
        name: '@'
    },
    controller: LoginCtrl,
    controllerAs: 'vm'
};

export default LoginComponent;
