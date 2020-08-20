import { inject, injectable } from "tsyringe";
import { Logger } from "./Logger";

@injectable()
export class Greeter {
  constructor(
    private logger: Logger,
    @inject("config.lng") private lng: string
  ) {}

  public sayHello(firstName: string, lastName: string): string {
    const greeting = `${this.lng === 'es' ? 'Hola' : 'Hello'} ${firstName} ${lastName}`;
    this.logger.info(greeting);
    return greeting;
  }
}
