/**
 * Created by Labtec on 28.01.2017.
 */
'use strict';

class PagesManager {

    constructor() {
        this.pages = {};
    }

    registerPage(pageName, page) {
        this.pages[pageName] = page;
    }

    getPagesList() {
        return _.keys(this.pages);
    }

    getPage(pageName) {
        return this.pages[pageName];
    }

}

export default {
    serviceName: 'pagesManager',
    serviceClass: PagesManager
};
