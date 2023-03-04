# FreePub

We are building a decentralized successor to WikiLeaks to promote truth and transparency. Our product supports anonymous or known publishing with tips.

Site of [FreePub](https://freepub.io)

The contributors are:
- Johnny Hung @masterfung
- Austin Chandra @austinchandra
- Peter Cserti @Exh0dus
- Noral

We are submitting this project to the EthDenver 2023 Hackathon. The category this project sits on 

## Installation

1. Clone the repo down and make sure you have Node, Git, IDE, and Github account.
2. Change into the folder and run `yarn install`
3. There are a few vendors we are using and necessary for this app to run. Please reference [Partner's Section](#partners-section)
4. Once all things are installed, run `yarn run dev` to start
5. Head to `localhost:3000` to see the page.

## Partner's Section

The partners we used for this project includes:

- Polygon: We deployed to the Testnet on Polygon and Mainnet
- Axelar: We are leveraging the Axelar's GMP to interact with our contracts deployed to Polygon and Arbitrum.
- Web3Auth: We are using Web SDK for our FreePub login
- Aragon: DAO support for our moderation, reputation, and governance workstream
- Arbitrum: Another L2 we are deploying to and managed by Axelar's GMP protocol. The use of another L2 is to add stability and decentralization to our product
- IPFS: We are leveraging IPFS nodes (from Infura) to push content upward from anon and known user contribution

## Workstream

