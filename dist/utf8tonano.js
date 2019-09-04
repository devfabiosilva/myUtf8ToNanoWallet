var utf8nano=function(t){var r={};function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var i in t)e.d(n,i,function(r){return t[r]}.bind(null,i));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=1)}([function(t,r,e){(function(r){var e="Input must be an string, Buffer or Uint8Array";function n(t){return(4294967296+t).toString(16).substring(1)}t.exports={normalizeInput:function(t){var n;if(t instanceof Uint8Array)n=t;else if(t instanceof r)n=new Uint8Array(t);else{if("string"!=typeof t)throw new Error(e);n=new Uint8Array(r.from(t,"utf8"))}return n},toHex:function(t){return Array.prototype.map.call(t,function(t){return(t<16?"0":"")+t.toString(16)}).join("")},debugPrint:function(t,r,e){for(var i="\n"+t+" = ",o=0;o<r.length;o+=2){if(32===e)i+=n(r[o]).toUpperCase(),i+=" ",i+=n(r[o+1]).toUpperCase();else{if(64!==e)throw new Error("Invalid size "+e);i+=n(r[o+1]).toUpperCase(),i+=n(r[o]).toUpperCase()}o%6==4?i+="\n"+new Array(t.length+4).join(" "):o<r.length-2&&(i+=" ")}console.log(i)},testSpeed:function(t,r,e){for(var n=(new Date).getTime(),i=new Uint8Array(r),o=0;o<r;o++)i[o]=o%256;var u=(new Date).getTime();for(console.log("Generated random input in "+(u-n)+"ms"),n=u,o=0;o<e;o++){var f=t(i),a=(new Date).getTime(),s=a-n;n=a,console.log("Hashed in "+s+"ms: "+f.substring(0,20)+"..."),console.log(Math.round(r/(1<<20)/(s/1e3)*100)/100+" MB PER SECOND")}}}}).call(this,e(4).Buffer)},function(t,r,e){var n=e(2);t.exports={fConvertFinalV2:function(t,r){if("nano"!==r&&"xrb"!==r)return null;var e,i,o="",u="13456789abcdefghijkmnopqrstuwxyz",f=new TextEncoder("utf-8").encode(t);if(f.length>32)return null;var a,s=new Uint8Array(35).fill(0);for(a=0;a<32;a++)s[a+3]=f[a];var h=0;for(a=0;a<7;a++)o+=u[(e=s[0+h])>>3],o+=u[(7&e)<<2|(i=s[1+h])>>6],o+=u[i>>1&31],o+=u[(1&i)<<4|(e=s[2+h])>>4],o+=u[(15&e)<<1|(i=s[3+h])>>7],o+=u[i>>2&31],o+=u[(3&i)<<3|(e=s[4+h])>>5],o+=u[31&e],h+=5;return fCheckSum=n.blake2b(s.subarray(3,35),null,5).reverse(),o+=u[(e=fCheckSum[0])>>3],o+=u[(7&e)<<2|(i=fCheckSum[1])>>6],o+=u[i>>1&31],o+=u[(1&i)<<4|(e=fCheckSum[2])>>4],o+=u[(15&e)<<1|(i=fCheckSum[3])>>7],o+=u[i>>2&31],o+=u[(3&i)<<3|(e=fCheckSum[4])>>5],r+"_"+(o+=u[31&e]).substring(4)}}},function(t,r,e){var n=e(3),i=e(9);t.exports={blake2b:n.blake2b,blake2bHex:n.blake2bHex,blake2bInit:n.blake2bInit,blake2bUpdate:n.blake2bUpdate,blake2bFinal:n.blake2bFinal,blake2s:i.blake2s,blake2sHex:i.blake2sHex,blake2sInit:i.blake2sInit,blake2sUpdate:i.blake2sUpdate,blake2sFinal:i.blake2sFinal}},function(t,r,e){var n=e(0);function i(t,r,e){var n=t[r]+t[e],i=t[r+1]+t[e+1];n>=4294967296&&i++,t[r]=n,t[r+1]=i}function o(t,r,e,n){var i=t[r]+e;e<0&&(i+=4294967296);var o=t[r+1]+n;i>=4294967296&&o++,t[r]=i,t[r+1]=o}function u(t,r){return t[r]^t[r+1]<<8^t[r+2]<<16^t[r+3]<<24}function f(t,r,e,n,u,f){var a=c[u],s=c[u+1],l=c[f],p=c[f+1];i(h,t,r),o(h,t,a,s);var g=h[n]^h[t],y=h[n+1]^h[t+1];h[n]=y,h[n+1]=g,i(h,e,n),g=h[r]^h[e],y=h[r+1]^h[e+1],h[r]=g>>>24^y<<8,h[r+1]=y>>>24^g<<8,i(h,t,r),o(h,t,l,p),g=h[n]^h[t],y=h[n+1]^h[t+1],h[n]=g>>>16^y<<16,h[n+1]=y>>>16^g<<16,i(h,e,n),g=h[r]^h[e],y=h[r+1]^h[e+1],h[r]=y>>>31^g<<1,h[r+1]=g>>>31^y<<1}var a=new Uint32Array([4089235720,1779033703,2227873595,3144134277,4271175723,1013904242,1595750129,2773480762,2917565137,1359893119,725511199,2600822924,4215389547,528734635,327033209,1541459225]),s=new Uint8Array([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,14,10,4,8,9,15,13,6,1,12,0,2,11,7,5,3,11,8,12,0,5,2,15,13,10,14,3,6,7,1,9,4,7,9,3,1,13,12,11,14,2,6,5,10,4,0,15,8,9,0,5,7,2,4,10,15,14,1,11,12,6,8,3,13,2,12,6,10,0,11,8,3,4,13,7,5,15,14,1,9,12,5,1,15,14,13,4,10,0,7,6,3,9,2,8,11,13,11,7,14,12,1,3,9,5,0,15,4,8,6,2,10,6,15,14,9,11,3,0,8,12,2,13,7,1,4,10,5,10,2,8,4,7,6,1,5,15,11,9,14,3,12,13,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,14,10,4,8,9,15,13,6,1,12,0,2,11,7,5,3].map(function(t){return 2*t})),h=new Uint32Array(32),c=new Uint32Array(32);function l(t,r){var e=0;for(e=0;e<16;e++)h[e]=t.h[e],h[e+16]=a[e];for(h[24]=h[24]^t.t,h[25]=h[25]^t.t/4294967296,r&&(h[28]=~h[28],h[29]=~h[29]),e=0;e<32;e++)c[e]=u(t.b,4*e);for(e=0;e<12;e++)f(0,8,16,24,s[16*e+0],s[16*e+1]),f(2,10,18,26,s[16*e+2],s[16*e+3]),f(4,12,20,28,s[16*e+4],s[16*e+5]),f(6,14,22,30,s[16*e+6],s[16*e+7]),f(0,10,20,30,s[16*e+8],s[16*e+9]),f(2,12,22,24,s[16*e+10],s[16*e+11]),f(4,14,16,26,s[16*e+12],s[16*e+13]),f(6,8,18,28,s[16*e+14],s[16*e+15]);for(e=0;e<16;e++)t.h[e]=t.h[e]^h[e]^h[e+16]}function p(t,r){if(0===t||t>64)throw new Error("Illegal output length, expected 0 < length <= 64");if(r&&r.length>64)throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");for(var e={b:new Uint8Array(128),h:new Uint32Array(16),t:0,c:0,outlen:t},n=0;n<16;n++)e.h[n]=a[n];var i=r?r.length:0;return e.h[0]^=16842752^i<<8^t,r&&(g(e,r),e.c=128),e}function g(t,r){for(var e=0;e<r.length;e++)128===t.c&&(t.t+=t.c,l(t,!1),t.c=0),t.b[t.c++]=r[e]}function y(t){for(t.t+=t.c;t.c<128;)t.b[t.c++]=0;l(t,!0);for(var r=new Uint8Array(t.outlen),e=0;e<t.outlen;e++)r[e]=t.h[e>>2]>>8*(3&e);return r}function w(t,r,e){e=e||64,t=n.normalizeInput(t);var i=p(e,r);return g(i,t),y(i)}t.exports={blake2b:w,blake2bHex:function(t,r,e){var i=w(t,r,e);return n.toHex(i)},blake2bInit:p,blake2bUpdate:g,blake2bFinal:y}},function(t,r,e){"use strict";(function(t){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var n=e(6),i=e(7),o=e(8);function u(){return a.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function f(t,r){if(u()<r)throw new RangeError("Invalid typed array length");return a.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(r)).__proto__=a.prototype:(null===t&&(t=new a(r)),t.length=r),t}function a(t,r,e){if(!(a.TYPED_ARRAY_SUPPORT||this instanceof a))return new a(t,r,e);if("number"==typeof t){if("string"==typeof r)throw new Error("If encoding is specified then the first argument must be a string");return c(this,t)}return s(this,t,r,e)}function s(t,r,e,n){if("number"==typeof r)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&r instanceof ArrayBuffer?function(t,r,e,n){if(r.byteLength,e<0||r.byteLength<e)throw new RangeError("'offset' is out of bounds");if(r.byteLength<e+(n||0))throw new RangeError("'length' is out of bounds");r=void 0===e&&void 0===n?new Uint8Array(r):void 0===n?new Uint8Array(r,e):new Uint8Array(r,e,n);a.TYPED_ARRAY_SUPPORT?(t=r).__proto__=a.prototype:t=l(t,r);return t}(t,r,e,n):"string"==typeof r?function(t,r,e){"string"==typeof e&&""!==e||(e="utf8");if(!a.isEncoding(e))throw new TypeError('"encoding" must be a valid string encoding');var n=0|g(r,e),i=(t=f(t,n)).write(r,e);i!==n&&(t=t.slice(0,i));return t}(t,r,e):function(t,r){if(a.isBuffer(r)){var e=0|p(r.length);return 0===(t=f(t,e)).length?t:(r.copy(t,0,0,e),t)}if(r){if("undefined"!=typeof ArrayBuffer&&r.buffer instanceof ArrayBuffer||"length"in r)return"number"!=typeof r.length||(n=r.length)!=n?f(t,0):l(t,r);if("Buffer"===r.type&&o(r.data))return l(t,r.data)}var n;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,r)}function h(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function c(t,r){if(h(r),t=f(t,r<0?0:0|p(r)),!a.TYPED_ARRAY_SUPPORT)for(var e=0;e<r;++e)t[e]=0;return t}function l(t,r){var e=r.length<0?0:0|p(r.length);t=f(t,e);for(var n=0;n<e;n+=1)t[n]=255&r[n];return t}function p(t){if(t>=u())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+u().toString(16)+" bytes");return 0|t}function g(t,r){if(a.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var e=t.length;if(0===e)return 0;for(var n=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":case void 0:return F(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return z(t).length;default:if(n)return F(t).length;r=(""+r).toLowerCase(),n=!0}}function y(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if((e>>>=0)<=(r>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return I(this,r,e);case"utf8":case"utf-8":return P(this,r,e);case"ascii":return B(this,r,e);case"latin1":case"binary":return S(this,r,e);case"base64":return R(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return k(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function w(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function b(t,r,e,n,i){if(0===t.length)return-1;if("string"==typeof e?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,isNaN(e)&&(e=i?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(i)return-1;e=t.length-1}else if(e<0){if(!i)return-1;e=0}if("string"==typeof r&&(r=a.from(r,n)),a.isBuffer(r))return 0===r.length?-1:d(t,r,e,n,i);if("number"==typeof r)return r&=255,a.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,r,e):Uint8Array.prototype.lastIndexOf.call(t,r,e):d(t,[r],e,n,i);throw new TypeError("val must be string, number or Buffer")}function d(t,r,e,n,i){var o,u=1,f=t.length,a=r.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;u=2,f/=2,a/=2,e/=2}function s(t,r){return 1===u?t[r]:t.readUInt16BE(r*u)}if(i){var h=-1;for(o=e;o<f;o++)if(s(t,o)===s(r,-1===h?0:o-h)){if(-1===h&&(h=o),o-h+1===a)return h*u}else-1!==h&&(o-=o-h),h=-1}else for(e+a>f&&(e=f-a),o=e;o>=0;o--){for(var c=!0,l=0;l<a;l++)if(s(t,o+l)!==s(r,l)){c=!1;break}if(c)return o}return-1}function v(t,r,e,n){e=Number(e)||0;var i=t.length-e;n?(n=Number(n))>i&&(n=i):n=i;var o=r.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var u=0;u<n;++u){var f=parseInt(r.substr(2*u,2),16);if(isNaN(f))return u;t[e+u]=f}return u}function A(t,r,e,n){return H(F(r,t.length-e),t,e,n)}function E(t,r,e,n){return H(function(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}(r),t,e,n)}function m(t,r,e,n){return E(t,r,e,n)}function _(t,r,e,n){return H(z(r),t,e,n)}function U(t,r,e,n){return H(function(t,r){for(var e,n,i,o=[],u=0;u<t.length&&!((r-=2)<0);++u)e=t.charCodeAt(u),n=e>>8,i=e%256,o.push(i),o.push(n);return o}(r,t.length-e),t,e,n)}function R(t,r,e){return 0===r&&e===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(r,e))}function P(t,r,e){e=Math.min(t.length,e);for(var n=[],i=r;i<e;){var o,u,f,a,s=t[i],h=null,c=s>239?4:s>223?3:s>191?2:1;if(i+c<=e)switch(c){case 1:s<128&&(h=s);break;case 2:128==(192&(o=t[i+1]))&&(a=(31&s)<<6|63&o)>127&&(h=a);break;case 3:o=t[i+1],u=t[i+2],128==(192&o)&&128==(192&u)&&(a=(15&s)<<12|(63&o)<<6|63&u)>2047&&(a<55296||a>57343)&&(h=a);break;case 4:o=t[i+1],u=t[i+2],f=t[i+3],128==(192&o)&&128==(192&u)&&128==(192&f)&&(a=(15&s)<<18|(63&o)<<12|(63&u)<<6|63&f)>65535&&a<1114112&&(h=a)}null===h?(h=65533,c=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),i+=c}return function(t){var r=t.length;if(r<=T)return String.fromCharCode.apply(String,t);var e="",n=0;for(;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=T));return e}(n)}r.Buffer=a,r.SlowBuffer=function(t){+t!=t&&(t=0);return a.alloc(+t)},r.INSPECT_MAX_BYTES=50,a.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),r.kMaxLength=u(),a.poolSize=8192,a._augment=function(t){return t.__proto__=a.prototype,t},a.from=function(t,r,e){return s(null,t,r,e)},a.TYPED_ARRAY_SUPPORT&&(a.prototype.__proto__=Uint8Array.prototype,a.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&a[Symbol.species]===a&&Object.defineProperty(a,Symbol.species,{value:null,configurable:!0})),a.alloc=function(t,r,e){return function(t,r,e,n){return h(r),r<=0?f(t,r):void 0!==e?"string"==typeof n?f(t,r).fill(e,n):f(t,r).fill(e):f(t,r)}(null,t,r,e)},a.allocUnsafe=function(t){return c(null,t)},a.allocUnsafeSlow=function(t){return c(null,t)},a.isBuffer=function(t){return!(null==t||!t._isBuffer)},a.compare=function(t,r){if(!a.isBuffer(t)||!a.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(t===r)return 0;for(var e=t.length,n=r.length,i=0,o=Math.min(e,n);i<o;++i)if(t[i]!==r[i]){e=t[i],n=r[i];break}return e<n?-1:n<e?1:0},a.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},a.concat=function(t,r){if(!o(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return a.alloc(0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var n=a.allocUnsafe(r),i=0;for(e=0;e<t.length;++e){var u=t[e];if(!a.isBuffer(u))throw new TypeError('"list" argument must be an Array of Buffers');u.copy(n,i),i+=u.length}return n},a.byteLength=g,a.prototype._isBuffer=!0,a.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)w(this,r,r+1);return this},a.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)w(this,r,r+3),w(this,r+1,r+2);return this},a.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)w(this,r,r+7),w(this,r+1,r+6),w(this,r+2,r+5),w(this,r+3,r+4);return this},a.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?P(this,0,t):y.apply(this,arguments)},a.prototype.equals=function(t){if(!a.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===a.compare(this,t)},a.prototype.inspect=function(){var t="",e=r.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,e).match(/.{2}/g).join(" "),this.length>e&&(t+=" ... ")),"<Buffer "+t+">"},a.prototype.compare=function(t,r,e,n,i){if(!a.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===r&&(r=0),void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),r<0||e>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&r>=e)return 0;if(n>=i)return-1;if(r>=e)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),u=(e>>>=0)-(r>>>=0),f=Math.min(o,u),s=this.slice(n,i),h=t.slice(r,e),c=0;c<f;++c)if(s[c]!==h[c]){o=s[c],u=h[c];break}return o<u?-1:u<o?1:0},a.prototype.includes=function(t,r,e){return-1!==this.indexOf(t,r,e)},a.prototype.indexOf=function(t,r,e){return b(this,t,r,e,!0)},a.prototype.lastIndexOf=function(t,r,e){return b(this,t,r,e,!1)},a.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r|=0,isFinite(e)?(e|=0,void 0===n&&(n="utf8")):(n=e,e=void 0)}var i=this.length-r;if((void 0===e||e>i)&&(e=i),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return v(this,t,r,e);case"utf8":case"utf-8":return A(this,t,r,e);case"ascii":return E(this,t,r,e);case"latin1":case"binary":return m(this,t,r,e);case"base64":return _(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return U(this,t,r,e);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},a.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var T=4096;function B(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(127&t[i]);return n}function S(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(t[i]);return n}function I(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var i="",o=r;o<e;++o)i+=N(t[o]);return i}function k(t,r,e){for(var n=t.slice(r,e),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function x(t,r,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function Y(t,r,e,n,i,o){if(!a.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>i||r<o)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function C(t,r,e,n){r<0&&(r=65535+r+1);for(var i=0,o=Math.min(t.length-e,2);i<o;++i)t[e+i]=(r&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function O(t,r,e,n){r<0&&(r=4294967295+r+1);for(var i=0,o=Math.min(t.length-e,4);i<o;++i)t[e+i]=r>>>8*(n?i:3-i)&255}function M(t,r,e,n,i,o){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function L(t,r,e,n,o){return o||M(t,0,e,4),i.write(t,r,e,n,23,4),e+4}function D(t,r,e,n,o){return o||M(t,0,e,8),i.write(t,r,e,n,52,8),e+8}a.prototype.slice=function(t,r){var e,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),(r=void 0===r?n:~~r)<0?(r+=n)<0&&(r=0):r>n&&(r=n),r<t&&(r=t),a.TYPED_ARRAY_SUPPORT)(e=this.subarray(t,r)).__proto__=a.prototype;else{var i=r-t;e=new a(i,void 0);for(var o=0;o<i;++o)e[o]=this[o+t]}return e},a.prototype.readUIntLE=function(t,r,e){t|=0,r|=0,e||x(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n},a.prototype.readUIntBE=function(t,r,e){t|=0,r|=0,e||x(t,r,this.length);for(var n=this[t+--r],i=1;r>0&&(i*=256);)n+=this[t+--r]*i;return n},a.prototype.readUInt8=function(t,r){return r||x(t,1,this.length),this[t]},a.prototype.readUInt16LE=function(t,r){return r||x(t,2,this.length),this[t]|this[t+1]<<8},a.prototype.readUInt16BE=function(t,r){return r||x(t,2,this.length),this[t]<<8|this[t+1]},a.prototype.readUInt32LE=function(t,r){return r||x(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},a.prototype.readUInt32BE=function(t,r){return r||x(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},a.prototype.readIntLE=function(t,r,e){t|=0,r|=0,e||x(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*r)),n},a.prototype.readIntBE=function(t,r,e){t|=0,r|=0,e||x(t,r,this.length);for(var n=r,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*r)),o},a.prototype.readInt8=function(t,r){return r||x(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},a.prototype.readInt16LE=function(t,r){r||x(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},a.prototype.readInt16BE=function(t,r){r||x(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},a.prototype.readInt32LE=function(t,r){return r||x(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},a.prototype.readInt32BE=function(t,r){return r||x(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},a.prototype.readFloatLE=function(t,r){return r||x(t,4,this.length),i.read(this,t,!0,23,4)},a.prototype.readFloatBE=function(t,r){return r||x(t,4,this.length),i.read(this,t,!1,23,4)},a.prototype.readDoubleLE=function(t,r){return r||x(t,8,this.length),i.read(this,t,!0,52,8)},a.prototype.readDoubleBE=function(t,r){return r||x(t,8,this.length),i.read(this,t,!1,52,8)},a.prototype.writeUIntLE=function(t,r,e,n){(t=+t,r|=0,e|=0,n)||Y(this,t,r,e,Math.pow(2,8*e)-1,0);var i=1,o=0;for(this[r]=255&t;++o<e&&(i*=256);)this[r+o]=t/i&255;return r+e},a.prototype.writeUIntBE=function(t,r,e,n){(t=+t,r|=0,e|=0,n)||Y(this,t,r,e,Math.pow(2,8*e)-1,0);var i=e-1,o=1;for(this[r+i]=255&t;--i>=0&&(o*=256);)this[r+i]=t/o&255;return r+e},a.prototype.writeUInt8=function(t,r,e){return t=+t,r|=0,e||Y(this,t,r,1,255,0),a.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[r]=255&t,r+1},a.prototype.writeUInt16LE=function(t,r,e){return t=+t,r|=0,e||Y(this,t,r,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):C(this,t,r,!0),r+2},a.prototype.writeUInt16BE=function(t,r,e){return t=+t,r|=0,e||Y(this,t,r,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):C(this,t,r,!1),r+2},a.prototype.writeUInt32LE=function(t,r,e){return t=+t,r|=0,e||Y(this,t,r,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t):O(this,t,r,!0),r+4},a.prototype.writeUInt32BE=function(t,r,e){return t=+t,r|=0,e||Y(this,t,r,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):O(this,t,r,!1),r+4},a.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r|=0,!n){var i=Math.pow(2,8*e-1);Y(this,t,r,e,i-1,-i)}var o=0,u=1,f=0;for(this[r]=255&t;++o<e&&(u*=256);)t<0&&0===f&&0!==this[r+o-1]&&(f=1),this[r+o]=(t/u>>0)-f&255;return r+e},a.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r|=0,!n){var i=Math.pow(2,8*e-1);Y(this,t,r,e,i-1,-i)}var o=e-1,u=1,f=0;for(this[r+o]=255&t;--o>=0&&(u*=256);)t<0&&0===f&&0!==this[r+o+1]&&(f=1),this[r+o]=(t/u>>0)-f&255;return r+e},a.prototype.writeInt8=function(t,r,e){return t=+t,r|=0,e||Y(this,t,r,1,127,-128),a.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[r]=255&t,r+1},a.prototype.writeInt16LE=function(t,r,e){return t=+t,r|=0,e||Y(this,t,r,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):C(this,t,r,!0),r+2},a.prototype.writeInt16BE=function(t,r,e){return t=+t,r|=0,e||Y(this,t,r,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):C(this,t,r,!1),r+2},a.prototype.writeInt32LE=function(t,r,e){return t=+t,r|=0,e||Y(this,t,r,4,2147483647,-2147483648),a.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24):O(this,t,r,!0),r+4},a.prototype.writeInt32BE=function(t,r,e){return t=+t,r|=0,e||Y(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),a.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):O(this,t,r,!1),r+4},a.prototype.writeFloatLE=function(t,r,e){return L(this,t,r,!0,e)},a.prototype.writeFloatBE=function(t,r,e){return L(this,t,r,!1,e)},a.prototype.writeDoubleLE=function(t,r,e){return D(this,t,r,!0,e)},a.prototype.writeDoubleBE=function(t,r,e){return D(this,t,r,!1,e)},a.prototype.copy=function(t,r,e,n){if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var i,o=n-e;if(this===t&&e<r&&r<n)for(i=o-1;i>=0;--i)t[i+r]=this[i+e];else if(o<1e3||!a.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)t[i+r]=this[i+e];else Uint8Array.prototype.set.call(t,this.subarray(e,e+o),r);return o},a.prototype.fill=function(t,r,e,n){if("string"==typeof t){if("string"==typeof r?(n=r,r=0,e=this.length):"string"==typeof e&&(n=e,e=this.length),1===t.length){var i=t.charCodeAt(0);i<256&&(t=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!a.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;var o;if(r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0),"number"==typeof t)for(o=r;o<e;++o)this[o]=t;else{var u=a.isBuffer(t)?t:F(new a(t,n).toString()),f=u.length;for(o=0;o<e-r;++o)this[o+r]=u[o%f]}return this};var j=/[^+\/0-9A-Za-z-_]/g;function N(t){return t<16?"0"+t.toString(16):t.toString(16)}function F(t,r){var e;r=r||1/0;for(var n=t.length,i=null,o=[],u=0;u<n;++u){if((e=t.charCodeAt(u))>55295&&e<57344){if(!i){if(e>56319){(r-=3)>-1&&o.push(239,191,189);continue}if(u+1===n){(r-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(r-=3)>-1&&o.push(239,191,189),i=e;continue}e=65536+(i-55296<<10|e-56320)}else i&&(r-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((r-=1)<0)break;o.push(e)}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return o}function z(t){return n.toByteArray(function(t){if((t=function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}(t).replace(j,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function H(t,r,e,n){for(var i=0;i<n&&!(i+e>=r.length||i>=t.length);++i)r[i+e]=t[i];return i}}).call(this,e(5))},function(t,r){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,r,e){"use strict";r.byteLength=function(t){var r=s(t),e=r[0],n=r[1];return 3*(e+n)/4-n},r.toByteArray=function(t){var r,e,n=s(t),u=n[0],f=n[1],a=new o(function(t,r,e){return 3*(r+e)/4-e}(0,u,f)),h=0,c=f>0?u-4:u;for(e=0;e<c;e+=4)r=i[t.charCodeAt(e)]<<18|i[t.charCodeAt(e+1)]<<12|i[t.charCodeAt(e+2)]<<6|i[t.charCodeAt(e+3)],a[h++]=r>>16&255,a[h++]=r>>8&255,a[h++]=255&r;2===f&&(r=i[t.charCodeAt(e)]<<2|i[t.charCodeAt(e+1)]>>4,a[h++]=255&r);1===f&&(r=i[t.charCodeAt(e)]<<10|i[t.charCodeAt(e+1)]<<4|i[t.charCodeAt(e+2)]>>2,a[h++]=r>>8&255,a[h++]=255&r);return a},r.fromByteArray=function(t){for(var r,e=t.length,i=e%3,o=[],u=0,f=e-i;u<f;u+=16383)o.push(h(t,u,u+16383>f?f:u+16383));1===i?(r=t[e-1],o.push(n[r>>2]+n[r<<4&63]+"==")):2===i&&(r=(t[e-2]<<8)+t[e-1],o.push(n[r>>10]+n[r>>4&63]+n[r<<2&63]+"="));return o.join("")};for(var n=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",f=0,a=u.length;f<a;++f)n[f]=u[f],i[u.charCodeAt(f)]=f;function s(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=t.indexOf("=");return-1===e&&(e=r),[e,e===r?0:4-e%4]}function h(t,r,e){for(var i,o,u=[],f=r;f<e;f+=3)i=(t[f]<<16&16711680)+(t[f+1]<<8&65280)+(255&t[f+2]),u.push(n[(o=i)>>18&63]+n[o>>12&63]+n[o>>6&63]+n[63&o]);return u.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},function(t,r){r.read=function(t,r,e,n,i){var o,u,f=8*i-n-1,a=(1<<f)-1,s=a>>1,h=-7,c=e?i-1:0,l=e?-1:1,p=t[r+c];for(c+=l,o=p&(1<<-h)-1,p>>=-h,h+=f;h>0;o=256*o+t[r+c],c+=l,h-=8);for(u=o&(1<<-h)-1,o>>=-h,h+=n;h>0;u=256*u+t[r+c],c+=l,h-=8);if(0===o)o=1-s;else{if(o===a)return u?NaN:1/0*(p?-1:1);u+=Math.pow(2,n),o-=s}return(p?-1:1)*u*Math.pow(2,o-n)},r.write=function(t,r,e,n,i,o){var u,f,a,s=8*o-i-1,h=(1<<s)-1,c=h>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,g=n?1:-1,y=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(f=isNaN(r)?1:0,u=h):(u=Math.floor(Math.log(r)/Math.LN2),r*(a=Math.pow(2,-u))<1&&(u--,a*=2),(r+=u+c>=1?l/a:l*Math.pow(2,1-c))*a>=2&&(u++,a/=2),u+c>=h?(f=0,u=h):u+c>=1?(f=(r*a-1)*Math.pow(2,i),u+=c):(f=r*Math.pow(2,c-1)*Math.pow(2,i),u=0));i>=8;t[e+p]=255&f,p+=g,f/=256,i-=8);for(u=u<<i|f,s+=i;s>0;t[e+p]=255&u,p+=g,u/=256,s-=8);t[e+p-g]|=128*y}},function(t,r){var e={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==e.call(t)}},function(t,r,e){var n=e(0);function i(t,r){return t[r]^t[r+1]<<8^t[r+2]<<16^t[r+3]<<24}function o(t,r,e,n,i,o){s[t]=s[t]+s[r]+i,s[n]=u(s[n]^s[t],16),s[e]=s[e]+s[n],s[r]=u(s[r]^s[e],12),s[t]=s[t]+s[r]+o,s[n]=u(s[n]^s[t],8),s[e]=s[e]+s[n],s[r]=u(s[r]^s[e],7)}function u(t,r){return t>>>r^t<<32-r}var f=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),a=new Uint8Array([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,14,10,4,8,9,15,13,6,1,12,0,2,11,7,5,3,11,8,12,0,5,2,15,13,10,14,3,6,7,1,9,4,7,9,3,1,13,12,11,14,2,6,5,10,4,0,15,8,9,0,5,7,2,4,10,15,14,1,11,12,6,8,3,13,2,12,6,10,0,11,8,3,4,13,7,5,15,14,1,9,12,5,1,15,14,13,4,10,0,7,6,3,9,2,8,11,13,11,7,14,12,1,3,9,5,0,15,4,8,6,2,10,6,15,14,9,11,3,0,8,12,2,13,7,1,4,10,5,10,2,8,4,7,6,1,5,15,11,9,14,3,12,13,0]),s=new Uint32Array(16),h=new Uint32Array(16);function c(t,r){var e=0;for(e=0;e<8;e++)s[e]=t.h[e],s[e+8]=f[e];for(s[12]^=t.t,s[13]^=t.t/4294967296,r&&(s[14]=~s[14]),e=0;e<16;e++)h[e]=i(t.b,4*e);for(e=0;e<10;e++)o(0,4,8,12,h[a[16*e+0]],h[a[16*e+1]]),o(1,5,9,13,h[a[16*e+2]],h[a[16*e+3]]),o(2,6,10,14,h[a[16*e+4]],h[a[16*e+5]]),o(3,7,11,15,h[a[16*e+6]],h[a[16*e+7]]),o(0,5,10,15,h[a[16*e+8]],h[a[16*e+9]]),o(1,6,11,12,h[a[16*e+10]],h[a[16*e+11]]),o(2,7,8,13,h[a[16*e+12]],h[a[16*e+13]]),o(3,4,9,14,h[a[16*e+14]],h[a[16*e+15]]);for(e=0;e<8;e++)t.h[e]^=s[e]^s[e+8]}function l(t,r){if(!(t>0&&t<=32))throw new Error("Incorrect output length, should be in [1, 32]");var e=r?r.length:0;if(r&&!(e>0&&e<=32))throw new Error("Incorrect key length, should be in [1, 32]");var n={h:new Uint32Array(f),b:new Uint32Array(64),c:0,t:0,outlen:t};return n.h[0]^=16842752^e<<8^t,e>0&&(p(n,r),n.c=64),n}function p(t,r){for(var e=0;e<r.length;e++)64===t.c&&(t.t+=t.c,c(t,!1),t.c=0),t.b[t.c++]=r[e]}function g(t){for(t.t+=t.c;t.c<64;)t.b[t.c++]=0;c(t,!0);for(var r=new Uint8Array(t.outlen),e=0;e<t.outlen;e++)r[e]=t.h[e>>2]>>8*(3&e)&255;return r}function y(t,r,e){e=e||32,t=n.normalizeInput(t);var i=l(e,r);return p(i,t),g(i)}t.exports={blake2s:y,blake2sHex:function(t,r,e){var i=y(t,r,e);return n.toHex(i)},blake2sInit:l,blake2sUpdate:p,blake2sFinal:g}}]);