"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCollection = void 0;
const dijs_1 = require("@amaic/dijs");
Object.defineProperty(exports, "ServiceCollection", { enumerable: true, get: function () { return dijs_1.ServiceCollection; } });
const dijs_abstractions_1 = require("@amaic/dijs-abstractions");
const decorator_1 = require("./decorator");
dijs_1.ServiceCollection.prototype.InjectServices = function () {
    const serviceDefinitionsRepository = (0, decorator_1.GetServiceDefinitionsRepository)();
    const serviceInterfaceIdentifiers = Object.getOwnPropertySymbols(serviceDefinitionsRepository);
    for (let serviceInterfaceIdentifier of serviceInterfaceIdentifiers) {
        const serviceDefinitions = serviceDefinitionsRepository[serviceInterfaceIdentifier];
        for (let serviceDefinition of serviceDefinitions) {
            const constructor = (classType, serviceProvider, name) => {
                const dependencies = [];
                for (let parameterServiceIdentifier of serviceDefinition.parameterServiceIdentifiers) {
                    dependencies.push(serviceProvider.GetRequiredService(parameterServiceIdentifier, name));
                }
                return new classType(...dependencies);
            };
            this.RegisterClass(dijs_abstractions_1.ServiceRegistrationMode.Multiple, dijs_abstractions_1.ServiceType.Transient, serviceInterfaceIdentifier, serviceDefinition.classType, constructor);
        }
    }
};
//# sourceMappingURL=extension.js.map