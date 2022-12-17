import { ServiceCollection } from "@amaic/dijs";
import { IServiceProvider, ServiceRegistrationMode, ServiceType } from "@amaic/dijs-abstractions";
import { GetServiceDefinitionsRepository } from "./decorator";
import { Constructor } from "./types/Constructor";

declare module "@amaic/dijs"
{
    interface ServiceCollection
    {
        InjectServices(): void;
    }
}

ServiceCollection.prototype.InjectServices = function ()
{
    const serviceDefinitionsRepository = GetServiceDefinitionsRepository();

    const serviceInterfaceIdentifiers = Object.getOwnPropertySymbols(serviceDefinitionsRepository);

    for (let serviceInterfaceIdentifier of serviceInterfaceIdentifiers)
    {
        const serviceDefinitions = serviceDefinitionsRepository[serviceInterfaceIdentifier];

        for (let serviceDefinition of serviceDefinitions)
        {
            const constructor = (classType: Constructor<any>, serviceProvider: IServiceProvider, name?: string) =>
            {
                const dependencies: any[] = [];

                for (let parameterServiceIdentifier of serviceDefinition.parameterServiceIdentifiers)
                {
                    dependencies.push(serviceProvider.GetRequiredService(parameterServiceIdentifier, name));
                }

                return new classType(...dependencies);
            }

            this.RegisterClass(
                ServiceRegistrationMode.Multiple,
                ServiceType.Transient,
                serviceInterfaceIdentifier,
                serviceDefinition.classType,
                constructor
            );
        }
    }
};

export { ServiceCollection };