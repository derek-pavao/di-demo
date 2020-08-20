import { NestedDocumentStore } from "@isubscribed/wiseguy/documentStore/nested";
import { inject, injectable } from "tsyringe";
import { EventClient } from "../EventClient";

@injectable()
export class SubscriptionManager {
  constructor(
    @inject("DynamoSubscriptionStore")
    private subscriptionStore: NestedDocumentStore<any>,
    private eventClient: EventClient
  ) {
    console.log("sub store", this.subscriptionStore);
  }

  public async listSubscriptions(parentId: string) {

    await this.eventClient.publish({ event: "publish.this.event", body: { foo: 'bar' } });
    return this.subscriptionStore.list(parentId);
  }
}
