#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const yargs = require('yargs')

const mdnb = require('../mdnb');

//
// Configuration Options
//

// note: for defaults, best to look at the source of the main mdnb module
var config = {}

// reads a config file, like mdnb.json
function readConfigFile(f) {
    if (fs.existsSync(f)) {
        config = JSON.parse(fs.readFileSync(f, 'utf8'))
    }
}

// then parse command line args, which override the json file.
var args = yargs.usage('Usage: $0 -p [port] -t [ignore] -i [ignore files...]')
.option('file', {
    alias: 'f',
    describe: 'configuration file'
})
.option('port', {
    alias: 'p',
    describe: 'http port to listen on'
}).number('p')
.option('ignore', {
    alias: 'i',
    describe: 'ignore files and directories'
}).array('i')
.option('title', {
    alias: 't',
    describe: 'notebook title'
}).parse()

// First read a config file, then override with command line options
if (args.f) {
    readConfigFile(args.f)
} else {
    readConfigFile('mdnb.json')
}

if (args.p) {
    config.port = args.p
}

if (args.i) {
    config.ignore = args.i
}

if (args.t) {
    config.title = args.t
}

mdnb(config)