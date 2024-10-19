# TabMap

## Overview

TabMap is a browser extension that helps users manage their tabs efficiently. It provides a visual representation of open tabs, allowing users to navigate and organize their browsing experience seamlessly.

## Features

- **Visual Tab Management**: View all open tabs in a single interface.
- **Tab Activation**: Click on a tab to activate it and navigate to its URL.
- **Keyboard Shortcuts**: Use keyboard shortcuts to quickly access TabMap.

## Installation

1. Download the extension from the Chrome Web Store (not yet available) or build it from source.
2. If building from source, clone the repository and run:
   ```bash
   git clone https://github.com/your-repo/tabmap.git
   cd tabmap
   npm install
   npm run build
   ```
3. Load the unpacked extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` directory.

## Usage

- **Opening TabMap**: Click the extension icon in the toolbar or use the keyboard shortcut `Ctrl+1` (or `Command+1` on Mac).
- **Navigating Tabs**: Click on any tab in the TabMap interface to activate it.

## Troubleshooting

- If the extension does not load, ensure that you have the latest version of Chrome and that the extension is enabled in the extensions page.
- For any bugs or issues, please check the [GitHub Issues](https://github.com/your-repo/issues) page for solutions or to report new issues.

## Development Setup

To set up the development environment for TabMap, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/tabmap.git
   cd tabmap
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

4. **Open the Extension in Chrome**
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` directory.

### Hints

You can make the Chrome Profile for development permanent, by using the `.webextrc` file.

## Themes

Themes can be switched by changing the css class in `App.tsx`

- `theme-default`
- `theme-flat`

## Project Structure

- `src/`: Contains the source code for the extension.
  - `App.svelte`: Main application component.
  - `lib/`: Contains utility functions, components, and stores.
  - `uiComponents/`: UI components used in the application.
  - `main.ts`: Entry point for the application.
- `dist/`: Compiled files for the extension.
- `docs/`: Documentation files, including the roadmap and changelog.
- `manifest.json`: Configuration file for the Chrome extension.

## Building the Project

To build the project for production, run:

```bash
npm run build
```

This will generate the necessary files in the `dist/` directory.

## Testing

To run tests, use:

```bash
npm run test
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
