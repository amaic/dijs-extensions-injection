"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetServiceConstructors = exports.GetServiceConstructors = void 0;
const serviceConstructorsRepository = {};
function InjectService(serviceInterfaceIdentifier) {
    return function (target) {
        serviceConstructorsRepository[serviceInterfaceIdentifier] = target;
    };
}
exports.default = InjectService;
function GetServiceConstructors() {
    return Object.assign({}, serviceConstructorsRepository);
}
exports.GetServiceConstructors = GetServiceConstructors;
function ResetServiceConstructors() {
    const keys = Object.getOwnPropertySymbols(serviceConstructorsRepository);
    for (let key of keys) {
        delete serviceConstructorsRepository[key];
    }
}
exports.ResetServiceConstructors = ResetServiceConstructors;
//# sourceMappingURL=decorator.js.map