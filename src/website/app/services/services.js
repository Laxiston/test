const servicesModule = angular.module('app.services', []);

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

let servicesContext = require.context('./', true, /^.*\/index\.js$/);

let services = requireAll(servicesContext);

_.each(services, service => {
    servicesModule.service(service.default.serviceName, service.default.serviceClass);
});

export default servicesModule;
