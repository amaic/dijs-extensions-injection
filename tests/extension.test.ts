import { ServiceCollection } from "@amaic/dijs";
import "../src";
import { InjectService } from "../src";

describe("extension", () =>
{
    test("InjectServices", () =>
    {
        const IFooIdentifier = Symbol("IFoo");
        interface IFoo
        {
            GetFoo(): string;
        }
        @InjectService<IFoo, typeof Foo>(IFooIdentifier)
        class Foo implements IFoo
        {
            GetFoo(): string
            {
                return "foo";
            }

        }

        const IBarIdentifier = Symbol("IBar");
        interface IBar
        {
            get Foo(): IFoo;

            GetBar(): string;
        }
        @InjectService<IBar, typeof Bar>(IBarIdentifier, IFooIdentifier)
        class Bar implements IBar
        {
            constructor(foo: IFoo)
            {
                this.Foo = foo;
            }

            readonly Foo: IFoo;

            GetBar(): string
            {
                return "bar";
            }

        }

        const serviceCollection = new ServiceCollection();

        serviceCollection.InjectServices();

        const serviceProvider = serviceCollection.CreateServiceProvider();

        const bar = serviceProvider.GetRequiredService<IBar>(IBarIdentifier);

        expect(bar).toBeInstanceOf(Bar);

        expect(bar.GetBar()).toBe("bar");

        expect(bar.Foo).toBeInstanceOf(Foo);

        expect(bar.Foo.GetFoo()).toBe("foo");
    });
});


