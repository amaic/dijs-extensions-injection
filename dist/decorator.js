"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetServiceConstructors = exports.GetServiceDefinitions = void 0;
const serviceDefinitions = {};
/**
 * Decorator for service class.
 * @param serviceInterfaceIdentifier unique service interface identifier
 */
function InjectService(serviceInterfaceIdentifier, ...constructorParameterServiceIdentifiers) {
    return function (target) {
        if (serviceDefinitions[serviceInterfaceIdentifier] == undefined) {
            serviceDefinitions[serviceInterfaceIdentifier] = [];
        }
        serviceDefinitions[serviceInterfaceIdentifier].push({
            constructor: target,
            parameterServiceIdentifiers: constructorParameterServiceIdentifiers
        });
    };
}
exports.default = InjectService;
function GetServiceDefinitions() {
    return Object.assign({}, serviceDefinitions);
}
exports.GetServiceDefinitions = GetServiceDefinitions;
function ResetServiceConstructors() {
    const keys = Object.getOwnPropertySymbols(serviceDefinitions);
    for (let key of keys) {
        delete serviceDefinitions[key];
    }
}
exports.ResetServiceConstructors = ResetServiceConstructors;
//# sourceMappingURL=decorator.js.map