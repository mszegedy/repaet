var limit = {
	min: 1, max: 195
};
var pkmElim = new Array();
var pkmLike = new Array();
var pkmSeen = new Array();

function startG() {
	document.getElementById('skip').removeAttribute('disabled');

	//make sure the gen used will be what is selected
	pkmElim = new Array();
	pkmLike.length = 0;;
	updateGen(true);
	reroll(0);
}

function updateGen(value, start) {
	limit.min = 1;
	limit.max = 157;
	document.getElementsByTagName('span')[1].innerHTML = ''+ (limit.max - limit.min + 1);
	if(!start)
		return;
	for(j = limit.min; j <= limit.max; j++) {
		pkmLike.push(j);
	}
}

function reroll(fav) {
	//console.log(pkmElim.length + '\t' + pkmLike.length);
	if(pkmElim.length >= limit.max - limit.min) {
		return;
	}
	var _tmp = [document.getElementById('choice').getElementsByTagName('img')[0],
				document.getElementById('choice').getElementsByTagName('img')[1]];
		//parse the dex# from choice image
		_tmp.push(_tmp[0].src.slice(_tmp[0].src.search(/[0-9]*.png/), _tmp[0].src.length - 4));
		_tmp.push(_tmp[1].src.slice(_tmp[1].src.search(/[0-9]*.png/), _tmp[1].src.length - 4));

	switch(fav) {
		case 0: //It is the first roll. Need to change the image's onclick event
			_tmp[0].setAttribute('onclick', 'reroll(1)');
			_tmp[1].setAttribute('onclick', 'reroll(2)');
			break;
		case 1:
			pkmElim.push(_tmp[3]);
			pkmSeen.push(_tmp[2]);
			break;
		case 2:
			pkmElim.push(_tmp[2]);
			pkmSeen.push(_tmp[3]);
			break;
		case 3: //skipped was press. don't eliminate.
			pkmLike.push(_tmp[2]);
			pkmLike.push(_tmp[3]);
	}

	//update top 9 image src
	console.log(limit.max - limit.min - pkmElim.length);
	if(limit.max - limit.min - pkmElim.length <= 8 && fav != 3 ) {
		var x = document.getElementsByClassName('fav');
		x[limit.max - limit.min - pkmElim.length].src = 'images/' + pkmElim[pkmElim.length -1] + '.png';
	}

	//update choice image src
	_tmp[0].src = 'images/' + _newPkm() + '.png';
	if(pkmLike.length == 0 && pkmSeen.length== 0)
		_tmp[1].src = _tmp[0].src;
	else 
		_tmp[1].src = 'images/' + _newPkm() + '.png';

	//update eliminated text
	document.getElementsByTagName('span')[0].innerHTML = ''+ pkmElim.length;
} 

function _newPkm() {
	if(pkmLike.length <= 0) {
		pkmLike = pkmLike.concat(pkmSeen);
		pkmSeen.length = 0;
	}
	return pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1);
}
