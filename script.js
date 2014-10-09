var limit = {
	min: 1, max: 195
};
var flgElim = new Array();
var flgLike = new Array();
var flgSeen = new Array();

function startG() {
	var _tmp = document.getElementsByTagName('select')[0];
	_tmp.setAttribute('disabled', 'disabled');
	document.getElementById('newflg').setAttribute('disabled', 'disabled');
	document.getElementById('settings').className = 'disabled';
	document.getElementById('skip').removeAttribute('disabled');

	//make sure the gen used will be what is selected
	flgElim = new Array();
	flgLike.length = 0;;
	updateGen(_tmp.value, true);
	reroll(0);
}

function updateGen(value, start) {
	var _limits = [ [1, 195], 
					[1, 195]];
	for(i = 0; i < _limits.length; i++) {
		if(i == value) {
			limit.min = document.getElementById('newflg').checked ? _limits[i][0] : 1;
			limit.max = _limits[i][1];
			document.getElementsByTagName('span')[1].innerHTML = ''+ (limit.max - limit.min + 1);
			if(!start)
				break;
			for(j = limit.min; j <= limit.max; j++) {
				flgLike.push(j);
			}
			break;
		}
	}
}

function reroll(fav) {
	//console.log(flgElim.length + '\t' + flgLike.length);
	if(flgElim.length >= limit.max - limit.min) {
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
			flgElim.push(_tmp[3]);
			flgSeen.push(_tmp[2]);
			break;
		case 2:
			flgElim.push(_tmp[2]);
			flgSeen.push(_tmp[3]);
			break;
		case 3: //skipped was press. don't eliminate.
			flgLike.push(_tmp[2]);
			flgLike.push(_tmp[3]);
	}

	//update top 9 image src
	console.log(limit.max - limit.min - flgElim.length);
	if(limit.max - limit.min - flgElim.length <= 8 && fav != 3 ) {
		var x = document.getElementsByClassName('fav');
		x[limit.max - limit.min - flgElim.length].src = 'images/' + flgElim[flgElim.length -1] + '.png';
	}

	//update choice image src
	_tmp[0].src = 'images/' + _newflg() + '.png';
	if(flgLike.length == 0 && flgSeen.length== 0)
		_tmp[1].src = _tmp[0].src;
	else 
		_tmp[1].src = 'images/' + _newflg() + '.png';

	//update eliminated text
	document.getElementsByTagName('span')[0].innerHTML = ''+ flgElim.length;
} 

function _newflg() {
	if(flgLike.length <= 0) {
		flgLike = flgLike.concat(flgSeen);
		flgSeen.length = 0;
	}
	return flgLike.splice(Math.floor(Math.random() * flgLike.length),1);
}
