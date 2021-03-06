/*
	AUTHOR: Fábio Pereira da Silva
	YEAR: 2019
	LICENSE: MIT
	EMAIL: fabioegel@gmail.com or fabioegel@protonmail.com
*/


//Ter 03 Set 2019 15:56:56 -03
var blake = require('blakejs');

function fConvertFinalV2(val, prefix)
{
	if ((prefix!=="nano")&&(prefix!=="xrb"))
		return null;
	var a,b;
	var fArray="";
     var alphabet = "13456789abcdefghijkmnopqrstuwxyz";

	var val_tmp = new TextEncoder("utf-8").encode(val);

	if (val_tmp.length>32) {
		//console.log("Erro");
		return null;
	}

	var uint8array = new Uint8Array(35).fill(0);
	var i;

	for (i=0;i<32;i++)
		uint8array[i+3]=val_tmp[i];

	var count=0;

	for (i=0;i<7;i++) {
		a=uint8array[0+count];

		fArray+=alphabet[(a>>3)];

		b=uint8array[1+count];

		fArray+=alphabet[(((a&0x07)<<2)|(b>>6))];

		fArray+=alphabet[((b>>1)&0x1F)];

		a=uint8array[2+count];

		fArray+=alphabet[(((b&0x01)<<4)|(a>>4))];

		b=uint8array[3+count];

		fArray+=alphabet[(((a&0x0F)<<1)|(b>>7))];

		fArray+=alphabet[((b>>2)&0x1F)];

		a=uint8array[4+count];

		fArray+=alphabet[(((b&0x03)<<3)|(a>>5))];
		fArray+=alphabet[(a&0x1F)];

		count+=5;
	}

	fCheckSum=blake.blake2b(uint8array.subarray(3, 35), null, 5).reverse();

	a=fCheckSum[0];

	fArray+=alphabet[(a>>3)];

	b=fCheckSum[1];

	fArray+=alphabet[(((a&0x07)<<2)|(b>>6))];

	fArray+=alphabet[((b>>1)&0x1F)];

	a=fCheckSum[2];

	fArray+=alphabet[(((b&0x01)<<4)|(a>>4))];

	b=fCheckSum[3];

	fArray+=alphabet[(((a&0x0F)<<1)|(b>>7))];

	fArray+=alphabet[((b>>2)&0x1F)];

	a=fCheckSum[4];

	fArray+=alphabet[(((b&0x03)<<3)|(a>>5))];
	fArray+=alphabet[(a&0x1F)];

	return prefix+"_"+fArray.substring(4);
}

module.exports = {
	fConvertFinalV2
}
/*
console.log(fConvertFinalV2("Hello world", "nano")); // returns nano_1k57fjp8ya5qfxs8rs1111111111111111111111111111111111ij8zy1x5
console.log(fConvertFinalV2("Fábio Pereira da Silva", "nano")); // returns nano_1jp5n7j8kus1c3kq6sdbgbik1s5363bpku5pe611111111111111bhhztp6w
console.log(fConvertFinalV2("Hello in corean: 안녕하세요 ^__^", "xrb")); // returns xrb_1k57fjp8ya5bfri88uukeoipwgj1xkcrjtw7kqpsd89eikwgs8nnuug9764s
*/

