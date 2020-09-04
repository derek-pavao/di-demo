import { injectable } from "tsyringe";
import { SubscriptionStore } from "../../client/SubscriptionStore";
import { EventClient } from "../EventClient";

@injectable()
export class SubscriptionManager {
  constructor(private subscriptionStore: SubscriptionStore, private eventClient: EventClient) {}

  public async listSubscriptions(parentId: string) {
    await this.eventClient.publish({ type: "publish.this.event", body: { foo: "bar" } });

    return this.subscriptionStore.list(parentId);
  }
}
