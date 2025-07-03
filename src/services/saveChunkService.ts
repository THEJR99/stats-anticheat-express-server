import { NewChunkBodySchemaType, NextChunkBodySchemaType } from '../lib/schemas'
import * as SaveChunkRepo from '../repositories/saveChunkRepository'


export async function saveNewReplayChunk(data: NewChunkBodySchemaType): Promise<Boolean> {
    return await SaveChunkRepo.saveNewReplayChunk(data);
}

export async function saveNextReplayChunk(data: NextChunkBodySchemaType): Promise<Boolean> {
    return await SaveChunkRepo.saveNextReplayChunk(data);
}
