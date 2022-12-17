describe("", () =>
{
    test("", () =>
    {

    });
});

const IFooIdentifier = Symbol("IFoo");
interface IFoo
{
    get Foo(): string;
}
class Foo implements IFoo
{
    constructor() { }

    get Foo(): string
    {
        return "foo";
    }
}