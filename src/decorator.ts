type Constructor<TYPE> = { new(...args: any[]): TYPE };
type ServiceDefinition = { constructor: Constructor<any>, parameterServiceIdentifiers: symbol[] };
type Dictionary = { [serviceInterfaceIdentifier: symbol]: ServiceDefinition[] };

const serviceDefinitions: Dictionary = {};

/**
 * Decorator for service class.
 * @param serviceInterfaceIdentifier unique service interface identifier
 */
export default function InjectService<INTERFACE, CLASSTYPE extends Constructor<INTERFACE>>(
    serviceInterfaceIdentifier: symbol,
    ...constructorParameterServiceIdentifiers: symbol[]
)
{
    return function (target: CLASSTYPE): void
    {
        if (serviceDefinitions[serviceInterfaceIdentifier] == undefined)
        {
            serviceDefinitions[serviceInterfaceIdentifier] = [];
        }
        
        serviceDefinitions[serviceInterfaceIdentifier].push({
            constructor: target,
            parameterServiceIdentifiers: constructorParameterServiceIdentifiers
        });
    }
}

export function GetServiceDefinitions(): Dictionary
{
    return { ...serviceDefinitions };
}

export function ResetServiceConstructors(): void
{
    const keys = Object.getOwnPropertySymbols(serviceDefinitions);

    for (let key of keys)
    {
        delete serviceDefinitions[key];
    }
}