import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { APP_CONFIG } from "../env";
import { MovieGrpc } from "./movies_connect";

// gRPC-Web transport for ASP.NET Core (MapGrpcService + EnableGrpcWeb)
const transport = createGrpcWebTransport({
  // Requests will go to <baseUrl>/<package>.<service>/method
  // e.g., http://localhost:5299/movies.MovieGrpc/GetMovieById
  baseUrl: APP_CONFIG.GRPC_URL || "http://localhost:5299",
  useBinaryFormat: true, // Use binary format for better performance
  jsonOptions: {
    // Explicitly set JSON options
    typeRegistry: []
  },
  // Add interceptors for better error handling
  interceptors: [
    (next) => async (req) => {
      try {
        return await next(req);
      } catch (error) {
        console.error('gRPC request failed:', {
          method: req.method.name,
          error: error.message,
          details: error.details || 'No details',
          code: error.code || 'UNKNOWN'
        });
        throw error;
      }
    }
  ]
});

export const movieGrpcClient = createPromiseClient(MovieGrpc, transport);

