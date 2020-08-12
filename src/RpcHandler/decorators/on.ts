import 'reflect-metadata';

export function on(rpc_method: string) {
  return (target, name) => {
    const method_handlers = Reflect.getMetadata('method_handlers', target) ?? {};
    method_handlers[rpc_method] = method_handlers[rpc_method] || new Set();
    method_handlers[rpc_method].add(name);

    Reflect.defineMetadata('method_handlers', method_handlers, target);
  };
}
