// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { BotBuilderCloudAdapter } from "@microsoft/teamsfx";
import { UserQueryHandler } from "./userQueryHandler";
import ConversationBot = BotBuilderCloudAdapter.ConversationBot;


export const commandBot = new ConversationBot({
  // The bot id and password to create CloudAdapter.
  // See https://aka.ms/about-bot-adapter to learn more about adapters.
  adapterConfig: {
    MicrosoftAppId: process.env.clientId,
    MicrosoftAppPassword: process.env.clientSecret,
    MicrosoftAppType: "MultiTenant",
  },

  // See https://docs.microsoft.com/microsoftteams/platform/toolkit/teamsfx-sdk to learn more about ssoConfig
  ssoConfig: {
    aad: {
      scopes: ["User.Read", "Calendars.Read", "Tasks.Read"],
      initiateLoginEndpoint: `https://config.botDomain/auth-start.html`,
      authorityHost: 'https://login.microsoftonline.com',
      clientId: process.env.clientId,
      tenantId: process.env.tenantId,
      clientSecret: process.env.clientSecret,
    },
  },
  command: {
    enabled: true,
    commands: [],
    ssoCommands: [new UserQueryHandler()],
  }
});

// export class EchoBot extends ActivityHandler {
//   constructor () {
//     super()
//     this.onMessage(async (context, next) => {
//       const replyText = `Echo: ${context.activity.text}`
//       await context.sendActivity(MessageFactory.text(replyText, replyText))
//       await next()
//     })

//     this.onMembersAdded(async (context, next) => {
//       const membersAdded = context.activity.membersAdded ?? []
//       const welcomeText = 'Hello and welcome!'
//       for (const member of membersAdded) {
//         if (member.id !== (context.activity.recipient?.id ?? '')) {
//           await context.sendActivity(MessageFactory.text(welcomeText, welcomeText))
//         }
//       }
//       // By calling next() you ensure that the next BotHandler is run.
//       await next()
//     })
//   }
// }
