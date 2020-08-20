export const dynamoConfig = subscription_table => ({
  table: subscription_table,
  hashKey: "user_id",
  rangeKey: "document_key",
  indexes: {
    zuora_id: {
      hashKey: "zuora_id",
      index: "zuora_id"
    },
    status_term_end: {
      hashKey: "status",
      rangeKey: "term_end",
      index: "status_term_end"
    },
    status_term_start: {
      hashKey: "status",
      rangeKey: "term_start",
      index: "status_term_start"
    },
    parent_user_id_parent_subscription: {
      hashKey: "parent_user_id",
      rangeKey: "parent_subscription",
      index: "parent_user_id_parent_subscription"
    }
  }
});
