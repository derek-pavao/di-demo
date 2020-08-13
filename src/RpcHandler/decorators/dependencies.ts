import 'reflect-metadata';
import { Provider } from 'tsyringe';
import InjectionToken from 'tsyringe/dist/typings/providers/injection-token';

export function dependencies(args: ({
  token: InjectionToken;
  options?: RegistrationOptions;
} & Provider<any>)[] = []) {
  return function (target, name?) {
    Reflect.defineMetadata('dependencies', args, target, name);
  }
}
