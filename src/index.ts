// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import express, { Response } from 'express'

import { Request, CloudAdapter } from 'botbuilder'
import { commandBot } from './bot'

//const adapter = new CloudAdapter()

const app = express()
app.use(express.json())

app.use(express.static('public'))

app.post('/api/messages', async (req: Request, res: Response) => {
  console.log(req.body)
  //await adapter.process(req, res, async (context) => await myBot.run(context))
  commandBot.requestHandler(req, res).catch((err) => {
    console.error('An error occurred in the bot request handler', err)
  })
})

const port = process.env.PORT || 3978
app.listen(port, () => {
  console.log(`\nServer listening to port ${port} for appId`)
})
