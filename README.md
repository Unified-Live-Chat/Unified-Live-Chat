# Unified Live Chat Extension

## Development
### Getting Started

1. [Download PNPM](https://pnpm.io/).
2. Install dependencies: `pnpm install`.
3. create a `.env` file.
4. Start the development server: `wxt dev`.
5. Go to `chrome://extensions/` on Chrome, turn on developer mode, press "Load unpacked" and open the `.output/chrome-mv3-dev` folder.

### Tech Stack

I'm only testing on Chrome for now. I plan to test on Brave, Edge, and port to Firefox when it's closer to complete.

#### Main Libraries
- Package Manager: [PNPM](https://pnpm.io/)
- Extension Framework: [WXT](https://wxt.dev/)
- JS Framework: [React](https://react.dev/)
- Styling: [Tailwind](https://tailwindcss.com/)
- Components: [shadcn](https://ui.shadcn.com/)

#### Dev Tools
- Linting: [ESLint](https://eslint.org/)
- Formatting: [Prettier](https://prettier.io/)
- Pre-commit: [Husky](https://typicode.github.io/husky/)

### Project Structure

For more information about general WXT information, view their [project structure guide](https://wxt.dev/guide/essentials/project-structure.html) 

- `.husky/` - Pre-commit check runner
- `components/` - The React components used in the project
  - `icons/` -  The images of the project
    - `services/` - The service's logos
    - `assets/` - Everything else
  - `popup/` - The components for the popup menu
    - `service/` - Components for the integrated services
  - `settings/` - The components for the settings screen
  - `ui/` - shadcn components
- `entrypoints/` - All of the unique items in the app
  - `popup/` - The popup displayed when the user clicks the extension icon
  - `settings/` - The full page settings menu to edit more detailed information
  - `background.ts` - The bridge between the extension and the content script ([Docs](https://wxt.dev/guide/essentials/entrypoints.html#background))
  - `content.ts` - The bridge between the background script and the webpage ([Docs](https://wxt.dev/guide/essentials/content-scripts.html))
  - `*-main-world.ts` - The injection script for the appropriate service ([Docs](https://wxt.dev/guide/essentials/content-scripts.html#isolated-world-vs-main-world))
- `lib/` - Required folder for shadcn
- `public/` - Holds the icons for the app
- `utils/` - Holds some const utilities