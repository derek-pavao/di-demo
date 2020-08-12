import { inject, injectable } from "tsyringe";
import { Logger } from "./Logger";

@injectable()
export class WalmartGreeter {
  constructor(
    private logger: Logger,
    @inject("config.lng") private lng: string
  ) {}

  public welcome(firstName: string, lastName: string): string {
    const msg = `${this.lng === 'es' ? 'Bienvenidos a Walmart' : 'Welcome to Walmart'} ${firstName} ${lastName} `
    this.logger.info(msg);
    return msg;
  }
}
