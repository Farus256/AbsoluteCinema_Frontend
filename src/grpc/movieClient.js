import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { APP_CONFIG } from "../env";
import { MovieGrpc } from "./movies";

// Транспорт для gRPC-Web. Працює через HTTP/1.1, тому сумісний з Vite dev сервером.
const transport = createConnectTransport({
  baseUrl: APP_CONFIG.GRPC_URL || APP_CONFIG.HUB_URL || "http://localhost:5299",
});

export const movieGrpcClient = createPromiseClient(MovieGrpc, transport);

