#!/usr/bin/env node

const fs = require("fs");
const https = require('https');

fs.watch(`./${process.argv[2]}.jsc`, (eventType, filename) => {
  if (eventType == "change") {
    console.log(`${filename} has been changed \n compiling...`);
    var js = new String(fs.readFileSync(`./${filename}`, 'utf8'));

    if (js.indexOf("uuid") > -1) {
      js = `const uuid = (length = 32) => { return require("crypto").randomBytes(length).toString('hex').substring(0, length) };\n` + js
    };

    js = js.replace(/mod\(/g, "require(");

    js = js.replace(/int.random/g, "Math.floor(Math.random() * (Math.random() * 100))");
    js = js.replace(/int.floor/g, "Math.floor");
    js = js.replace(/int.ceil/g, "Math.ceil");
    js = js.replace(/int.round/g, "Math.round");
    js = js.replace(/int.abs/g, "Math.abs");
    js = js.replace(/int.pow/g, "Math.pow");
    js = js.replace(/int.srt/g, "Math.sqrt");
    js = js.replace(/int.min/g, "Math.min");
    js = js.replace(/int.max/g, "Math.max");
    js = js.replace(/int.clamp/g, "Math.clamp");

    js = js.replace(/func /g, "function ");

    js = js.replace(/log\(/g, "console.log(");
    js = js.replace(/log.error\(/g, "console.error(");
    js = js.replace(/log.trace/g, "console.trace");
    js = js.replace(/console.console.log/g, "console.log");
    js = js.replace(/console.console.error/g, "console.error");
    js = js.replace(/console.console.trace/g, "console.trace");

    js = js.replace(/do.after/, "setTimeout");
    js = js.replace(/do.every/, "setInterval");
    js = js.replace(/do.cancel/, "clearInterval");

    js = js.replace(/import crypto;/g, "const crypto = require('crypto')");
    js = js.replace(/import readline;/g, "const readline = require('readline')");
    js = js.replace(/import path;/g, "const path = require('path')");
    js = js.replace(/import os;/g, "const os = require('os')");
    js = js.replace(/import fs;/g, "const fs = require('fs')");
    js = js.replace(/import process;/g, "const process = require('process')");
    js = js.replace(/import http;/g, "const http = require('http')");
    js = js.replace(/import https;/g, "const https = require('https')");
    js = js.replace(/import net;/g, "const net = require('net')");
    js = js.replace(/import url;/g, "const url = require('url')");
    js = js.replace(/import dns;/g, "const dns = require('dns')");
    js = js.replace(/import tls;/g, "const tls = require('tls')");
    js = js.replace(/import dgram;/g, "const dgram = require('dgram')");
    js = js.replace(/import assert;/g, "const crypto = require('assert')");
    js = js.replace(/import util;/g, "const util = require('util')");
    js = js.replace(/import events;/g, "const events = require('events')");
    js = js.replace(/import stream;/g, "const stream = require('stream')");
    js = js.replace(/import buffer;/g, "const buffer = require('buffer')");
    js = js.replace(/import child_process;/g, "const child_process = require('child_process')");
    js = js.replace(/import module;/g, "const module = require('module')");
    js = js.replace(/import domain;/g, "const readline = require('domain')");
    js = js.replace(/import v8;/g, "const v8 = require('v8')");

    var minjs = ""

    const query = require("querystring").stringify({
      input: js
    });

    const options = {
      hostname: 'www.toptal.com',
      method: "POST",
      path: '/developers/javascript-minifier/raw'
    }

    var req = https.request(options, (res) => {
      res.on("data", (chunk) => {
        minjs = chunk;
      });

      res.on("end", () => {
        fs.writeFile(require("path").join(__dirname, `${process.argv[2]}.js`), minjs, (err) => {
          if (err) throw err;
          console.log('compiled \nThe file has been saved');
        });
      });
    });

    req.on("error", (e) => {
      console.log(e)
    })
    req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.setHeader('Content-Length', query.length);
    req.end(query, 'utf8');
  }
});;