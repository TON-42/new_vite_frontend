# ChatPay TMA Frontend

The ChatPay TMA Frontend is a Vite React application that allows users to interact with the ChatPay backend. Users can see their chats and manage their data. ChatPay empowers Telegram users to sell their chats (cleaned of personal data) to train AI.

For a general introduction to ChatPay, please refer to the [ChatPay Organization README](https://github.com/TON-42).

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Roadmap](#roadmap)
- [FAQ](#faq)

## Introduction

ChatPay TMA Frontend enables users to interact with the ChatPay backend, view their Telegram chats, and manage their data. This app is part of the ChatPay ecosystem, which includes a backend and a website.

## Installation

### Prerequisites

- Node.js
- npm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/TON-42/new_vite_frontend
   cd new_vite_frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```env
   VITE_BACKEND_URL=https://your-backend.com
   VITE_USER_TYPE=new  # Can be 'lead', 'invitee', or 'new'
   VITE_MOCK_USER=true  # To control whether Telegram user is mocked or not
   VITE_USE_MSW=true  # To control whether MSW is used or not
   VITE_NUM_CHATS=5  # Set the number of chats for the selected user [atm implemetned only for the lead user]
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Ensure the backend is running and accessible at the URL specified in the `.env` file.
2. Start the frontend application as described in the [Setup](#setup) section.
3. Open your browser and navigate to the development server URL indicated in the console after you run `npm run dev`.

## Features

- View Telegram chats.
- Manage chat data.
- [Add more features here]

## Tech Stack

- **Vite**: Build tool.
- **React**: JavaScript library for building user interfaces.
- **MSW**: Mock Service Worker for API mocking.
- **Vitest**: A Vite-native test framework.
- **Tailwind CSS**: Utility-first CSS framework.
- **Storybook**: UI component explorer.

## SDK: (@tma.js/skd)[https://www.npmjs.com/package/@tma.js/sdk]

For interacting with the Telegram Web App, there are two SDK options available:

1. **Official SDK**: Provided by Telegram and available at [Telegram Web Apps](https://core.telegram.org/bots/webapps#initializing-mini-apps). This SDK is a simple JavaScript file that can be included in your project from [telegram-web-app.js](https://telegram.org/js/telegram-web-app.js).

2. **Community-Driven SDK**: An alternative, community-driven SDK is available at [Telegram-Mini-Apps/tma.js](https://github.com/Telegram-Mini-Apps/tma.js). This SDK addresses several issues with the official SDK, such as unproductive package format, lack of public review, use of vanilla JavaScript, potential security issues, mixed code quality, and more. It is written in TypeScript and provides modern development conveniences.

### Motivation for Choosing the Community-Driven SDK

The community-driven SDK, `@tma.js`, offers several advantages over the official Telegram SDK, making it a preferred choice for this project. The `@tma.js` SDK addresses various shortcomings of the official SDK:

- **Modern Package Formats**: Available in CommonJS (CJS), ECMAScript Modules (ESM), and IIFE formats.
- **Public Review and Contributions**: Hosted on GitHub, allowing developers to track changes and contribute.
- **TypeScript Support**: Written in TypeScript for better type definitions and development experience.
- **Security Enhancements**: Does not disable security mechanisms by default.
- **Consistent Code Quality**: Follows well-established coding standards and includes comprehensive documentation.
- **Optimized Bundle Size**: Built using Vite, ensuring a production-ready, minified bundle.
- **Component State Management**: Ensures consistent component states across application reloads.
- **Configurable Features**: Allows developers to configure CSS variables and log behaviors.
- **Asynchronous Initialization**: Provides control over the initialization process.

For more details on the motivation behind `@tma.js`, please refer to the [motivation document](https://github.com/Telegram-Mini-Apps/tma.js#motivation).

## Contributing

At this moment, we are not accepting external contributions. For feedback or to report issues, please contact us at [contact@chatpay.app](mailto:contact@chatpay.app) or open an issue on GitHub.

## License

This project is licensed under the Business Source License 1.1. For full terms, please refer to the [LICENSE](./LICENSE) file.

## Contact

For any questions, please reach out to us at [contact@chatpay.app](mailto:contact@chatpay.app).

## Roadmap

- [x] Initial release
- [ ] Add key features
- [ ] Implement user authentication
- [ ] Improve UI/UX
- [ ] [Add more roadmap items here]

## FAQ

**Q: What is ChatPay?**
A: ChatPay empowers Telegram users to sell their chats (cleaned of personal data) to train AI.

**Q: How do I set up the project locally?**
A: Follow the instructions in the [Installation](#installation) section.

**Q: How can I contact you for support or feedback?**
A: You can contact us at [contact@chatpay.app](mailto:contact@chatpay.app).

**Q: What license is the project under?**
A: This project is licensed under the Business Source License 1.1.

## Resources

- [Telegram Web Apps - Official Docs](https://core.telegram.org/bots/webapps)
- [Telegram Mini Apps - Community driven](https://docs.telegram-mini-apps.com/) by https://github.com/Telegram-Mini-Apps/
- [Telegram Mini Apps - Ton Foundation](https://ton.org/mini-apps)

- Gleb Vorontsov, [Best practices on how to create a successful telegram mini app](https://www.youtube.com/live/jM3wGHMI7NM?si=WpIXOfmpH0DLdqQG),
  Streamed live on 16 Apr 2024
