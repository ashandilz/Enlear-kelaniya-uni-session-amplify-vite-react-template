import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { noteSummarizer } from "../functions/noteSummarizer/resource";

const schema = a.schema({
  Note: a
    .model({
      title:    a.string().required(),
      body:     a.string(),
      imageKey: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  summarizeNote: a
    .query()
    .arguments({
      title: a.string().required(),
      body:  a.string(),
    })
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(noteSummarizer)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
