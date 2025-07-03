import { Request, Response } from 'express';
import * as ServerSessions from '../lib/activeServers'
import * as SaveChunkService from '../services/saveChunkService'
import { AuthenticateRequestWithToken as Authenticate } from '../lib/authenticator' 
import { z } from 'zod';

import { NewChunkBodySchema, NextChunkBodySchema, UploadRequestHeaderSchema } from '../lib/schemas'


async function handleNewServerChunkSave(req: Request, res: Response): Promise<void> {
    const validBodyParseResults = NewChunkBodySchema.safeParse(req.body)
    if (!validBodyParseResults.success) { res.status(400).send('Invalid body! Error code:\n' + validBodyParseResults.error.toString()); return; }

    const serverId: string = validBodyParseResults.data.server_id as string;
    const isAciveSession: boolean = ServerSessions.IsServerActive(serverId);
    if (isAciveSession) { res.status(400).send(`Server Id ${serverId} is an active session!`); return; }

    const querySuccess: Boolean = await SaveChunkService.saveNewReplayChunk(validBodyParseResults.data)
    if (!querySuccess) { res.status(400).send('Database query failed!'); return; }

    res.status(200).send("Data saved sucessfully!")
}

async function handleActiveServerChunkSave(req: Request, res: Response): Promise<void> {
    const validBodyParseResults = NextChunkBodySchema.safeParse(req.body)
    if (!validBodyParseResults.success) { res.status(400).send('Invalid body! Error code:\n' + validBodyParseResults.error.toString()); return; }

    const serverId: string = validBodyParseResults.data.server_id as string;
    const isAciveSession: boolean = ServerSessions.IsServerActive(serverId);
    if (!isAciveSession) { res.status(400).send(`Server Id ${serverId} is NOT an active session!`); return; }

    const querySuccess: Boolean = await SaveChunkService.saveNextReplayChunk(validBodyParseResults.data)
    if (!querySuccess) { res.status(400).send('Database query failed!'); return; }

    res.status(200).send("Data saved sucessfully!")
}



function handleMethodPOST(req: Request, res: Response): void {
    const validHeaderParseResults = UploadRequestHeaderSchema.safeParse(req.headers)
    if (!validHeaderParseResults.success) { res.status(400).send('Invalid headers! Error code:\n' + validHeaderParseResults.error.toString()); return; }

    const token: string = validHeaderParseResults.data.authentication_token
    if (!token || !Authenticate(token) ) { res.status(403).send('Invalid auth token!'); return; }



    const request: string = validHeaderParseResults.data.request_type

    switch (request) {
        case "CREATE":
            handleNewServerChunkSave(req, res);
            break;

        case "UPDATE":
            handleActiveServerChunkSave(req, res);
            break;

        case "END":
            break;

        default:
            res.status(400).send('Invalid request!');
            return;
    }
    console.log("Request fulfilled!");
}

export function uploadMethods(req: Request, res: Response) {

    switch (req.method) {
        case 'POST':
            handleMethodPOST(req, res);
            //res.status(200).send('POST is supported!');
            break;

        case 'GET':
            res.status(404).send('GET not yet implemented.');
            break;

        default:
            res.status(404).send('Unsupported method!');
            break;
    }


    

}