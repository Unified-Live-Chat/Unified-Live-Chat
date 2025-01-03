import { GoogleAccount } from "./service-account";

export const GetGoogleAccount = storage.defineItem<GoogleAccount>(
    'local:googleAccount',
    {},
  );