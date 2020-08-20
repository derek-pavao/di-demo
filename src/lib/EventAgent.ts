import { inject, injectable } from 'tsyringe';

@injectable()
export class EventAgent {
  public api_key: string;
  public user_id: string;
  public user_agent: string;
  public role_name: string;
  public ip: string;

  constructor(@inject('ctx') ctx: any) {
    console.log('context', ctx);
    this.api_key = ctx.meta.api_key;
    this.user_id = ctx.meta.user_id;
    this.user_agent = ctx.meta.headers["user-agent"];
    this.role_name = ctx.meta.role?.name;
    ip: ctx.meta.ip
  }
}
