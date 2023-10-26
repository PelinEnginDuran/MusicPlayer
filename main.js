const shuffleButton=document.getElementById("shuffle")
const backwardButton=document.getElementById("backward")
const playButton=document.getElementById("play")
const pauseButton=document.getElementById("pause")
const forwardButton=document.getElementById("forward")
const repeatButton=document.getElementById("repeat")

const audio=document.getElementById("audio")
const songImage=document.getElementById("song-image")
const songName=document.getElementById("song-name")
const songArtist=document.getElementById("song-artist")

const playlistButton=document.getElementById("playlist")

const maxDuration=document.getElementById("max-duration")
const currentTimeRef=document.getElementById("current-time")

const progressBar=document.getElementById("progress-bar")
const playlistContainer=document.getElementById("playlist-container")
const closeButton=document.getElementById("close-button")
const playlistSongs=document.getElementById("playlist-songs")
const currentProgress=document.getElementById("current-progress")




let index

let loop = true

const songList=[
    {
        name: "Bang Bang",
        link:"contents/Bang Bang My Baby Shot Me Down.mp3",
        artist: "Nancy Sinatra",
        image: "contents/nancy.jpg"
    },
    {
        name: "Ali Cabbar",
        link:"contents/Ali Cabbar.mp3",
        artist: "Emir Can İğrek ",
        image: "contents/download.jpg"
    },
    {
        name: "Jailhouse",
        link:"contents/Elvis Presley - Jailhouse Rock Music Video.mp3",
        artist: "Elvis Presley",
        image: "contents/elvis (1).jpg"
    },
    {
        name: "Paspartu",
        link:"contents/Ezhel - Paspartu Official Audio.mp3",
        artist: "Ezhel",
        image: "contents/ezhel (1).jpg"
    },

]

const timeFormatter =(timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}

const setSong =(arrayIndex) =>{
    let{name, link, artist, image} = songList[arrayIndex]


    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadeddata =() =>{
        maxDuration.innerText = timeFormatter(audio.duration)

    }
    playAudio()
}

const playAudio=() =>{
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
}

const pauseAudio=() =>{
    audio.pause()
    pauseButton.classList.add("hide")
    playButton.classList.remove("hide")
}

const nextSong =() =>{

    if(loop){
        if(index ==(songList.length -1)){
            index=0
        }else{
            index +=1
        }
        setSong(index)
        playAudio()
    } else{
        let randIndex = Math.floor(Math.random() * songList.length)
        setSong(randIndex)
        playAudio()
    }

}

const previousSong =() =>{
    if(index >0){
      pauseAudio()
      index -=1
    } else{
        index =songList.length-1
    }
    setSong(index)
    playAudio()
}


audio.onended =()=>{
    nextSong()
}

progressBar.addEventListener("click", (event)=>{
    let coordStart =progressBar.getBoundingClientRect().left
    let coordEnd = event.clientX
    let progress =(coordEnd - coordStart)/ progressBar.offsetWidth

    currentProgress.style.width =progress * 100 + "%"

    audio.currentTime =progress * audio.duration

  
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")

    

})




playButton.addEventListener("click", playAudio)
pauseButton.addEventListener("click", pauseAudio)
forwardButton.addEventListener("click", nextSong)
backwardButton.addEventListener("click", previousSong)
//progressBar.addEventListener("click", progressBarClicked)
shuffleButton.addEventListener("click", ()=>{
    if (shuffleButton.classList.contains("active")){
        shuffleButton.classList.remove("active")
        loop = true
    } else{
        shuffleButton.classList.add("active")
        loop = false

    }
})

repeatButton.addEventListener("click", ()=> {
    
    if(repeatButton.classList.contains("active")){
        repeatButton.classList.remove("active")
        loop = true

    } else {
        repeatButton.classList.add("active")
        loop = true
    }
})

const initializePlayList=()=>{
    for (const i in songList) {
       playlistSongs.innerHTML += `<li class="playlistSong"
       onclick="setSong(${i})">
       <div class="playlist-image-container">
       <img src="${songList[i].image}"/>
       </div>
       <div class ="playlist-song-details">
       <span id = "playlist-song-name">
       ${songList[i].name} 
       </span>
       <span id = "playlist-song-artist-album">
       ${songList[i].artist}
       </span> 
       </div>
       </li>`
    }
    


}

playlistButton.addEventListener("click",()=>{
    playlistContainer.classList.remove("hide")
})

closeButton.addEventListener("click", ()=>{
    playlistContainer.classList.add("hide")
})

setInterval(() =>{
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width=(audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);

audio.addEventListener("timeupdate", ()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})



window.onload = ()=>{
    index =0
    setSong(index)
    pauseAudio()
    initializePlayList()
}