import "reflect-metadata";
import { DependencyProvider } from "../bootstrap";

export function on(rpc_method: string, providers: DependencyProvider[] = []) {
  return (target, name) => {
    const method_handlers = Reflect.getMetadata("method_handlers", target) ?? {};
    method_handlers[rpc_method] = method_handlers[rpc_method] || new Set();
    method_handlers[rpc_method].add(name);

    Reflect.defineMetadata("method_handlers", method_handlers, target);
    Reflect.defineMetadata("dependencies", providers || [], target, name);
  };
}
