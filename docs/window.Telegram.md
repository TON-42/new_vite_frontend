# window.Telegram and the globalThis

## Overview

`globalThis` is a built-in object provided by the JavaScript runtime environment. It offers a standardized way to access the global object across different JavaScript environments such as web browsers, Node.js, and Web Workers. To be precise `globalThis` is effectively a pointer to the global object, which is `window` in the context of a web browser. It is important to understand the in a WebBrowser the globalThis variable reference the `window` object.

## Why do we care about it?

When the Telegram Web App script (`telegram-web-app.js`) runs , it attaches a Telegram object to the global scope, making it accessible via `window.Telegram` (or `globalThis.Telegram`). The script runs independently from the fact that the app is started inside Telegram or not. The `window.Telegram` will be available also if the app is run in the browser.

## Purpose

- **Consistency Across Environments**: Ensures access to the global object is the same regardless of the environment.
- **Simplified Code**: Reduces the need for environment-specific checks and code.

## Example Usage

```javascript
// Setting a global variable
globalThis.myGlobalVar = "Hello, World!";

// Accessing the global variable
console.log(globalThis.myGlobalVar); // Outputs: Hello, World!
```

## Behavior in Different Environments

- **Web Browsers**: `globalThis` references the `window` object.
- **Node.js**: `globalThis` references the `global` object.
- **Web Workers**: `globalThis` references the `self` object.

## Comparison to C++

### In JavaScript:

- Built-in objects like `globalThis` are part of the runtime environment and always available.
- Other examples include `Math`, `Date`, `JSON`, etc.

```javascript
// Accessing a global variable
globalThis.myGlobalVar = "Hello, World!";
console.log(globalThis.myGlobalVar); // Outputs: Hello, World!
```

### In C++:

- Comparable concepts include standard library classes (e.g., `std::vector`, `std::string`) and global namespace features.
- No direct equivalent to `globalThis`, but singletons and global variables can provide similar functionality.

## globalThis in the context of our Telegram Mini App

When initializing a Telegram Mini App, the `telegram-web-app.js` script attaches a `Telegram` object to the global scope. This object provides various methods and properties for interacting with the Telegram client.

### Attaching to the Global Scope

The `Telegram` object is attached to the `window` object, making it globally accessible within the web app. Since `window` is equivalent to `globalThis` in browsers, you can access the `Telegram` object using either `window.Telegram` or `globalThis.Telegram`.

### Top-Level Overview of `Telegram` Object

The `Telegram` object includes several properties and methods for managing the web app's integration with Telegram:

- **`Telegram.WebApp`**: The main interface for interacting with the Telegram Web App. It includes methods for sending events, handling buttons, and managing the app's appearance and behavior.
  - **Properties**:
    - `initData`: Initialization data passed from the Telegram client.
    - `version`: The version of the Telegram Web App.
    - `colorScheme`: The current color scheme (light or dark).
    - `themeParams`: The current theme parameters.
    - `isExpanded`: Whether the Web App is expanded.
    - `viewportHeight`: The height of the viewport.
    - `viewportStableHeight`: The stable height of the viewport.
    - `isClosingConfirmationEnabled`: Whether closing confirmation is enabled.
    - `headerColor`: The current header color.
    - `backgroundColor`: The current background color.
    - `BackButton`: Object managing the back button.
    - `MainButton`: Object managing the main button.
    - `SettingsButton`: Object managing the settings button.
    - `HapticFeedback`: Object for triggering haptic feedback.
    - `CloudStorage`: Object for managing cloud storage.
    - `BiometricManager`: Object for managing biometric authentication.
  - **Methods**:
    - `onEvent(eventType, callback)`: Sets an event listener.
    - `offEvent(eventType, callback)`: Removes an event listener.
    - `sendData(data)`: Sends data to the Telegram client.
    - `openLink(url, options)`: Opens a link.
    - `showPopup(params, callback)`: Shows a popup.
    - `readTextFromClipboard(callback)`: Reads text from the clipboard.
    - `requestWriteAccess(callback)`: Requests write access.
    - `requestContact(callback)`: Requests contact information.
    - `invokeCustomMethod(method, params, callback)`: Invokes a custom method.
    - `ready()`: Indicates that the Web App is ready.
    - `expand()`: Expands the Web App.
    - `close()`: Closes the Web App.

### Example Usage

```javascript
// Accessing the Telegram object via globalThis
if (globalThis.Telegram && globalThis.Telegram.WebApp) {
  const initParams = globalThis.Telegram.WebApp.initParams;
  console.log("Initialization Parameters:", initParams);

  globalThis.Telegram.WebApp.onEvent(
    "theme_changed",
    (eventType, eventData) => {
      console.log("Theme changed:", eventData);
    },
  );

  globalThis.Telegram.WebApp.ready();
}
```
