export const catalogSchema = catalog_table => ({
  table: catalog_table,
  hashKey: "document_key",
  rangeKey: "item_id",
  indexes: {
    plan_code_index: {
      hashKey: "document_key",
      rangeKey: "plan_code",
      index: "plan_code_index"
    }
  }
});
