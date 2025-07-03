const activeServers = new Set<string>();

export function IsServerActive(serverId: string): boolean {
    return activeServers.has(serverId);
}

export function SetServerActive(serverId: string): void {
    activeServers.add(serverId);
}

export function SetServerInactive(serverId: string): void {
    activeServers.delete(serverId);
}