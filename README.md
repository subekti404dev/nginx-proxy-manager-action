# Nginx Proxy Manager Action

Github Action for creating/updating nginx proxy manager using the portainer API
## Usage

Simply include the following lines to your workflow:

```yaml
jobs:
  name: Example
  runs-on: ubuntu-latest
  steps:
    - name: Clone Repository
-     uses: actions/checkout@v2
    - name: Deploy Stack
      uses: subekti404dev/nginx-proxy-manager-action@v1
      with:
        npm-url: https://nginx.example.com
        npm-email: admin
        npm-password: password
        domain-name: urip.ganteng.com
        forward-scheme: http
        forward-host: 192.168.1.1
        forward-port: 80
        cache-assets: true
        block-exploits: true
        websocket-support: true
        force-ssl: true
        http2-support: true

```

## Inputs

The following inputs are available:

| Name                 | Type   | Required | Description                                                                                   |
|----------------------|--------|----------|-----------------------------------------------------------------------------------------------|
| `npm-url`            | URL    | Yes      | URL to your Nginx Proxy Manager instance including the protocol.                                        |
| `npm-email`          | String | Yes      | Username for authenticating requests against the Nginx Proxy Manager API.                               |
| `npm-password` | String | Yes      | Password for authenticating requests against the Nginx Proxy Manager API.                               |                                                                |
| `domain-name`               | String | Yes      | Domain for your app stack.                                                                           |
| `forward-scheme`               | String | No      | Schema.                                  |
| `forward-host`          | String | Yes       | Host/IP Address of your app |
| `forward-port`             | String | Yes       | Port of your app.                               |
