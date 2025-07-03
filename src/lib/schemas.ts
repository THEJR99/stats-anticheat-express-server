// src/lib/schemas.ts
import { z } from 'zod';

export const UploadRequestHeaderSchema = z.object({
  request_type: z.string(),
  authentication_token: z.string(),
});
export type UploadRequestHeaderSchema = z.infer<typeof UploadRequestHeaderSchema>;

export const NewChunkBodySchema = z.object({
  server_id: z.string(),
  log_version: z.number(),
  session_start_time_epoch: z.number(),
  sample_rate: z.number(),
  frame_count: z.number(),
  chunk_count: z.number(),
  log_start_time: z.number(),
  join_leave_log: z.array(z.object({
    alias: z.number(),
    time: z.number(),
    action: z.string()
  })),
  join_leave_event_count: z.number(),
  alias_log: z.array(
    z.record(z.string(), z.string()).refine(obj => Object.keys(obj).length === 1, {
      message: "Each alias_log entry must contain exactly one key-value pair"
  })),
  total_session_player_count: z.number(),
  movement_log: z.string(), // serialized JSON string
});
export type NewChunkBodySchemaType = z.infer<typeof NewChunkBodySchema>;

export const NextChunkBodySchema = z.object({
  server_id: z.string(),
  frame_count: z.number(),
  chunk_count: z.number(),
  join_leave_log: z.array(z.object({
    alias: z.number(),
    time: z.number(),
    action: z.string()
  })),
  join_leave_event_count: z.number(),
  alias_log: z.array(
    z.record(z.string(), z.string()).refine(obj => Object.keys(obj).length === 1, {
      message: "Each alias_log entry must contain exactly one key-value pair"
  })),
  total_session_player_count: z.number(),
  movement_log: z.string(), // serialized JSON string
});
export type NextChunkBodySchemaType = z.infer<typeof NextChunkBodySchema>