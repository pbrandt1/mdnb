#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const mdnb = require('../mdnb');

mdnb({
    root: path.resolve('.')
})