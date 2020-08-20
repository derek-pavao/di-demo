import { NestedDocumentStore } from "../wiseguyProviders";

export interface Subscription {
  term_length: string;
}

export class SubscriptionStore extends NestedDocumentStore<Subscription> {}
