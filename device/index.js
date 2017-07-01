// index.js
//'use strict';
//IMPORTS


var five = require('johnny-five');
//import * as five from 'johnny-five';
var raspi = require ('raspi-io');
var Camera = require ('camerapi');
//var oxford = require ('project-oxford');
var fs = require ('fs');
var device = require('azure-iot-device');
var deviceAmqp = require('azure-iot-device-amqp');
//import * as raspi from 'raspi-io';
//import * as Camera from 'camerapi';
//import * as oxford from 'project-oxford';
//import * as fs from 'fs';
//import * as device from 'azure-iot-device';
//import * as deviceAmqp from 'azure-iot-device-amqp';

//INIT
//let cogClient = new oxford.Client('ec49c030e5334db39eb3383d01aec038');
let connectionString = 'HostName=TellusIOTHub.azure-devices.net;DeviceId=rp-hal;SharedAccessKey=iaEmnN9i/ENNP54DaFjpg6dYqak5tyeJJBcVez4ubM8=';
let hubClient = deviceAmqp.clientFromConnectionString(connectionString);

//MAIN CODE
//establishing connection to gpio
log('establishing connection to gpio...');
let board = new five.Board({ io: new raspi() });
board.on('ready', () => {
    let led = new five.Led('GPIO26');
    let button = new five.Button('GPIO20');
    led.stop().off();

    //open connection to iot hub
    log('connecting to iot hub...');
    hubClient.open(err => {
        if (err)
            log(err.message)
        else {
            log('READY');
            led.stop().off();

            button.on('press', () => {
                led.blink(500);
                log('sending message to iot hub...');
                let message = new device.Message(JSON.stringify({ deviceId: 'rp-hal', tags: ['foo', 'baz', 'bar'] }));
                                hubClient.sendEvent(message, (err, res) => {
                                    if (err) log(err.message);
                                    else {
                                        log(`Sent message to your IoT Hub`);
                                        log('READY');
                                    }
                                    led.stop().off();
                                });
                            });
                    }
                });
            });
            

function log(msg) {
    console.log(msg);
}