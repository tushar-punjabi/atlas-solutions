import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN!,
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
  appToken: process.env.SLACK_APP_TOKEN!,
  socketMode: true,
});

const CH = {
  eng: process.env.SLACK_CH_ENG ?? "ai-eng",
  review: process.env.SLACK_CH_REVIEW ?? "ai-review",
  incidents: process.env.SLACK_CH_INCIDENTS ?? "ai-incidents",
};

const TASK_TEMPLATE = `*Task spec* - fill every field before asking AI for code.

*Goal:*
*Constraints:*
*Interfaces:*
*Non-goals:*
*Test plan:*
*Rollback:*
*Risk:*`;

const REVIEW_CHECKLIST = `*Review checklist* - run top-to-bottom, no skipping.

1. *Correctness* - does it do what the spec says?
2. *Security* - authz, input validation, secrets, injection
3. *Concurrency* - races, retries, idempotency
4. *Errors* - status codes, user-facing messages, logs
5. *Tests* - new behavior covered? edge cases?
6. *Observability* - logs, metrics, trace IDs
7. *Perf* - N+1, indexes, payload size
8. *Simplicity* - could this be smaller?`;

const ADR_TEMPLATE = (title: string) => `# ADR: ${title}

## Status
Proposed

## Context
What problem are we solving? What constraints apply?

## Decision
What did we decide?

## Consequences
What becomes easier? What becomes harder?

## Alternatives considered
What else did we evaluate and why reject it?`;

const POSTMORTEM_TEMPLATE = (title: string) => `# Postmortem: ${title}

## Summary
One paragraph, plain language.

## Impact
Who was affected? How long? What broke?

## Timeline
All times UTC.

## Root cause
The actual mechanism, not "human error".

## Detection
How did we find out? How long did it take?

## Response
What did we do? What went well? What went badly?

## Action items
- [ ] Owner - action - due date

## Lessons
What changes in our systems or process?`;

app.command("/plan", async ({ ack, respond }) => {
  await ack();
  await respond({ response_type: "in_channel", text: TASK_TEMPLATE });
});

app.command("/review", async ({ ack, respond }) => {
  await ack();
  await respond({ response_type: "in_channel", text: REVIEW_CHECKLIST });
});

app.command("/adr", async ({ ack, command, respond }) => {
  await ack();
  const title = command.text.trim() || "Untitled";
  await respond({ response_type: "in_channel", text: ADR_TEMPLATE(title) });
});

app.command("/postmortem", async ({ ack, command, respond }) => {
  await ack();
  const title = command.text.trim() || "Untitled incident";
  await respond({ response_type: "in_channel", text: POSTMORTEM_TEMPLATE(title) });
});

app.command("/diff", async ({ ack, command, respond, client }) => {
  await ack();
  const task = command.text.trim();
  if (!task) {
    await respond({ response_type: "ephemeral", text: "Usage: /diff <task description>" });
    return;
  }
  await respond({
    response_type: "in_channel",
    text: `:robot_face: queued: \`${task}\` (agent not wired yet - Day 4)`,
  });
  await client.chat.postMessage({
    channel: CH.eng,
    text: `:inbox_tray: New AI task: *${task}*`,
  });
});

app.event("app_mention", async ({ event, say }) => {
  await say(`:wave: <@${(event as any).user}> - try \`/plan\`, \`/review\`, \`/adr\`, \`/postmortem\`, or \`/diff\`.`);
});

(async () => {
  await app.start();
  console.log("atlas-bot up (socket mode)");
})();
