/**
 * Created by Labtec on 28.01.2017.
 */
'use strict';


import LoginComponent from './login.component';

const loginModule = angular.module('login', [])
    .component('login', LoginComponent);

export default loginModule;
