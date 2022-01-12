import { CreateUUID } from "./helper";

// export const host = config.mqttURL;
export const port = 443;
// export const BASE_API = config.baseURL;
// export const CALL_BASE_API = config.callURL;
// export const { subDomain } = config;
export const PAGE_SIZE = 20;
// export const GOOGLE_API = config.googleUrl;

const APIEndPoints = {
  // account
};
export default APIEndPoints;

export const APIHeaders = {
  Accept: "application/protobuf",
  "Content-Type": "application/protobuf",
  "Debug-Id": CreateUUID().replace(/-/g, ""),
};
export const APIHeadersForMultipartFormData = {
  Accept: "application/json",
  "Debug-Id": CreateUUID().replace(/-/g, ""),
};
export const APIHeadersTypeJSON = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Debug-Id": CreateUUID().replace(/-/g, ""),
};
