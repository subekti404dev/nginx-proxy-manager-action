/**
 * Application specific interfaces
 */
export interface Config {
    npm: NPMConfig
    ssl: SSLConfig
    host: HostConfig
}

export interface NPMConfig {
    url: URL
    email: string
    password: string
}


export interface SSLConfig {
    email: string
    domain: string
}

export interface HostConfig {
    domain: string,
    schema: string,
    host: string,
    port: string,
    cache_assets: boolean,
    block_exploits: boolean,
    websocket_support: boolean,
    force_ssl: boolean,
    http2_support: boolean,
}

export interface Stack {
    id: number
    name: string
}

export interface CreateStackPayload {
    name: string
    endpoint: number
    file: string
}

export interface UpdateStackPayload {
    id: number
    endpoint: number
    file: string
    prune: boolean
}

export interface DeleteStackPayload {
    id: number
    endpoint: number
}

/**
 * Portainer specific interfaces
 */
export interface PortainerStack {
    Id: number
    Name: string
}
