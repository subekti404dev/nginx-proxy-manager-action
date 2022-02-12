import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CreateStackPayload, DeleteStackPayload, HostConfig, PortainerStack, Stack, UpdateStackPayload } from "./types";

export class NPMClient {
    token = null;
    private readonly client: AxiosInstance;

    constructor(url: URL) {
        this.client = axios.create({
            baseURL: url.toString()
        });

        this.client.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
            if (this.token) {
                config.headers['Authorization'] = `Bearer ${this.token}`;
            }

            return config;
        });
    }

    async login(email: string, password: string) {
        const { data } = await this.client.post('/api/tokens', {
            identity: email,
            secret: password
        });

        this.token = data.token;
    }

    async getCertificates() {
        const { data } = await this.client.get('/api/nginx/certificates', {
            params: {
                expand: 'owner'
            }
        });
        return data || []
    }

    async getCertificateByDomain(domain: string) {
        const certificates = await this.getCertificates();
        return certificates.find((c: any) => c.nice_name === domain);
    }

    async renewCertificate(id: number) {
        const { data } = await this.client.post(`/api/nginx/certificates/${id}/renew`);
        return data || []
    }

    async createCertificate(domain: string, email: string) {
        const { data } = await this.client.post(`/api/nginx/certificates`, {
            domain_names: [
                domain
            ],
            meta: {
                letsencrypt_email: email,
                letsencrypt_agree: true,
                dns_challenge: false
            },
            provider: "letsencrypt"
        });
        return data || []
    }

    async getHosts() {
        const { data } = await this.client.get('/api/nginx/proxy-hosts', {
            params: {
                expand: 'owner,access_list,certificate'
            }
        });
        return data || []
    }

    async getHostByDomain(domain: string) {
        const hosts = await this.getHosts();
        return hosts.find((h: any) => h.domain_names.includes(domain));
    }

    async createHost(host: HostConfig, certificate_id: number) {
        const { data } = await this.client.post(`/api/nginx/proxy-hosts`, {
            domain_names: [
                host.domain
            ],
            forward_scheme: host.schema,
            forward_host: host.host,
            forward_port: parseInt(host.port),
            caching_enabled: host.cache_assets,
            allow_websocket_upgrade: host.websocket_support,
            access_list_id: "0",
            certificate_id: certificate_id,
            ssl_forced: host.force_ssl,
            meta: {
                letsencrypt_agree: false,
                dns_challenge: false
            },
            advanced_config: "",
            locations: [],
            block_exploits: host.block_exploits,
            http2_support: host.http2_support,
            hsts_enabled: false,
            hsts_subdomains: false
        });
        return data || []
    }

    async updateHost(id: number, host: HostConfig, certificate_id: number) {
        const { data } = await this.client.put(`/api/nginx/proxy-hosts/${id}`, {
            domain_names: [
                host.domain
            ],
            forward_scheme: host.schema,
            forward_host: host.host,
            forward_port: parseInt(host.port),
            caching_enabled: host.cache_assets,
            allow_websocket_upgrade: host.websocket_support,
            access_list_id: "0",
            certificate_id: certificate_id,
            ssl_forced: host.force_ssl,
            meta: {
                letsencrypt_agree: false,
                dns_challenge: false
            },
            advanced_config: "",
            locations: [],
            block_exploits: host.block_exploits,
            http2_support: host.http2_support,
            hsts_enabled: false,
            hsts_subdomains: false
        });
        return data || []
    }
}

