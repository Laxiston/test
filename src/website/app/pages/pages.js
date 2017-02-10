function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

let reqContext = require.context('./', true, /^.*\/index\.js$/);

let pages = requireAll(reqContext);

let pagesName = _.map(pages, (c) => c.default.name);

let pagesModule = angular.module('app.pages', pagesName);

export default {
    module: pagesModule,
    pagesList: pages
};
