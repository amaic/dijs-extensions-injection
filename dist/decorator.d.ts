type Constructor<TYPE> = {
    new (...args: any[]): TYPE;
};
type ServiceDefinition = {
    constructor: Constructor<any>;
    parameterServiceIdentifiers: symbol[];
};
type Dictionary = {
    [serviceInterfaceIdentifier: symbol]: ServiceDefinition[];
};
/**
 * Decorator for service class.
 * @param serviceInterfaceIdentifier unique service interface identifier
 */
export default function InjectService<INTERFACE, CLASSTYPE extends Constructor<INTERFACE>>(serviceInterfaceIdentifier: symbol, ...constructorParameterServiceIdentifiers: symbol[]): (target: CLASSTYPE) => void;
export declare function GetServiceDefinitions(): Dictionary;
export declare function ResetServiceConstructors(): void;
export {};
