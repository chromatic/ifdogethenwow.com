# PostToDiscord Action

This If Doge Then Wow action sends a message to a predetermined Discord channel
when the associated wallet receives a transaction.

## Create a new Action

To create a new PostToDiscord action, you must POST a JSON payload to
`https://ifdogethenwow.com/api/v1/action/PostToDiscord`. The payload looks like this:

```
{
    "recipientWallet": "...",
    "contactEmail": "me@example.com",
    "actionParameters": {
        "label": "...",
        "discordUrl": "...",
        "template": [ "My wallet", "$label", "just received", "$amount", "Doge in funds!" ],
        "username": "..."
    }
}
```

Fill in the appropriate values:

- `recipientWallet` is the wallet address you want to watch. Whenever this wallet receives output from a confirmed transaction, the system will send an email. *Be careful* because if you make a typo, you'll have to file an issue and get it corrected through manual human intervention.
- `contactEmail` is an email address used to contact you if there are problems.
- `label` is a label for the wallet. This will make more sense when you see `template` in a moment.
- `recipientPostToDiscord` is a [Discord webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks). You will have to create and configure one of these. Please note that this should be unique and _secret_, so don't share it with anyone else.
- `template` is a JSON array of strings used to create the body of the message. The substitution variables `$label` and `$amount` here should appear as separate items. You've provided `$label` before in this payload. `$amount` is the number of coins received in the transaction which kicked off this action.
- `username` is an optional parameter that lets you select the name of the user with which Discord will display this message, like "Super Cool Doge Notifier" or whatever your little shibe heart desires.

That's it!

With `[curl](https://curl.se/)`, you'll send something like this:

```
curl -X POST -H 'Content-type: application/json' --data '{
    "recipientWallet": "...",
    "contactEmail": "me@example.com",
    "actionParameters": {
        "label": "...",
        "discordUrl": "...",
        "username": "...",
        "template": [ "My wallet", "$label", "just received", "$amount", "Doge in funds!" ]
    }
}' https://ifdogethenwow.com/api/v1/action/PostToDiscord
```

## Response from Action Creation

You will receive a JSON payload and an HTTP status code in response.

If your payload is good and all is well, you'll receive a success message (HTTP
code 201) and a payload containing two keys:

- `actionId` is a randomly-generated UUID representing your action and your
  action alone. You should probably save this, because if you ever want to do
  anything else (like `GET` the status of an action), this is your key to
  represent the action in the system.
- `activationWallet` is a randomly-generated Dogecoin wallet owned by If Doge
  Then Wow. Send a transaction to this wallet to activate your action.

If your payload is wrong, you'll receive an error (HTTP code 400) with the keys
`error` (what went wrong, probably "Failed to create action of type PostToDiscord") and
`message` (what went wrong with the payload).

If you _don't_ receive either of these payloads, the server probably caught on
fire and fell over, though perhaps not in that order.

## Activate Your Action

To activate an action, send some coins to the wallet you received in the
`activationWallet` part of the success payload.

20 Doge will activate this action for a month, and 200 for a year. *Because the
system is undergoing testing now*, send any amount less than this and you'll
get a couple of months of access anyhow.

## What Next?

An unactivated action will stay in a `pending` state, and the system will
ignore all transactions sent to it.

An activated action will start to process actions upon its activation. Any
transactions confirmed after that point will kick off actions. Please remember
that this is not a real-time system; transactions may take a couple of minutes
to get confirmed and kick off actions. Please also note that any problems with
your Discord webhook, including rescinding or URL typos, could interfere with
delivery.