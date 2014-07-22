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
```

or, to log NMEA data to SD before parsing:

```
Serial4.setup(9600,{tx:C10,rx:C11});
var gps = connect(Serial4, 'nmea.log');
```
*/

var C = {
}

function GPS(serial, logfile) {
    this.serial = serial;
    this.logfile = logfile;
    this.phrase = '';
}

GPS.prototype.C = {
};

GPS.prototype.init() {
    if (this.logfile) {
        this.fs = require('fs');
    }
    this.serial.setup(this.speed, this.opts);
    serial.on('data', this.get_data(data));
}

GPS.prototype.get_data(data) {
    // TODO: change it to data.indexOf('\n') != -1
    // and work on data.split('\n')
    // (which does *not* include the '\n' character
    if ( data == '\n') {
        this.phrase += data;
        if (this.logfile) {
            this.fs.appendFile(this.logfile, this.phrase);
        }
        // run phrase parsing here
        this.phrase = '';
    } else {
        this.phrase += data;
    }
}

exports.connect = function(serial, speed, opts) {
    return new GPS(serial, speed, opts);
}
