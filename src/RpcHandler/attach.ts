import 'reflect-metadata';
import { Rpc } from '@isubscribed/wiseguy/rpc/index.types';
import { container } from 'tsyringe';

export function attach(app: Rpc<any>, HandlerClass: { new (...args: any[]) }): void {
  const method_handlers = Reflect.getMetadata('method_handlers', HandlerClass.prototype);
  const deps = Reflect.getMetadata('design:paramtypes', HandlerClass) ?? [];
  console.log('deps', deps);

  const handler = new HandlerClass(...deps.map((d) => container.resolve(d)));

  for (const [method_name, handler_names] of Object.entries<Set<string>>(method_handlers)) {
    Array.from(handler_names).forEach((handler_name) => {
      app.on(method_name, handler[handler_name].bind(handler))
    });
  }
}
