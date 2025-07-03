local serverSession = {
    logVersion = 0.01,
    serverId = game.JobId,
    sessionStartTimeEpoch = os.time(), -- epoch timestamp (Server Start Time)
    sampleRate = 10,
    _logStartTime = 0,
    joinLeaveLog = {},    -- array of { userId = number, time = os.time(), action = "join"/"leave" }
    --playerAliasLog = {},  -- gives each player a alias/number for sake of data storage later --
    movementLog = {},
}


local FirstChunkSendData = {
    server_id = "ServerId",
    log_version = .01,
    session_start_time_epoch = 0,
    session_end_time_epoch = nil, -- Or dont send at all --
    sample_rate = 10,
    frame_count = 600,
    chunk_count = 1,
    log_start_time = 1346.13265251234,
    join_leave_log = {},
    join_leave_event_count = 5,
    alias_log = {},
    total_session_player_count = 3,
    movement_log = {},
}
local HTTP_VIEW1 = {
    Headers = {
        server_id = "ServerId",
        authentication_token = "123"
    },

    Body = {
        log_version = .01,
        session_start_time_epoch = 0,
        session_end_time_epoch = nil, -- Or dont send at all --
        sample_rate = 10,
        frame_count = 600,
        chunk_count = 1,
        log_start_time = 1346.13265251234,
        join_leave_log = {},
        join_leave_event_count = 5,
        alias_log = {},
        total_session_player_count = 3,
        movement_log = {},
    }
}





local MiddleChunkSendData = {
    server_id = "ServerId",
    frame_count = 1200,
    chunk_count = 2,
    join_leave_log = {}, -- ONLY NEW ITEMS => join_leave_log[join_leave_event_count+1] and above
    join_leave_event_count = 6,
    alias_log = {}, -- ONLY NEW ITEMS => alias_log[total_session_player_count+1] and above
    total_session_player_count = 4,
    movement_log = {}, -- ONLY NEW ITEMS => movement_log[chunk_count-1*chunkSize+1] and above
}

local FinalChunkSendData = {
    server_id = "ServerId",
    session_end_time_epoch = 56,
    frame_count = 1356,
    chunk_count = 3,
    join_leave_log = {}, -- ONLY NEW ITEMS => join_leave_log[join_leave_event_count+1] and above
    join_leave_event_count = 7,
    alias_log = {}, -- ONLY NEW ITEMS => alias_log[total_session_player_count+1] and above
    total_session_player_count = 5,
    movement_log = {}, -- ONLY NEW ITEMS => movement_log[chunk_count-1*chunkSize+1] and above
}