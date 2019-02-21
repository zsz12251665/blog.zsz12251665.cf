window.addEventListener('load',LoadMusic);
function LoadMusic()
{
	// Set up the stylesheet
	document.head.innerHTML+='<link rel="stylesheet" type="text/css" href="/add-on/music/music.css" />';
	// Load the request
	var request=JSON.parse('{'+location.search.slice(1).replace(/([^&=]*)=([^&]*)/g,'"$1":"$2"').replace(/&/g,',')+'}');
	if(!(document.querySelector('#music')&&request.title))
		return;
	// Set up the user interface
	document.querySelector('#music').innerHTML+='<audio src="/posts/'+request.title+'/music.mp3" preload="metadata"></audio><b id="play">&#9205;</b><span id="time">00:00/00:00</span><b id="repeat">&#128257;</b><span class="range"><span id="volume"></span></span><b id="mute">&#128266;</b>';
	// Initialize values
	var audio=document.querySelector('#music audio'),mute=document.querySelector('#mute'),play=document.querySelector('#play'),volume=document.querySelector('#volume');
	audio.loop=true;
	// Set up event functions
	audio.ondurationchange=audio.ontimeupdate=function(){document.querySelector('#time').innerText=((audio.currentTime<600)?'0':'')+String(Math.floor(audio.currentTime/60))+((audio.currentTime%60<10)?':0':':')+String(Math.floor(audio.currentTime%60))+((audio.duration<600)?'/0':'/')+String(Math.floor(audio.duration/60))+((audio.duration%60<10)?':0':':')+String(Math.floor(audio.duration%60));};
	audio.onended=function(){play.innerText=(audio.loop)?'&#9208;':'&#9205;';};
	audio.onpause=function(){play.innerText='&#9205;';};
	audio.onplay=function(){play.innerText='&#9208;';};
	audio.onvolumechange=function(){volume.style.width=(audio.muted)?'0%':(String(audio.volume*100)+'%');};
	mute.onclick=function(){mute.innerText=(audio.muted=!audio.muted)?'&#128264;':'&#128266;';};
	play.onclick=function(){audio.paused?audio.play():audio.pause();};
	volume.parentElement.onclick=function(e){audio.volume=Number(e.offsetX/e.target.offsetWidth);if(audio.muted^(!audio.volume))mute.click();if(!audio.volume)audio.volume=1;};
	document.querySelector('#repeat').onclick=function(e){e.target.innerText=(audio.loop=!audio.loop)?'&#128257;':'&#128256;';};
}
