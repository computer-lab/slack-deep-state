# slack-deep-state

> Banned from the App Store™  
> O K  
> I never much liked playing there  
> Anyway  
> They said they only wanted well behaved apps  
> Do they think apps are just fucking toys?  

*Crass*

## Setup

```bash
npm install -g slack-deep-state
export SLACK_API_TOKEN=...
export SLACK_BOT_TOKEN=...
export SLACK_VERIFICATION_TOKEN=...
slack-deep-state
```

## Usage

Deleted messages from all users will be automatically reposted. If you are an
Admin or Owner you can use the following slash commands:

```
/ban    [user]
/unban  [user]
```

**/ban**    will censor ALL of a users messages, not just deleted ones  
**/unban**  will lift the ban - the users messages will be uncensored  
