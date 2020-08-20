import "reflect-metadata";
import { container, DependencyContainer, injectable } from "tsyringe";

@injectable()
class TheDep {}

describe("The DI Container", () => {
  let childContainer: DependencyContainer;

  beforeEach(() => {
    childContainer = container.createChildContainer();
  });
  test("it should do things", () => {
    container.register(TheDep, { useValue: "THE DEP VALUE" });
    childContainer.register(TheDep, { useClass: TheDep });
    const resolvedChildDep = childContainer.resolve(TheDep);
    console.log("resolvedDep", resolvedChildDep);

    const resolvedGlobalDep = container.resolve(TheDep);
    console.log("resolvedGlobalDep", resolvedGlobalDep);
  });
});
