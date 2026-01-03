import "express-serve-static-core";
import type { RequestingAccountContext } from "../shared/types/RequestingAccountContext";

declare module "express-serve-static-core" {
  interface Request {
    requestingAccount?: RequestingAccountContext;
  }
}