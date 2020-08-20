import { DocumentMeta } from "@isubscribed/wiseguy/documentStore/meta";
import makePlatformApiClient from "@isubscribed/wiseguy/platformApiClient";
import makeDynamoNestedDocumentStore, { Opts } from "@isubscribed/wiseguy/documentStore/dynamo/nested";
import { NestedDocumentStore as INestedDocumentStore, ReadOptions } from "@isubscribed/wiseguy/documentStore/nested";
import { awsSecretClient } from "@isubscribed/wiseguy/secretClient/aws";
import { ApiClient } from "@isubscribed/wiseguy/platformApiClient";

interface PlatformApiClient extends ApiClient {}
class PlatformApiClient implements ApiClient {}

class NestedDocumentStore<T> implements INestedDocumentStore<T> {
  public create(t: T): Promise<T & DocumentMeta> {
    return Promise.resolve(undefined);
  }

  public delete(parentId: string, id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public deletePermanently(parentId: string, id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public get(parentId: string, id: string, options?: ReadOptions): Promise<T & DocumentMeta> {
    return Promise.resolve(undefined);
  }

  public list(parentId: string, options?: ReadOptions): Promise<(T & DocumentMeta)[]> {
    return Promise.resolve([]);
  }

  public query(t: Partial<T>, options?: ReadOptions): Promise<(T & DocumentMeta)[]> {
    return Promise.resolve([]);
  }

  public undelete(parentId: string, id: string): Promise<T & DocumentMeta> {
    return Promise.resolve(undefined);
  }

  public update(t: Partial<T>): Promise<T & DocumentMeta> {
    return Promise.resolve(undefined);
  }
}

export { PlatformApiClient, NestedDocumentStore };
