import { defineConfig } from 'wxt';
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Unified Live Chat',
    content_scripts: [
      {
        all_frames: true,
        js: ['youtube-main-world.js', 'twitch-main-world.js'],
        matches: ['*://*.twitch.tv/*', '*://*.youtube.com/*'],

      }
    ],
    web_accessible_resources: [
      {
        resources: ['twitch-main-world.js', 'youtube-main-world.js'],
        matches: ['*://*.twitch.tv/*', '*://*.youtube.com/*'],
      },
    ],
    content_security_policy: {
      extension_pages: "script-src 'self' http://localhost:3000; object-src 'self'"
    },
    permissions: [
      'storage',
      'tabs',
      'identity',
      'identity.email',
      'webRequest',
      'scripting',
      'webNavigation',
      'activeTab',
    ],
    key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtYFFJxQ0SozbcUycnbH0k5m1KH+xjqXZowQK/2e9lz3T0jje2S6sO/Wz4tQ0jnGh3rUKmWTIoYgbrTWQcAQAU2bn3etkuVkf9a8H78EQbXPc9fR1oxyE2TOr/OVdwxrOhgRPqNkciTk/Xy0+rb4dYgZoWL+eFr8PIJOzHKm6X2EgRKZ8N6WlWPnOZmqFPg7ry5RaxEoEKwbSbdCf0SYgLHlbwP/Gzg3Ab8+gAGTw3aW7c2Yny5+rCKesdWsWxttoCqmzwWATCuTA4N8qNmhipSHwN54QdK1/+1EeTm36+C8C3VYi3RYwHNAKY6jkQLXSzHO28GgMylWwFBPHzmxm2QIDAQAB',
    oauth2: {
      client_id:
        '1008976916329-fcmtvdina4tm1itf2khdd2pppnjodim3.apps.googleusercontent.com',
      scopes: ['profile email', 'https://www.googleapis.com/auth/contacts'],
    },
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
