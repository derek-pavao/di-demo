import { NextFn } from "@isubscribed/wiseguy/rpc/index.types";
import { BillingContext } from "../lib/Category/CategoryManager";

export function billingPermissions() {
  return async (ctx: BillingContext, next: NextFn) => {
    ctx.permissions = {
      categories: ctx.meta.role?.["billing:categories"]
    };

    await next();
  };
}
