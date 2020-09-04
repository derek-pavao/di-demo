import { SubscriptionManager } from "../../lib/Subscription/SubscriptionManager";
import { on, rpcHandler } from "../../RpcHandler";

@rpcHandler()
export class SubscriptionHandler {
  constructor(private subscriptionManager: SubscriptionManager) {}

  @on("billing.subscription.list")
  public createSubscription(params, ctx) {
    return this.subscriptionManager.listSubscriptions(params.parent_id);
  }
}
