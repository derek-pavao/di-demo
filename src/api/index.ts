import sourceMapSupport from "source-map-support";
sourceMapSupport.install();

import makeDynamoSimpleDocumentStore from "@isubscribed/wiseguy/documentStore/dynamo/simple";
import { CategoryStore } from "../client/CategoryStore";
import { SubscriptionStore } from "../client/SubscriptionStore";
import { awsSecretClient } from "@isubscribed/wiseguy/secretClient/aws";
import Rpc from "@isubscribed/wiseguy/rpc";
import makeDynamoNestedDocumentStore from "@isubscribed/wiseguy/documentStore/dynamo/nested";
import makePlatformApiClient from "@isubscribed/wiseguy/platformApiClient";
import { makeConfigProviders } from "../config";
import { catalogSchema } from "../lib/Category/catalogSchema";
import { EventClient } from "../lib/EventClient";
import { bootstrap } from "../RpcHandler";
import { PlatformApiClient } from "../wiseguyProviders";
import { HelloWorld } from "./HelloWorld";
import { billingPermissions } from "./permissions";
import { SubscriptionHandler } from "./Subscription";
import { CategoryHandler } from "./Category";
import { dynamoConfig } from "./Subscription/dynamoConfig";

const app = Rpc();

const attach = bootstrap(app, {
  globalDependencies: [
    ...makeConfigProviders(),
    {
      token: "config.lng",
      useFactory: () => process.env.LNG || "es"
    },
    {
      token: PlatformApiClient,
      useFactory: c =>
        makePlatformApiClient({
          baseUrl: `https://${c.resolve("api_domain")}/`,
          credentials: async () => {
            const colonDelimited = await awsSecretClient.getSecret(c.resolve("platform_api_key_secret"));
            const [api_key, secret] = colonDelimited.split(":");
            return { api_key, secret };
          }
        })
    },
    {
      token: SubscriptionStore,
      useFactory: c =>
        makeDynamoNestedDocumentStore({
          type: "Subscription",
          typePrefix: "subscription_v1",
          parentIdAttribute: "user_id",
          idAttribute: "name",
          indexNames: ["zuora_id", "parent_user_id_parent_subscription"],
          dynamoConfig: { ...dynamoConfig(c.resolve("subscription_table")) }
        })
    },
    {
      token: CategoryStore,
      useFactory: c =>
        makeDynamoSimpleDocumentStore({
          type: "Category",
          hashKeyValue: "category_v1",
          idAttribute: "category_key",
          dynamoConfig: {
            ...catalogSchema(c.resolve("catalog_table"))
          }
        })
    }
  ]
});

app.use(billingPermissions());

attach(HelloWorld, SubscriptionHandler, CategoryHandler);
export { app };
