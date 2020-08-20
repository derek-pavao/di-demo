import { inject, injectable } from "tsyringe";
import { EventAgent } from "./EventAgent";
import { ApiClient } from '@isubscribed/wiseguy/platformApiClient';

@injectable()
export class EventClient {
  constructor(
    @inject("PlatformApiClient") private apiClient: ApiClient,
    @inject("event_channel") private eventChannel: string,
    private agent: EventAgent
  ) {}

  public async publish(eventData) {
    const body = { ...eventData.body };
    const event = {
      aura_event: "2",
      agent: this.agent,
      ...eventData,
      channel: this.eventChannel,
      occurred_at: new Date().toISOString(),
      body
    };

    try {
      console.log('PUBLISH THIS EVENT', event);
      // await this.apiClient('event.channel.publish', event)
    } catch (err) {
      console.error('could not publish the event', err);
    }
  }
}
