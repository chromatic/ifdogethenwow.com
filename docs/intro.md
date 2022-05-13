# Introduction

If Doge Then Wow is an event-based action system, where a transaction made to a
specific Dogecoin wallet can trigger a registered action to:

- send an email to a pre-configured address
- post a message to a Slack or Discord channel
- send a public tweet on Twitter
- POST to a specified webhook elsewhere
- ... and more

## Basics

If Doge Then Wow is *not* a wallet and does not hold funds for you.

It is a service that lets you create and activate actions that do what you
want. It monitors the public blockchain for confirmed transactions and performs
your actions when the wallets you want to monitor receive funds. Whatever
happens next is up to you.

## Actions

If Doge Then Wow supports four types of actions right now:

- `[Email](email_action.md)`: send an email to a specified address, with a given subject line and a configurable body
- `Tweet`: send a tweet from the [@ifdogethenwow](https://twitter.com/ifdogethenwow) account
- `PostToDiscord`: send a message to a specified Discord channel
- `PostToSlack`: send a message to a specified Slack channel

An experimental `TwitterDirectMessage` action may come soon, and a general
`PostToWebhook` action will definitely appear. Watch this space.

## Workflow

To create an action, you must `POST` to the
[`ifdogethenwow.com/api/v1/action`](https://ifdogethenwow.com/api/v1/action/)
endpoint with the appropriate JSON payload for your action.

If this succeeds, you will receive a JSON payload in response with a 201 HTTP
response code. This payload will include:

- the UUID of your action, which you can (eventually) use to see the status of
  the action
- a Dogecoin wallet address, to which you can send funds to activate your
  action (this covers server costs and reduces spam)

A newly created action will be in the `pending` status. Send funds to the
specified wallet to transition it to an `active` status.

## Caveats

Email delivery may be spotty.

There are likely to be bugs.

If you go off the beaten path and try other URLs, you will find disappointment.

Because this system relies on on-chain confirmation, there may be a couple of
minutes between a transaction's confirmation in a block and the notification
going out. This is *not* intended to be a real time system. Nor does it handle
unconfirmed transactions at this point.

The system may go down for maintenance, upgrades, or changes.

If you break it, please file a bug.

### Pricing

This is fuzzy and subject to change based on user feedback. The pricing idea so
far is 20 Doge for one month of notifications or 200 Doge for one year. These
numbers scale linearly based on a complex math formula including dividing by
the number of days in a year.

For free software, open source, or community projects, contact `community at
ifdogethenwow dot com` for details.

While this service is in open testing, contact the same address for testing
accounts, or throw a few Doge at the addresses provided (but don't go
over the prices recommended).

## What's it Built In Anyhow?

This site uses [Perl](http://modernperlbooks.com/books/modern_perl/) with the
[Mojolicious](https://www.mojolicious.org/) web framework and lots of goodness
from [CPAN](https://metacpan.org/).

This site is also powered by the [Dogecoin
Core](https://github.com/dogecoin/dogecoin) and the
[PostgreSQL](https://postgresql.org/) database.

Other important technologies include [Sqitch](https://sqitch.org/) and
[TAP](https://testanything.org/).
