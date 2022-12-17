"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetServiceConstructors = exports.GetServiceDefinitionsRepository = void 0;
const serviceDefinitionsRepository = {};
/**
 * Decorator for service class.
 * @param serviceInterfaceIdentifier unique service interface identifier
 * @param constructorParameterServiceIdentifiers service identifiers for constructor parameters
 */
function InjectService(serviceInterfaceIdentifier, ...constructorParameterServiceIdentifiers) {
    return function (target) {
        if (serviceDefinitionsRepository[serviceInterfaceIdentifier] == undefined) {
            serviceDefinitionsRepository[serviceInterfaceIdentifier] = [];
        }
        serviceDefinitionsRepository[serviceInterfaceIdentifier].push({
            classType: target,
            parameterServiceIdentifiers: constructorParameterServiceIdentifiers
        });
    };
}
exports.default = InjectService;
/**
 * Get all service defintions declared by InjectService decorator.
 * @returns dictionary of service definitons
 */
function GetServiceDefinitionsRepository() {
    return Object.assign({}, serviceDefinitionsRepository);
}
exports.GetServiceDefinitionsRepository = GetServiceDefinitionsRepository;
function ResetServiceConstructors() {
    const keys = Object.getOwnPropertySymbols(serviceDefinitionsRepository);
    for (let key of keys) {
        delete serviceDefinitionsRepository[key];
    }
}
exports.ResetServiceConstructors = ResetServiceConstructors;
//# sourceMappingURL=decorator.js.map