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

const panels = _.map(requireAll(moduleDescriptionContext), m => m.default);

const panelsModule = angular.module('app.panels', [ocLazyLoad])
    .run((panelsManager, $ocLazyLoad, $q) => {

        'ngInject';

        _.each(panels, (c, i) => {
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
            panelsManager.registerPanel(moduleNames[i], c);
        });
    });

export function createPanelComponent(template, controller) {
    return {
        require: {
            panelCtrl: '^panel'
        },
        template: template,
        controller: controller
    };
}

export default {
    module: panelsModule,
    panelsList: panels
};
