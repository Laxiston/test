/**
 * Created by Labtec on 27.01.2017.
 */
'use strict';

import routing from './account.routes';
import LoginComponent from './login/login.component';

const module = angular.module('app.account', [])
    .component('login', LoginComponent)
    .config(routing);

export default module;
