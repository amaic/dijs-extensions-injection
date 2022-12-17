import { ServiceDefinition } from "./ServiceDefinition";
export type Dictionary = {
    [serviceInterfaceIdentifier: symbol]: ServiceDefinition[];
};
