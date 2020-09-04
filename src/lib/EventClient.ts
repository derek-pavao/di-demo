import { inject, injectable } from "tsyringe";
import { PlatformApiClient } from "../wiseguyProviders";
import { EventAgent } from "./EventAgent";

@injectable()
export class EventClient {
  constructor(
    private apiClient: PlatformApiClient,
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
      console.log("PUBLISH THIS EVENT", event);
      // await this.apiClient("event.channel.publish", event);
    } catch (err) {
      console.error("could not publish the event", err);
    }
  }
}
