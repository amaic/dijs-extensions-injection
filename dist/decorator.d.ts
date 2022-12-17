type Constructor<TYPE> = {
    new (...args: any[]): TYPE;
};
type Dictionary<TYPE> = {
    [serviceInterfaceIdentifier: symbol]: Constructor<TYPE>;
};
export default function InjectService<INTERFACE, CLASSTYPE extends Constructor<INTERFACE>>(serviceInterfaceIdentifier: symbol): (target: CLASSTYPE) => void;
export declare function GetServiceConstructors(): Dictionary<any>;
export declare function ResetServiceConstructors(): void;
export {};
