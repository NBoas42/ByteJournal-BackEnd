import type { RequestingAccountContext } from "./RequestingAccountContext";

declare global {
  namespace Express {
    interface Request {
      requestingAccount: RequestingAccountContext;
    }
  }
}