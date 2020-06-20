import WebServer from './framework/WebServer';
import APIEndpoint from './framework/models/APIEndpoint';

import getPosts from './handlers/getPosts';
import getPostByID from './handlers/getPostByID';

const webServer = new WebServer(8080);

webServer.addAPIEndpoint(new APIEndpoint('GET', '/posts', getPosts));
webServer.addAPIEndpoint(new APIEndpoint('GET', '/posts/{id}', getPostByID));

//webServer.addSocketEndpoint(new SocketEndpoint('ask_question', handleSocket));

webServer.start();