/**
 * Created by Labtec on 27.01.2017.
 */
'use strict';

//noinspection JSUnresolvedVariable
import uiTpl from './ui.tpl.html';
//import './ui.scss';

class UiCtrl {

    constructor($element) {
        'ngInject';

        this.$element = $element;

        console.log('Ui');
    }
}

const COMPONENT = {
    template: uiTpl,
    bindings: {
        name: '@'
    },
    controller: UiCtrl,
    controllerAs: 'vm'
};

export default COMPONENT;
