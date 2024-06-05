# Secure Ticketing: an ISE CS4455 Blockchain DApp - Tamara Orosz
This is a Web3 DApp that implements a simple ticketing system using the Ethereum Sepolia Testnet as the blockchain for Solidity smart contract deployments, and Vue.js for the front end.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Project](#running-the-project)
    - [Running the Tests](#running-the-tests)
- [Project Structure](#project-structure)
- [Colours used](#colours-used)

## Features

- Home page with a call to action to buy a ticket to the event.
- A page allowing a user to create a wallet.
- A page allowing the different actors in the event to view wallets:
    - Attendees can view their wallet and ticket balances.
    - Ushers can view an attendee's tickets, and admit them once they verify their identity.
    - Venue can view ticket supply, sold and unsold tickets.
- A page allowing a user to purchase a ticket for the event.
- A page allowing a user to transfer a ticket back to the vendor.
- Backend consisting of a smart contract implementing an ERC-20 standard and the Ethereum Sepolia Testnet blockchain.

## Getting Started

The following instructions will help you set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en/download/package-manager "Download Node.js")
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [yarn](https://yarnpkg.com/getting-started/install "See how to install Yarn")

### Installation

Clone the repository:
```bash
git clone https://github.com/ButterflyLion/ISE-CS4455-TamaraOrosz-DApp.git
```
Navigate to the project repository:
```bash
cd ISE-CS4455-TamaraOrosz-DApp
```
Install dependencies with your chosen package manager:
```bash
# Using npm
npm install
# Using yarn
yarn install
```

### Running the Project

Start the development server with your chosen package manager:
```bash
# Using npm
npm run dev
# Using yarn
yarn serve
```

This will start the development server and the application will be available at `http://localhost:5173/`.

### Running the Tests

To run the tests, simply run:
```bash
# Using npm
npm test
# Using yarn
yarn test
```

## Project Structure

```
ISE-CS4455-TamaraOrosz-DApp/
├── contract/               # Smart contract and ABI
├── src/                    # Source files
│   ├── assets/             # Project images, styles, and logo
│   ├── components/         # Vue components
│   ├── router/             # Vue router setup
│   ├── stores/             # Vuex store setup
│   ├── views/              # View components
│   ├── App.vue             # Main App component
│   ├── main.ts             # Entry file
├── tests/                  # Test files
├── .eslintrc.cjs           # Rules and settings for ESLint
├── .gitignore              # Files to be ignored by git
├── .prettierrc.json        # Configures Prettier
├── env.d.ts                # Defines environment variables
├── index.html              # Entry point for app in browser
├── package.json            # Project metadata and dependencies
├── README.md               # This file
├── tsconfig.app.json       # TypeScript configuration file
├── tsconfig.json           # TypeScript configuration file
├── tsconfig.node.json      # TypeScript configuration file
├── tsconfig.vitest.json    # TypeScript configuration file
├── vite.config.ts          # Configures Vite
└── vitest.config.ts        # Configures Vitest
```

## Colours used
- Background: #CCEBFF
- Icon: #FE15C6
- Text: #01328A
