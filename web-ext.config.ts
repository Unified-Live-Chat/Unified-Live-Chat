import { defineWebExtConfig } from 'wxt';

// This file is normally in .gitignore. Removed so Chrome never auto-opens.
// This may need to be reveted if persitant data for debugging is used.
// https://wxt.dev/guide/essentials/config/browser-startup.html#disable-opening-browser

export default defineWebExtConfig({
  disabled: true,
});
