/*
 * Copyright (c) 2014 Elena Grandi.
 * See the file LICENSE for copying permission.
 */

/*
Module to interface with Serial GPS Devices and parse their NMEA data.

Usage:

```
Serial4.setup(9600,{tx:C10,rx:C11});
var gps = connect(Serial4);
gps.init();
```
*/

var C = {};

function GPS(serial) {
    this.serial = serial;
    this.phrase = '';
}

/** C.SENTENCES is a list of supported NMEA sentences */
GPS.prototype.C = {
    SENTENCES: [
        'GPGGA',
        'GPGSA',
        'GPRMC',
        ]
};

GPS.prototype.init = function() {
    this.serial.on('data', this.get_data);
};

GPS.prototype.get_data = function(data) {
    // TODO: change it to data.indexOf('\n') != -1
    // and work on data.split('\n')
    // (which does *not* include the '\n' character
    if ( data == '\n') {
        this.phrase += data;
        this.emit('phrase', this.phrase);
        // run phrase parsing here
        this.parse_phrase(this.phrase);
        this.phrase = '';
    } else {
        this.phrase += data;
    }
};

/** Parse a phrase and let the right events to be emitted. */
GPS.prototype.parse_phrase = function(phrase) {
    var cks = phrase.slice(1).split('*');
    // todo: check that the checksum of cks[0] is cks[1]
    var ph = cks[0].split(',');
    if ( this.C.SENTENCES.indexOf(ph[0]) != -1 ) {
        parse[ph[0]](ph, this);
    }
};

var parse = {
    'GPGGA': function(ph, emitter) {
        data = {};
        data.lat = ph[2] + ph[3];
        data.lon = ph[4] + ph[5];
        data.quality = ph[6];
        data.sat = ph[7];
        data.hdop = ph[8];
        data.alt = ph[9];
        data.geoid = ph[11];
        emitter.emit('GPGGA', data);
    },
    'GPGSA': function(ph, emitter) {
        data = {};
        emitter.emit('GPGGA', data);
    },
    'GPRMC': function(ph, emitter) {
        data = {};
        emitter.emit('GPGGA', data);
    },
};

exports.connect = function(serial) {
    return new GPS(serial);
};
