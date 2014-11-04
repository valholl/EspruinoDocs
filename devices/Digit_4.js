/* Copyright (c) 2014 Elena Grandi. See the file LICENSE for copying permission. */
/*
 * Module for a 4-digit 8 segments display using two 74HC595 shift registers.
 */

//var C = {
//}

function Digit_4(sclk, rclk, dio) {
    this.sclk = sclk;
    this.rclk = rclk;
    this.dio = dio;
}

Digit_4.prototype.C = {
    characters: {
        '0': (128>>0) + (128>>1) + (128>>2) + (128>>3) + (128>>4) + (128>>5),
        '1': (128>>1) + (128>>2),
        '2': (128>>0) + (128>>1) + (128>>6) + (128>>4) + (128>>3),
        '3': (128>>0) + (128>>1) + (128>>2) + (128>>3) + (128>>6),
        '4': (128>>5) + (128>>6) + (128>>1) + (128>>2),
        '5': (128>>0) + (128>>5) + (128>>6) + (128>>2) + (128>>3),
        '6': (128>>5) + (128>>6) + (128>>2) + (128>>3) + (128>>4),
        '7': (128>>0) + (128>>1) + (128>>2),
        '8': 255 - (128>>7),
        '9': 255 - (128>>7) - (128>>4),
    },
    digits: {
        0: 128,
        1: 64,
        2: 32,
        3: 16,
    }
};

/** Show a 4-character string */
Digit_4.prototype.show = function(str) {
   console.log('Not implemented yet');
}

Digit_4.prototype.print = function(character, digit) {
    pos = this.C.digits[digit];
    dig = this.C.characters[character];
    this.rclk.write(0);
    this.sclk.write(0);
    for (i=0; i<8; i++) {
        this.dio.write(!((dig >> i) & 1));
        this.sclk.write(1);
        this.sclk.write(0);
    }
    for (i=0; i<8; i++) {
        this.dio.write((pos >> i) & 1);
        this.sclk.write(1);
        this.sclk.write(0);
    }
    this.rclk.write(1);
};

exports.connect = function(sclk, rclk, dio) {
    return new Digit_4(sclk, rclk, dio);
};
