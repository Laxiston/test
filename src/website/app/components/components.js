function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

let reqContext = require.context('./', true, /^.*\/index\.js$/);

let components = requireAll(reqContext);

let componentsName = _.map(components, (c) => c.default.name);

let componentsModule = angular.module('app.components', componentsName).name;

export default {
    module: componentsModule,
    componentsList: components
};
