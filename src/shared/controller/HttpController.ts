import type { ParsedQs } from "qs";


export class HTTPController {

 parseQueryObject(query: ParsedQs): Record<string, string | undefined> {
  const stringQuery: Record<string, string | undefined> = {};

  for (const [key, value] of Object.entries(query)) {
    if (typeof value === "string") {
      stringQuery[key] = value;
      continue;
    }

    if (Array.isArray(value)) {
      const first = value.find((v) => typeof v === "string");
      stringQuery[key] = first;
      continue;
    }
    stringQuery[key] = undefined;
  }

  return stringQuery;
}
}