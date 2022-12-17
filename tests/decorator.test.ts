import { InjectService, GetServiceDefinitionsRepository } from "../src";
import { ResetServiceConstructors } from "../src/decorator";

describe("decorator", () =>
{
    beforeEach(() =>
    {
        ResetServiceConstructors();
    });

    test("InjectService factory function call", () =>
    {
        const IFooIdentifier = Symbol("IFoo");
        interface IFoo { };
        class Foo implements IFoo { };

        const decoratorFunction = InjectService<IFoo, typeof Foo>(IFooIdentifier);

        decoratorFunction(Foo);

        const serviceDefinitions = GetServiceDefinitionsRepository();

        const serviceInterfaceIdentifiers = Object.getOwnPropertySymbols(serviceDefinitions);

        expect(serviceInterfaceIdentifiers.length).toBe(1);

    });

    test("InjectService decorated class with retrieving repository", () =>
    {
        const IFooIdentifier = Symbol("IFoo");
        interface IFoo { };

        @InjectService(IFooIdentifier)
        class Foo implements IFoo { };

        const serviceDefinitions = GetServiceDefinitionsRepository();

        const serviceInterfaceIdentifiers = Object.getOwnPropertySymbols(serviceDefinitions);

        expect(serviceInterfaceIdentifiers.length).toBe(1);
    });

    test("InjectService decorated class with constructor parameters", () =>
    {
        const IFooIdentifier = Symbol("IFoo");
        interface IFoo { };

        @InjectService(IFooIdentifier)
        class Foo implements IFoo { };

        const IBarIdentifier = Symbol("IBar");
        interface IBar { };

        @InjectService(IBarIdentifier, IFooIdentifier)
        class Bar implements IBar 
        {
            constructor(foo: IFoo)
            {

            }
        };

        const serviceDefinitionsRepository = GetServiceDefinitionsRepository();

        const serviceInterfaceIdentifiers = Object.getOwnPropertySymbols(serviceDefinitionsRepository);

        expect(serviceInterfaceIdentifiers.length).toBe(2);

        const barServiceDefinitions = serviceDefinitionsRepository[IBarIdentifier];

        expect(barServiceDefinitions.length).toBe(1);

        expect(barServiceDefinitions[0].classType).toBe(Bar);

        expect(barServiceDefinitions[0].parameterServiceIdentifiers.length).toBe(1);

        expect(barServiceDefinitions[0].parameterServiceIdentifiers).toContain(IFooIdentifier);
    });

});