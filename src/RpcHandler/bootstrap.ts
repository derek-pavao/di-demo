import { Rpc, RpcContext } from "@isubscribed/wiseguy/rpc/index.types";
import { container, InjectionToken, Provider } from "tsyringe";

export type DependencyProvider = {
  token: InjectionToken;
  options?: RegistrationOptions;
} & Provider<any>;
export interface DependencyConfig {
  globalDependencies?: DependencyProvider[];
  requestDependencies?: DependencyProvider[];
}

export function bootstrap(
  app: Rpc<RpcContext>,
  config: DependencyConfig
): (...handlerClasses: { new (...args: any[]) }[]) => void {
  return (...classesToRegister) => {
    classesToRegister.forEach((HandlerClass) => {
      const method_handlers = Reflect.getMetadata("method_handlers", HandlerClass.prototype);
      const constructor_params = Reflect.getMetadata("design:paramtypes", HandlerClass) ?? [];
      const global_deps = config.globalDependencies || [];
      global_deps.forEach((dep) => {
        container.register(dep.token, dep as any); // TODO Figure out why this type cast is needed, and below
      });
      const tokens = Reflect.getMetadata("injectionTokens", HandlerClass) ?? {};

      for (const [method_name, handler_names] of Object.entries<Set<string>>(method_handlers)) {
        Array.from(handler_names).forEach((handler_name) => {
          app.on(method_name, async (params, ctx) => {
            const request_container = container.createChildContainer();
            const child_deps = config.requestDependencies || [];
            child_deps.forEach((dep) => request_container.register(dep.token, dep as any));

            const local_deps = Reflect.getMetadata("dependencies", HandlerClass.prototype, handler_name) || [];
            local_deps.forEach((dep) => request_container.register(dep.token, dep));

            request_container.register("ctx", { useValue: ctx });
            request_container.register("req_params", { useValue: params });

            const handler = new HandlerClass(
              ...constructor_params.map((d, i) => request_container.resolve(tokens[i] ? tokens[i] : d))
            );

            return handler[handler_name].call(handler, params, ctx);
          });
        });
      }
    });
  };
}
