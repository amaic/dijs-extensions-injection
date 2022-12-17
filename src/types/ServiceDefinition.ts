import { Constructor } from "./Constructor";

export type ServiceDefinition = { classType: Constructor<any>, parameterServiceIdentifiers: symbol[] };
