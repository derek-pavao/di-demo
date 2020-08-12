import Rpc from '@isubscribed/wiseguy/rpc';
import { attach } from '../RpcHandler';
import { HelloWorld } from './HelloWorld';

const app = Rpc();

attach(app, HelloWorld);

export { app };
