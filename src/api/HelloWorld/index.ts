import "reflect-metadata";
import { registry } from "tsyringe";
import { Greeter } from "../../lib/HelloWorld/Greeter";
import { WalmartGreeter } from "../../lib/HelloWorld/WalmartGreeter";
import { on } from "../../RpcHandler";

@registry([
  {
    token: "config.lng",
    useFactory: () => process.env.LNG || "es"
  }
])
export class HelloWorld {
  constructor(
    private greeter: Greeter,
    private walmartGreeter: WalmartGreeter
  ) {}

  @on("demo.generic.welcome")
  public sayHelloWorld(params, ctx) {
    return this.greeter.sayHello("Derek", "Pavao");
  }

  @on("demo.walmart.welcome")
  public async welcomeToWalmart() {
    return this.walmartGreeter.welcome("Derek", "Pavao");
  }
}
