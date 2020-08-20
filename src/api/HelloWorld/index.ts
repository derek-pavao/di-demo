import "reflect-metadata";
import { Greeter } from "../../lib/HelloWorld/Greeter";
import { WalmartGreeter } from "../../lib/HelloWorld/WalmartGreeter";
import { on, rpcHandler } from "../../RpcHandler";

@rpcHandler()
export class HelloWorld {
  constructor(private greeter: Greeter, private walmartGreeter: WalmartGreeter) {}

  @on("demo.generic.welcome", [{ token: "config.lng", useValue: "en" }])
  public sayHelloWorld(params, ctx) {
    return this.greeter.sayHello("Derek", "Pavao");
  }

  @on("demo.walmart.welcome")
  public async welcomeToWalmart(params, ctx) {
    return this.walmartGreeter.welcome("Derek", "Pavao");
  }
}
