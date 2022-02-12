import * as core from '@actions/core';
import * as config from './config';
import { NPMClient } from './npm';

async function run() {
    try {
        const cfg = config.parse();
        core.debug(`Config parsed: ${JSON.stringify(cfg)}`);

        core.startGroup('Authentication');
        const npm = new NPMClient(cfg.npm.url);
        await npm.login(cfg.npm.email, cfg.npm.password);
        core.info("Retrieved authentication token from npm");
        core.endGroup();

        core.startGroup('Create or Renew SSL Certificate');
        let certificate = await npm.getCertificateByDomain(cfg.ssl.domain);
        if (certificate) {
            core.info("SSL Certificate exist, renew");
            await npm.renewCertificate(certificate.id);
        } else {
            core.info("SSL Certificate isn't exist, crete new");
            certificate = await npm.createCertificate(cfg.ssl.domain, cfg.ssl.email);
        }
        core.endGroup();

        core.startGroup('Create or Update Host');
        let host = await npm.getHostByDomain(cfg.host.domain);
        if (host) {
            core.info("Host exist, update");
            await npm.updateHost(host.id, cfg.host, certificate.id);
        } else {
            core.info("Host isn't exist, crete new");
            certificate = await npm.createHost(cfg.host, certificate.id);
        }
        core.endGroup();
    } catch (e) {
        core.setFailed(`Action failed with error: ${e}`);
    }
}

run();
