import { Constructor } from "./types/Constructor";
import { Dictionary } from "./types/Dictionary";

const serviceDefinitionsRepository: Dictionary = {};

/**
 * Decorator for service class.
 * @param serviceInterfaceIdentifier unique service interface identifier
 * @param constructorParameterServiceIdentifiers service identifiers for constructor parameters
 */
export default function InjectService<INTERFACE, CLASSTYPE extends Constructor<INTERFACE>>(
    serviceInterfaceIdentifier: symbol,
    ...constructorParameterServiceIdentifiers: symbol[]
)
{
    return function (target: CLASSTYPE): void
    {
        if (serviceDefinitionsRepository[serviceInterfaceIdentifier] == undefined)
        {
            serviceDefinitionsRepository[serviceInterfaceIdentifier] = [];
        }
        
        serviceDefinitionsRepository[serviceInterfaceIdentifier].push({
            classType: target,
            parameterServiceIdentifiers: constructorParameterServiceIdentifiers
        });
    }
}

/**
 * Get all service defintions declared by InjectService decorator.
 * @returns dictionary of service definitons
 */
export function GetServiceDefinitionsRepository(): Dictionary
{
    return { ...serviceDefinitionsRepository };
}

export function ResetServiceConstructors(): void
{
    const keys = Object.getOwnPropertySymbols(serviceDefinitionsRepository);

    for (let key of keys)
    {
        delete serviceDefinitionsRepository[key];
    }
}