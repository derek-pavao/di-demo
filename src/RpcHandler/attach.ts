import "reflect-metadata";
import { Rpc } from "@isubscribed/wiseguy/rpc/index.types";
import { container } from "tsyringe";

export function attach(
  app: Rpc<any>,
  HandlerClass: { new (...args: any[]) }
): void {
  const method_handlers = Reflect.getMetadata(
    "method_handlers",
    HandlerClass.prototype
  );
  const constructor_params = Reflect.getMetadata("design:paramtypes", HandlerClass) ?? [];
  const global_deps = Reflect.getMetadata("dependencies", HandlerClass) ?? [];
  global_deps.forEach(dep => {
    container.register(dep.token, dep);
  });
  const tokens = Reflect.getMetadata("injectionTokens", HandlerClass) ?? {};
  for (const [method_name, handler_names] of Object.entries<Set<string>>(
    method_handlers
  )) {
    Array.from(handler_names).forEach(handler_name => {
      app.on(method_name, (params, ctx) => {
        const requestContainer = container.createChildContainer();
        const child_deps =
          Reflect.getMetadata(
            "dependencies",
            HandlerClass.prototype,
            handler_name
          ) || [];
        child_deps.forEach(dep => requestContainer.register(dep.token, dep));

        requestContainer.register("ctx", { useValue: ctx });
        requestContainer.register("req_params", { useValue: params });

        const handler = new HandlerClass(
          ...constructor_params.map((d, i) =>
            requestContainer.resolve(tokens[i] ? tokens[i] : d)
          )
        );
        console.log("child_deps", child_deps);
        return handler[handler_name].call(handler, params, ctx);
      });
    });
  }
}
