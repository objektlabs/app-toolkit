import WebServer from './framework/WebServer';

import getPosts from './handlers/getPosts';

const webServer = new WebServer(8080);

webServer.registerEndpoint('GET', '/', getPosts);

webServer.start();