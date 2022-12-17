import { ServiceCollection } from "@amaic/dijs";
declare module "@amaic/dijs" {
    interface ServiceCollection {
        InjectServices(): void;
    }
}
export { ServiceCollection };
