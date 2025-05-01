import { defineConfig } from 'wxt';
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({mode}) => {

    const manifestExtra: object = mode === 'development' ? {
      key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5B+Mq5ZZwmPfQ6kps1W/RKWbf7bzZ1eJmHtxvIXTJWakyJ0o3lu7+y/sDpfQSF2atJDwNPG8/mbCPC7j4CwSviE1XACZyi44Ps9j5iAUAhRoibg302GY1cndPVb2GbmZU2RCGV/trIHpJuirh8VZkcSOdWb88Y7zg4FmjoRo9KBouGJJ6HekZqlfGIMca9MRmlTMNDNPA+HA/go0yIPgkok7t7/ipq0Ao9AtBquosNvxUlvy1er+QqpCSg08t1PWTeq2FDWnj/htwO32TS725vTHegyib2z+78Gigz2MGGls9Mt+BxC3O3WUaga/WJMnhEbkOk/GQtV1Eh0yvjSDoQIDAQAB',
      content_security_policy: {
        extension_pages: "script-src 'self' http://localhost:3000; object-src 'self'"
      }
    } : {
      content_security_policy: {
        extension_pages: "script-src 'self'; object-src 'self'"
      }
    };

    return {
      name: 'Unified Live Chat',
      description: 'Combines the live chats of different streaming services into a single feed.',
      content_scripts: [
        {
          all_frames: true,
          js: ['youtube-main-world.js', 'twitch-main-world.js'],
          matches: ['https://www.twitch.tv/*', 'https://www.youtube.com/*'],
    
        }
      ],
      web_accessible_resources: [
        {
          resources: ['twitch-main-world.js', 'youtube-main-world.js'],
          matches: ['https://www.twitch.tv/*', 'https://www.youtube.com/*'],
        },
      ],
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
      oauth2: {
        client_id:
          '1008976916329-fcmtvdina4tm1itf2khdd2pppnjodim3.apps.googleusercontent.com',
        scopes: ['openid', 'email', 'profile'],
      },
      ...manifestExtra,
    };
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
