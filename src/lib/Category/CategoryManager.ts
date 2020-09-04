import sortBy from "@isubscribed/wiseguy/documentStore/sortBy";
import { RpcContext } from "@isubscribed/wiseguy/rpc/index.types";
import { inject, injectable } from "tsyringe";
import { Category, CategoryStore } from "../../client/CategoryStore";
import { EventClient } from "../EventClient";

export interface BillingPermissions {
  categories?: string[];
}
export interface BillingContext extends RpcContext {
  permissions?: BillingPermissions;
}

@injectable()
export class CategoryManager {
  public static isAllowedCategory({ category_key }: Category, permissions: BillingPermissions): boolean {
    if (!permissions.categories) {
      return false;
    }
    return permissions.categories.find(pattern => pattern == "*" || pattern == category_key) !== undefined;
  }
  constructor(
    private eventClient: EventClient,
    private categoryStore: CategoryStore,
    @inject("ctx") private ctx: BillingContext
  ) {}

  public async list(): Promise<Category[]> {
    let categories = await this.categoryStore.list();

    categories = categories.filter(cat => CategoryManager.isAllowedCategory(cat, this.ctx.permissions));
    return sortBy(categories, "category_key");
  }
}
