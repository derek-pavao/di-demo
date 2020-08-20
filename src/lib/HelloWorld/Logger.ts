import { singleton } from "tsyringe";

@singleton()
export class Logger {
  public info(msg: string): void {
    console.info(msg);
  }

  public warn(msg: string): void {
    console.warn(msg);
  }
}
