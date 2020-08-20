import { awsSecretClient } from "@isubscribed/wiseguy/secretClient/aws";
import sourceMapSupport from "source-map-support";
sourceMapSupport.install();
import Rpc from "@isubscribed/wiseguy/rpc";
import makeDynamoNestedDocumentStore from "@isubscribed/wiseguy/documentStore/dynamo/nested";
import makePlatformApiClient from "@isubscribed/wiseguy/platformApiClient";
import { makeConfigProviders } from "../config";
import { bootstrap } from "../RpcHandler";
import { HelloWorld } from "./HelloWorld";
import { Subscription } from "./Subscription";
import { dynamoConfig } from "./Subscription/dynamoConfig";

const app = Rpc();

const attach = bootstrap(app, {
  globalDependencies: [
    ...makeConfigProviders(),
    {
      token: "config.lng",
      useFactory: () => process.env.LNG || "es",
    },
    {
      token: "PlatformApiClient",
      useFactory: (c) => {
        return makePlatformApiClient({
          baseUrl: `https://${c.resolve("api_domain")}/`,
          credentials: async () => {
            const colonDelimited = await awsSecretClient.getSecret(c.resolve("platform_api_key_secret"));
            const [api_key, secret] = colonDelimited.split(":");
            return { api_key, secret };
          },
        });
      },
    },
    {
      token: "DynamoSubscriptionStore",
      useFactory: (c) => {
        return makeDynamoNestedDocumentStore({
          type: "Subscription",
          typePrefix: "subscription_v1",
          parentIdAttribute: "user_id",
          idAttribute: "name",
          indexNames: ["zuora_id", "parent_user_id_parent_subscription"],
          dynamoConfig: { ...dynamoConfig(c.resolve("subscription_table")) },
        });
      },
    },
  ],
});

attach(HelloWorld, Subscription);
export { app };
