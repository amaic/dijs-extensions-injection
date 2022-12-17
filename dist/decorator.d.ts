import { Constructor } from "./types/Constructor";
import { Dictionary } from "./types/Dictionary";
/**
 * Decorator for service class.
 * @param serviceInterfaceIdentifier unique service interface identifier
 * @param constructorParameterServiceIdentifiers service identifiers for constructor parameters
 */
export default function InjectService<INTERFACE, CLASSTYPE extends Constructor<INTERFACE>>(serviceInterfaceIdentifier: symbol, ...constructorParameterServiceIdentifiers: symbol[]): (target: CLASSTYPE) => void;
/**
 * Get all service defintions declared by InjectService decorator.
 * @returns dictionary of service definitons
 */
export declare function GetServiceDefinitionsRepository(): Dictionary;
export declare function ResetServiceConstructors(): void;
