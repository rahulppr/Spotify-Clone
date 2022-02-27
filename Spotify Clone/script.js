console.log("Welcome to Spotify");

//Initialise the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  {songName: "Phir Le Aaya Dil", filepath:"songs/1.mp3",  coverPath:'cover/1.jpeg'},
  {songName: "MashUp Hits",      filepath:"songs/2.mp3",  coverPath:'cover/2.jpg'},
  {songName: "Humdard",          filepath:"songs/3.mp3",  coverPath:'cover/3.jpg'},
  {songName: "Thodi Jagah",      filepath:"songs/4.mp3",  coverPath:'cover/4.jpg'},
  {songName: "Agar Tum Sath Ho", filepath:"songs/5.mp3",  coverPath:'cover/5.jpg'},
  {songName: "Aayat",            filepath:"songs/6.mp3",  coverPath:'cover/6.jpg'},
  {songName: "Soch Na Sake",     filepath:"songs/7.mp3",  coverPath:'cover/7.jpg'},
  {songName: "Chal Waha ",       filepath:"songs/8.mp3", coverPath:'cover/8.jpg'}

]

songItems.forEach((element,i)=>{
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  // console.log(element,i);
})

// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener("click",()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove(' fa-solid-fa-circle-play');
    masterPlay.classList.add('fa-solid-fa-circle-pause');
    gif.style.opacity = 1;
  }
  else
  {
    audioElement.pause();
    masterPlay.classList.remove('fa-solid-fa-circle-pause');
    masterPlay.classList.add('fa-solid-fa-circle-play');
    gif.style.opacity=0;
  }
})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{

  //Update Seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
  myProgressBar.value = progress;

})

myProgressBar.addEventListener('change',()=>{
  audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-solid-fa-circle-pause');
    element.classList.add('fa-solid-fa-circle-play');
  })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    makeAllPlays();
    masterSongName.innerText = songs[songIndex].songName;
    songIndex = parseInt(e.target.id);
  e.target.classList.remove('fa-solid-fa-circle-play');
  e.target.classList.add('fa-solid-fa-circle-pause');
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-solid-fa-circle-play');
  masterPlay.classList.add('fa-solid-fa-circle-pause');
  })
})

document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>=9){
    songIndex = 0
  }
  else
  {
    songIndex+=1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-solid-fa-circle-play');
  masterPlay.classList.add('fa-solid-fa-circle-pause');

})

document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex<0){
    songIndex = 0
  }
  else
  {
    songIndex-=1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-solid-fa-circle-play');
  masterPlay.classList.add('fa-solid-fa-circle-pause');

})
