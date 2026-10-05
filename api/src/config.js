// Service configuration, read once at startup.
//
// PORT defaults to 3000. CORS_ORIGIN is the origin the dashboard is
//    served from, for example http://localhost:5173 (see .env.example).
//
export const config = {
  port: Number(process.env.PORT ?? 3000),
  corsOrigin: process.env.CORS_ORIGIN,
};
