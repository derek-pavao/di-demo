import rpcHttp from "@isubscribed/wiseguy/rpcHttp";
import { app } from "./api";

const server = rpcHttp(app, {});

server.listen(8000, () => {
  console.log("listening on localhost port: 8000");
});
