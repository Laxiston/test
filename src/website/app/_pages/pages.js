import ocLazyLoad from 'oclazyload';

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

const moduleDescriptionContext = require.context('./', true, /^.*\/description\.js$/);

const moduleNames = _.map(moduleDescriptionContext.keys(), (k, i) => {
    let pos = k.indexOf('/');
    let pos2 = k.lastIndexOf('/');
    return k.substr(pos + 1, pos2 - pos - 1);
});

const pages = _.map(requireAll(moduleDescriptionContext), m => m.default);

const pagesModule = angular.module('app.pages', [ocLazyLoad])
    .run((pagesManager, $ocLazyLoad, $q) => {

        'ngInject';

        _.each(pages, (c, i) => {
            c.load = () => {
                var loadComponent = require('bundle-loader?lazy&name=[folder]!./' + moduleNames[i] + '/index');
                return $q((resolve) => {
                    loadComponent(module => {
                        resolve($ocLazyLoad.load({
                            name: module.default.name
                        }));
                    });
                });
            };
            pagesManager.registerPage(moduleNames[i], c);
        });
    });

export function createPageComponent(template, controller) {
    return {
        require: {
            pageCtrl: '^page'
        },
        template: template,
        controller: controller,
        controllerAs: 'vm'
    };
}

export default {
    module: pagesModule,
    pagesList: pages
};
