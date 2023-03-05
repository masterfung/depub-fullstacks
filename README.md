# FreePub

We are building a decentralized successor to WikiLeaks to promote truth and transparency. Our product supports anonymous or known publishing with tips.

Site of [FreePub](https://www.freepub.io)

[FreePub Contracts](https://github.com/austinchandra/freepub-contracts)

The contributors are:
- Johnny Hung @masterfung
- Austin Chandra @austinchandra
- Peter Cserti @Exh0dus
- Noral Benmelha (Product Manager)

We are submitting this project to the EthDenver 2023 Hackathon. The category this project sits on #BUIDLathon 2023 Impact + Public Goods Track.

[Guide to Usage](https://loving-elderberry-8fc.notion.site/FreePub-055847bfad2b4ad3b1fb36e72fa2a0d3)

## Overview

We created this project to enable anyone to publish their ideas and concerns without any barriers or censorship. The most important aspect of this project is its decentralization, which ensures that no centralized authority can restrict or control what is published.

When we started this project, we had many different ideas about how to tackle the issue of censorship on existing platforms. We engaged in several deep discussions to develop a solution that would allow regular citizens and whistleblowers to voice their opinions without fear of being censored. The result is FreePub, a software service that aims to make it easy for people to publish their work and share their ideas.

FreePub offers two ways to contribute. The first is a known process, which requires the publisher or creator to reveal their identity. This can be done using a wallet address or by linking their existing social media accounts. For example, a user can import their Twitter profile to help readers understand who the author is and lend credibility to their work. This also allows fans and readers to tip creators for their good work.

The second contribution process is anonymous, which is perfect for whistleblowers who need to protect their identity. This process allows users to post anonymously without worrying about paying for gas fees. The way we achieved this is by allowing anonymous users to submit their work normally. The content then enters the "UnFunded" status, allowing readers and users to fund it. This allows the community to vet the work and reduce spam while ensuring that the content publication is free for anonymous users.

We leverage various technologies to make this possible, and we encourage readers to check out the stack for more insights. We also want to establish an economy within FreePub, where content can be tipped regardless of whether it is anonymous or authored. Tipping for known works will go directly to the creator, while any tips given to anonymous works will go to the DAO. The DAO will be responsible for running the public good infrastructure, moderating content, electing new bylaws, and more.

Looking into the future, we have great ambitions to continue working on this project. We have already scoped out tasks to engage with post-hackathon and plan to make these publicly available. Our goal is to create a user-friendly, secure, and scalable platform that can be used for public good. We plan to iterate on the project further before opening it up for user testing to gather insights and harden the application.

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

## Tech Stack

The tech stack involves running NextJS with React on the frontend and backend. The database used was MongoDB interacting with IPFS via Infura. We deployed to Polygon Mumbai, Axelar, and Artbitrum. We are leveraging OpenAI/ChatGPT to do initial spam control.
