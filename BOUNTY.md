## Polygon

We built on top of Polygon as our primary chain because it offers high security guarantees ($>4bn staked at the time of writing) with
low gas-fees.

It's crucial that our base chain is highly secure due to the nature of our product. If someone does not like the
content others have written, provided the content is legally protected, they should not find it trivial to delete it
from our platform. The harder the network is to overturn, the better we can deliver on our mission.

Given that we want users to frequently interact with our product and tip content they find valuable, we cannot use mainnet
Ethereum, despite it having higher security guarantees. It is simply not economical for a user to face tens or hundreds of dollars
in gas fees to tip amounts that are often equivalent to that price.

For this reason, Polygon provides a balance between these two necessities and gives our product a way to execute
the way we believe is optimal.


## Axelar GMP

In order to maximize the security of our users' uploaded content, we decided to use Axelar's general message passing
to back-up storage on a second chain (in this case, Arbitrum). In the unlikely event that the Polygon network shuts down or is taken over,
we would have redundancies to protect our hosted information.

We selected Arbitrum because it leverages Ethereum's security without its high gas prices.
This enables users to frequently back data up at a low cost. Although Arbitrum's sequencer is centralized, this is less of an issue
in the context of using it as a fallback.

Here is an example of an Axelar transaction generated through our app:

https://testnet.axelarscan.io/gmp/0x15358eb3d657dd16e063452fc66b048d00720972536f8969dc4e957e351a7003

When working with Axelar, I found it easy to understand the core concepts. The documentation was generally clear, and
I was able to rapidly design architectures for the project. The concept of a separate `GasService`, however, was not immediately clear;
maybe it would be helpful to label it as a second contract in the [overview diagram](https://docs.axelar.dev/dev/gmp-overview).

## Web3Auth

To provide a user-friendly interface to users new to crypto, we decided to implement Web3Auth's signing in our product.
The integration provides a number of UX-benefits, including frictionless sign-in and integration, to minimize pain on
the user's end. The more usable our product, the more useful it is overall.

## Infura

I use Infura and Truffle to develop and deploy our contracts on Polygon/Arbitrum. Having used Truffle for our entire
process (development, testing, and deploying), I found that the suite was cohesive and unproblematic. 
Truffle provides end-to-end infrastructure, and I was able to write unit tests, develop and deploy, then query live addresses
from the CLI.

The test infrastructure for Solidity tests, however, have some room for improvement. Specifically, it is not currently possible to 
test for coverage. This is important enough that people probably should not consider writing tests in Solidity
until this is supported.
