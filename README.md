# recurring crypto payments

RecurCrypt
This is an application that allows vendors or users to accept recurring cryptocurrency payments from ERC20 tokens from stablecoins such as USDC and USDT.
This allows users to have a subscription-based model similar to stripe
Stack includes: MERN + Typescript + Solidity (Smart Contract) + AWS Lambda (cron job)

This is the overall flow of the integrations required:
1. Business signs up for an account at ReucrCrypt
2. Business completes the relevant integrations on their application (e.g. creation of ReurCrypt users, setting up webhooks, setting up a frontend that redirects users to the payments page, etc)

This is the overall flow of the clients on the businesses' web application:
1. The client is on the business web application and clicks on, for example, a "Manage Subscription" button
2. The client is redirected to a payments page which is hosted by RecurCrypt
3. The client initiates their subscription by:
   - Connecting their wallet
   - Ensuring that they have sufficient balance
   - Approving allowance for the smart contract for the token which will be used to pay
   - Fill in relevant details and click the confirm subscription button
5. Upon confirming their subscription, the tokens will be deducted from the client's wallet and transferred to the businesses' Smart Contract
6. RecurCrypt's database will add another pending payment which will be due next month
7. A webhook will be sent to the business's server (if integrated correctly) to inform the business that the user has begun their subscription. It is the responsibility of the business to handle the webhooks accordingly.
8. In the background, a CRON job (using AWS Lambda + EventBridge) is always running every few minutes to check for any payments that are due.
9. [Work In Progress] Slightly before the payment is due (e.g. a few days before), the CRON job will check whether the relevant wallets have sufficient balance and allowance. A reminder will be sent to the client through e-mail if they have insufficient balance or allowance.
10. When it is time for the next payment, the CRON job will automatically deduct the tokens from the client and transfer them to the business's Smart Contract, assuming sufficient balance and allowance. A webhook will be sent the the business sever to inform them that payments have been received.
11. However, if there is insufficient balance or allowance, the payment will fail and the subscription will be terminated. A webhook will also be sent to the businesses's server. 

# client

- cd client
- npm start
- if running prod: npm run start:prod

# server

- cd server
- npm run dev

# contracts

cd client

- in 1 terminal: ganache-cli
- in another terminal: truffle migrate --reset
- or to test contracts: truffle test

# .env in server:

- .env.dev

```Javascript
DB_URL=mongodb://127.0.0.1:27017/recurring-crypto-payments
JWT_KEY=YOUR_OWN_KEY_HERE
WEB3_PROVIDER=WEB3_PROVIDER_URL_EXAMPLE_INFURA_GOERLI
OWNER_WALLET_ADDRESS=WALLET_ADDRESS_OF_OWNER_OF_MAIN_VENDOR_CONTRACT
OWNER_PRIVATE_KEY=PRIVATE_KEY_OF_OWNER
CRON_API_KEY=RECUR_CRYPT_CRON_API_KEY_HERE
FRONT_END_URL=http://localhost:3031
MAILER_EMAIL=YOUR_MAILER_EMAIL
MAILER_PASSWORD=YOUR_MAILER_PASSWORD
MAILER_APP_PASSWORD=YOUR_MAILER_APP_PASSWORD
PORT=3030
ENV=DEV
```

- .env.prod

```Javascript
DB_URL=DB_URL_INSTRUCTIONS_IN_DOCUMENTATION
JWT_KEY=YOUR_OWN_KEY_HERE
WEB3_PROVIDER=WEB3_PROVIDER_URL_EXAMPLE_INFURA_GOERLI
OWNER_WALLET_ADDRESS=WALLET_ADDRESS_OF_OWNER_OF_MAIN_VENDOR_CONTRACT
OWNER_PRIVATE_KEY=PRIVATE_KEY_OF_OWNER
CRON_API_KEY=RECUR_CRYPT_CRON_API_KEY_HERE
FRONT_END_URL=DEPLOYED_FRONTEND_URL
MAILER_EMAIL=YOUR_MAILER_EMAIL
MAILER_PASSWORD=YOUR_MAILER_PASSWORD
MAILER_APP_PASSWORD=YOUR_MAILER_APP_PASSWORD
PORT=3030
ENV=PROD
```

# .env in client:

- .env.dev

```Javascript
REACT_APP_ENV=DEV
REACT_APP_API_URL=http://localhost:3030
```

- .env.prod

```Javascript
REACT_APP_ENV=PROD
REACT_APP_API_URL=URL_OF_DEPLOYED_SERVER
```

# deployed smart contracts:

- Master (0x92971a37d9ea86ad18591A0f86A90E273439F19e): https://goerli.etherscan.io/address/0x92971a37d9ea86ad18591a0f86a90e273439f19e#code
- VendorContract (0xEf8dfbCa537FEF7B71d0F37b404E8fc770Ac807E): https://goerli.etherscan.io/address/0xEf8dfbCa537FEF7B71d0F37b404E8fc770Ac807E#code
- FakeUSDT (0xC2CA4DFa527902c440d71F162403A3BB93045a24): https://goerli.etherscan.io/address/0xc2ca4dfa527902c440d71f162403a3bb93045a24#code
