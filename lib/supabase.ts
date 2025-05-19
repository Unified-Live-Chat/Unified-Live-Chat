import { AuthResponse, OAuthResponse, Provider } from '@supabase/supabase-js';

// This is a wrapper that will proxy Supabase operations to the background script
export class PopupSupabaseClient {
  async getSession(): Promise<AuthResponse> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'SUPABASE_GET_SESSION' }, resolve);
    });
  }

  async signInWithOAuth(
    provider: Provider,
    scopes: string,
  ): Promise<OAuthResponse> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { type: 'SUPABASE_SIGN_IN', provider, scopes },
        resolve,
      );
    });
  }

  async linkIdentity(
    provider: Provider,
    scopes: string,
  ): Promise<OAuthResponse> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { type: 'SUPABASE_LINK_IDENTITY', provider, scopes },
        resolve,
      );
    });
  }
}

// This is the client that will be used in the popup
export const supabase = new PopupSupabaseClient();
