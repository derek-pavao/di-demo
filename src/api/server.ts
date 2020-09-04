import rpcHttp from "@isubscribed/wiseguy/rpcHttp";
import remoteAuthorizer from "@isubscribed/wiseguy/remoteAuthorizer";
import { app } from "./";

process.on("SIGTERM", () => process.kill(process.pid, "SIGINT"));

const gatewayAuthorizer = remoteAuthorizer("gateway_authorizer");

// const server = rpcHttp(app, { authorizer: gatewayAuthorizer });

const server = rpcHttp(app, { authorizer: gatewayAuthorizer });

server.listen(8000, () => {
  console.log("listening on localhost port: 8000");
});
