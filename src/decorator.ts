type Constructor<TYPE> = { new(...args: any[]): TYPE };
type Dictionary<TYPE> = { [serviceInterfaceIdentifier: symbol]: Constructor<TYPE> };

const serviceConstructorsRepository: Dictionary<any> = {};

export default function InjectService<INTERFACE, CLASSTYPE extends Constructor<INTERFACE>>(serviceInterfaceIdentifier: symbol)
{
    return function (target: CLASSTYPE): void
    {
        serviceConstructorsRepository[serviceInterfaceIdentifier] = target;
    }
}

export function GetServiceConstructors(): Dictionary<any>
{
    return { ...serviceConstructorsRepository };
}

export function ResetServiceConstructors(): void
{
    const keys = Object.getOwnPropertySymbols(serviceConstructorsRepository);

    for (let key of keys)
    {
        delete serviceConstructorsRepository[key];
    }
}