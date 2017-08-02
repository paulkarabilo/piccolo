const SYM = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-'.split('');
const BASE = SYM.length;
const convert = (n) => n ? SYM[n % BASE] + convert(Math.floor(n / BASE)) : '';
const unconvert = (s, p = 0) => s && s.length ? unconvert(s.substr(1), p + 1) + SYM.indexOf(s[0]) * Math.pow(BASE, p) : 0

module.exports = {convert, unconvert};