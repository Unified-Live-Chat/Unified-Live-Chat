import { createClient } from '@supabase/supabase-js';
import { storage } from '#imports';

const supabaseUrl = import.meta.env.WXT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.WXT_SUPABASE_ANON_KEY;

export default defineBackground(() => {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    if (message.type === 'open-settings') {
      chrome.tabs.create({ url: '/settings.html' });
    }
  });

  // add tab listener when background script starts
  chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, tab) => {
    if (tab.url?.startsWith(chrome.identity.getRedirectURL())) {
      finishUserOAuth(tab);
    }
  });

  /**
   * Method used to finish OAuth callback for a user authentication.
   * Based on an example authored by Dragos Sebestin:
   * https://beastx.ro/supabase-login-with-oauth-in-chrome-extensions
   */
  async function finishUserOAuth(tab: chrome.tabs.Tab) {
    if (!tab) throw new Error('Tab is undefined.');
    if (!tab.url)
      throw new Error(
        'Tab URL cannot be empty. Tab data: ' + JSON.stringify(tab),
      );
    if (!tab.id)
      throw new Error(
        'Tab ID cannot be empty. Tab data: ' + JSON.stringify(tab),
      );

    try {
      // extract tokens from hash
      const hashMap = parseUrlHash(tab.url);
      const access_token = hashMap.get('access_token');
      const refresh_token = hashMap.get('refresh_token');
      if (!access_token || !refresh_token) {
        throw new Error(`no supabase tokens found in URL hash`);
      }

      // Authenticate
      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      if (error) throw error;

      // Save data
      const provider = await storage.getItem('session:provider');
      const storage_key = `sync:${provider}_data` as `sync:${string}`;
      await storage.setItem(storage_key, data);

      // Delete the tab
      chrome.tabs.remove(tab.id);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Helper method used to parse the hash of a redirect URL.
   * Based on an example authored by Dragos Sebestin:
   * https://beastx.ro/supabase-login-with-oauth-in-chrome-extensions
   */
  function parseUrlHash(url: string) {
    const hashParts = new URL(url).hash.slice(1).split('&');
    const hashMap = new Map(
      hashParts.map((part) => {
        const [name, value] = part.split('=');
        return [name, value];
      }),
    );

    return hashMap;
  }
});
