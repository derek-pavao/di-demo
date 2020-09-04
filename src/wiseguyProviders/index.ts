import { DocumentMeta } from "@isubscribed/wiseguy/documentStore/meta";
import { NestedDocumentStore as INestedDocumentStore, ReadOptions } from "@isubscribed/wiseguy/documentStore/nested";
import { PageContinuation, PaginationOptions } from "@isubscribed/wiseguy/dynamoClient/pagination";
import { ApiClient } from "@isubscribed/wiseguy/platformApiClient";
import {
  PaginationReadOptions,
  SimpleDocumentStore as ISimpleDocumentStore
} from "@isubscribed/wiseguy/documentStore/simple";

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

class SimpleDocumentStore<T> implements ISimpleDocumentStore<T> {
  public create(e: T): Promise<T & DocumentMeta> {
    return Promise.resolve(undefined);
  }

  public delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public deletePermanently(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public get(id: string, options?: ReadOptions): Promise<T & DocumentMeta> {
    return Promise.resolve(undefined);
  }

  public getMany(ids: string[], options?: ReadOptions): Promise<(T & DocumentMeta)[]> {
    return Promise.resolve([]);
  }

  public list(options?: ReadOptions): Promise<(T & DocumentMeta)[]> {
    return Promise.resolve([]);
  }

  public listPage(
    pagination: PaginationOptions,
    options?: PaginationReadOptions
  ): Promise<{ items: (T & DocumentMeta)[]; continuation: PageContinuation }> {
    return Promise.resolve({ continuation: undefined, items: [] });
  }

  public query(e: Partial<T>, options?: ReadOptions): Promise<(T & DocumentMeta)[]> {
    return Promise.resolve([]);
  }

  public queryPage(
    e: Partial<T>,
    pagination: PaginationOptions,
    options?: PaginationReadOptions
  ): Promise<{ items: (T & DocumentMeta)[]; continuation: PageContinuation }> {
    return Promise.resolve({ continuation: undefined, items: [] });
  }

  public undelete(id: string): Promise<T & DocumentMeta> {
    return Promise.resolve(undefined);
  }

  public update(e: Partial<T>): Promise<T & DocumentMeta> {
    return Promise.resolve(undefined);
  }
}

export { PlatformApiClient, NestedDocumentStore, SimpleDocumentStore };
