import "reflect-metadata";
import { Greeter } from "../../lib/HelloWorld/Greeter";
import { WalmartGreeter } from "../../lib/HelloWorld/WalmartGreeter";
import { dependencies, on } from "../../RpcHandler";

@dependencies([
  {
    token: "config.lng",
    useFactory: () => process.env.LNG || "es"
  }
])
export class HelloWorld {
  constructor(
    private greeter: Greeter,
    private walmartGreeter: WalmartGreeter,
  ) {}

  @on("demo.generic.welcome")
  @dependencies([{ token: 'child.dep', useValue: 'CHILD.DEP' }])
  public sayHelloWorld(params, ctx) {
    return this.greeter.sayHello("Derek", "Pavao");
  }

  @on("demo.walmart.welcome")
  @dependencies([
    { token: 'child.dep', useValue: 'OTHER.CHILD.DEP' },
    { token: 'config.lng', useValue: 'en' }
  ])
  public async welcomeToWalmart(params, ctx) {
    return this.walmartGreeter.welcome("Derek", "Pavao");
  }
}
