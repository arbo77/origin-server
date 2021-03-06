#!/bin/env node

var fs       = require('fs');
var path     = require('path');
var optimist = require('optimist');

var Logger   = require('../lib/logger/Logger.js');
var WebProxy = require('../lib/proxy/ProxyServer.js');
var wslogger = require('../lib/plugins/ws-request-logger.js');

/**
 *  main():  main code
 */

/*  Check arguments - config file?  */
if (!optimist.argv.config) {
  Logger.warn("Usage: " + optimist.argv.$0 + " --config <config-file> ");
  console.log("Usage: " + optimist.argv.$0 + " --config <config-file>\n");
  process.exit(22);
}

/*  Get full path to the config file.  */
var config_file = path.resolve('./', optimist.argv.config);

/*  Create a new web ProxyServer and use the specified config.  */
var proxy_server = new WebProxy.ProxyServer(config_file);
Logger.info("ProxyServer using config '" + config_file + "'");

/*  Hook access logger into proxy server workflow for requests/websockets.  */
wslogger.plugin(proxy_server);

/*  Start the web ProxyServer.  */
proxy_server.start();



/**
 * EOF
 */
