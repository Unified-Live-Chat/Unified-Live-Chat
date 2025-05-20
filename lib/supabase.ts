import {
  AuthResponse,
  OAuthResponse,
  Provider,
  UserResponse,
} from '@supabase/supabase-js';

// This is a wrapper that will proxy Supabase operations to the background script
export class SupabaseContentClient {
  async getSession(): Promise<AuthResponse> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'SUPABASE_GET_SESSION' }, resolve);
    });
  }

  async getUser(): Promise<UserResponse> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'SUPABASE_GET_USER' }, resolve);
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

  async signOut(): Promise<void> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'SUPABASE_SIGN_OUT' }, resolve);
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

  async unlinkIdentity(provider: Provider): Promise<OAuthResponse> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { type: 'SUPABASE_UNLINK_IDENTITY', provider },
        resolve,
      );
    });
  }
}

// This is the client that will be used in the popup
export const supabase = new SupabaseContentClient();
