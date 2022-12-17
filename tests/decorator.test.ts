import { InjectService, GetServiceDefinitions } from "../src";
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

        const serviceDefinitions = GetServiceDefinitions();

        const serviceInterfaceIdentifiers = Object.getOwnPropertySymbols(serviceDefinitions);

        expect(serviceInterfaceIdentifiers.length).toBe(1);

    });

    test("InjectService decorated class with retrieving repository", () =>
    {
        const IFooIdentifier = Symbol("IFoo");
        interface IFoo { };

        @InjectService(IFooIdentifier)
        class Foo implements IFoo { };

        const serviceDefinitions = GetServiceDefinitions();

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

        const serviceDefinitions = GetServiceDefinitions();

        const serviceInterfaceIdentifiers = Object.getOwnPropertySymbols(serviceDefinitions);

        expect(serviceInterfaceIdentifiers.length).toBe(2);

        const barServiceDefinition = serviceDefinitions[IBarIdentifier];

        expect(barServiceDefinition.length).toBe(1);

        expect(barServiceDefinition[0].constructor).toBe(Bar);

        expect(barServiceDefinition[0].parameterServiceIdentifiers.length).toBe(1);

        expect(barServiceDefinition[0].parameterServiceIdentifiers).toContain(IFooIdentifier);
    });

});