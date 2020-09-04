import { CategoryManager } from "../../lib/Category/CategoryManager";
import { rpcHandler, on } from "../../RpcHandler";

@rpcHandler()
export class CategoryHandler {
  constructor(private categoryManager: CategoryManager) {}

  @on("billing.category.list")
  public listCategories() {
    return this.categoryManager.list();
  }
}
