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
