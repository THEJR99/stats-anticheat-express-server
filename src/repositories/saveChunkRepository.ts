import { NewChunkBodySchemaType, NextChunkBodySchemaType } from '../lib/schemas'
import { server } from 'typescript';
import pool from '../lib/db'
import { QueryResult } from 'pg';
import format from 'pg-format'
import { boolean } from 'zod';

export async function saveNewReplayChunk(data: NewChunkBodySchemaType): Promise<Boolean> {
    const client = await pool.connect();

    try {
        const serverLogQueryData = [[
            data.server_id,
            data.log_version,
            data.session_start_time_epoch,
            data.sample_rate,
            data.frame_count,
            data.chunk_count,
            data.log_start_time,
            data.join_leave_event_count,
            data.total_session_player_count
        ]]

        const aliasLogQueryData = data.alias_log.map((entry) => {
            const [userId, alias] = Object.entries(entry)[0]
            return [ data.server_id, alias, userId ]
        });

        const joinLeaveLogQueryData = data.join_leave_log.map((entry, i) => [
            data.server_id,
            i,
            entry.alias,
            entry.time,
            entry.action
        ]);



        const serverLogQuery = format(`
            INSERT INTO server_log (
                server_id,
                log_version,
                session_start_time_epoch,
                sample_rate,
                frame_count,
                chunk_count,
                log_start_time,
                join_leave_event_count,
                total_session_player_count
            )
            VALUES %L`, serverLogQueryData
        );

        const aliasLogQuery = format(`
            INSERT INTO alias_log (server_id, alias, user_id)
            VALUES %L`, aliasLogQueryData
        );

        const joinLeaveLogQuery = format(`
            INSERT INTO join_leave_log (server_id, event_index, alias, time, action)
            VALUES %L`, joinLeaveLogQueryData
        );

        await client.query('BEGIN');

        

        await client.query(serverLogQuery);

        await client.query(aliasLogQuery);

        await client.query(joinLeaveLogQuery);

        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK')

        console.error("New chunk save query failed!\n", err)
        return false;
    }
    
    
}


export async function saveNextReplayChunk(data: NextChunkBodySchemaType): Promise<Boolean> {
    const client = await pool.connect();

    try {
        const serverLogQueryData = [
            data.server_id,
            data.frame_count,
            data.chunk_count,
            data.join_leave_event_count,
            data.total_session_player_count
        ]

        const aliasLogQueryData = data.alias_log.map((entry) => {
            const [userId, alias] = Object.entries(entry)[0]
            return [ data.server_id, alias, userId ]
        });

        const joinLeaveEventCount = data.join_leave_event_count
        const joinLeaveNewEvents = data.join_leave_log.length
        const newLogStartIndex = joinLeaveEventCount - joinLeaveNewEvents

        const joinLeaveLogQueryData = data.join_leave_log.map((entry, i) => [
            data.server_id,
            newLogStartIndex + i,
            entry.alias,
            entry.time,
            entry.action
        ]);
        
        const serverLogQuery = `
            INSERT INTO server_log (
                server_id,
                log_version,
                session_start_time_epoch,
                sample_rate,
                frame_count,
                chunk_count,
                log_start_time,
                join_leave_event_count,
                total_session_player_count
            )
            VALUES ($1, $2, $3, $4, $5)
            `

        const aliasLogQuery = format(`
            INSERT INTO alias_log (server_id, alias, user_id)
            VALUES %L`, aliasLogQueryData
        );

        const joinLeaveLogQuery = format(`
            INSERT INTO join_leave_log (server_id, event_index, alias, time, action)
            VALUES %L`, joinLeaveLogQueryData
        );

        await client.query('BEGIN');

        
        await client.query(serverLogQuery, serverLogQueryData);

        await client.query(aliasLogQuery);

        await client.query(joinLeaveLogQuery);


        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK')

        console.error("New chunk save query failed!\n", err)
        return false;
    }
    
    
}