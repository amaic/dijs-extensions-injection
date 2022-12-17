import { GetServiceConstructors, InjectService } from "../src";
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

        const serviceConstructors = GetServiceConstructors();

        const serviceInterfaceIdentifiers = Object.getOwnPropertySymbols(serviceConstructors);

        expect(serviceInterfaceIdentifiers.length).toBe(1);

    });

    test("InjectService decorated class with retrieving repository", () =>
    {
        const IFooIdentifier = Symbol("IFoo");
        interface IFoo { };

        @InjectService(IFooIdentifier)
        class Foo implements IFoo { };

        const serviceConstructors = GetServiceConstructors();

        const serviceInterfaceIdentifiers = Object.getOwnPropertySymbols(serviceConstructors);

        expect(serviceInterfaceIdentifiers.length).toBe(1);
    });

});