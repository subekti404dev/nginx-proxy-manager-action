import * as core from '@actions/core';
import {Config, HostConfig, NPMConfig, SSLConfig} from "./types";

function parseNPMConfig(): NPMConfig {
    return {
        url: new URL(core.getInput('npm-url', {required: true})),
        email: core.getInput('npm-email', {required: true}),
        password: core.getInput('npm-password', {required: true}),
    };
}

function parseSSLConfig(): SSLConfig {
    return {
        domain: core.getInput('domain-name', {required: true}),
        email: core.getInput('npm-email', {required: true}),
    };
}

function parseHostConfig(): HostConfig {
    return {
        domain: core.getInput('domain-name', {required: true}),
        schema: core.getInput('forward-scheme', {required: true}),
        host: core.getInput('forward-host', {required: true}),
        port: core.getInput('forward-port', {required: true}),
        cache_assets: core.getBooleanInput('cache-assets', {required: false}),
        block_exploits: core.getBooleanInput('block-exploits', {required: false}),
        websocket_support: core.getBooleanInput('websocket-support', {required: false}),
        force_ssl: core.getBooleanInput('force-ssl', {required: false}),
        http2_support: core.getBooleanInput('http2-support', {required: false}),
    };
}

export function parse(): Config {
    return {
        npm: parseNPMConfig(),
        ssl: parseSSLConfig(),
        host: parseHostConfig(),
    };
}
