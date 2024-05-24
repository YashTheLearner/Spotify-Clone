// async function getSongs() {
//     let a = await fetch("https://github.com/YashTheLearner/Spotify-Clone/tree/main/Songs", { mode: 'no-cors' });
//     let response = await a.text();
//     console.log(response);
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");
//     let songs = [];
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href)
//         }
//     }
//     console.log(songs)
//     return songs;
// }
async function getSongs() {
    let response = await fetch("https://api.github.com/repos/YashTheLearner/Spotify-Clone/contents/Songs");
    let data = await response.json();
    let songs = data
        .filter(item => item.type === 'file' && item.name.endsWith('.mp3'))
        .map(item => item.download_url);
    console.log(songs);
    return songs;
}


// async function getTs() {
//     let a = await fetch("/ts/");
//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");
//     let ts = [];
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             ts.push(element.href)
//         }
//     }
//     console.log(ts)
//     return ts;
// }

async function getTs() {
    let response = await fetch("https://api.github.com/repos/YashTheLearner/Spotify-Clone/contents/ts");
    let data = await response.json();
    let ts = data
        .filter(item => item.type === 'file' && item.name.endsWith('.mp3'))
        .map(item => item.download_url);
    console.log(ts);
    return ts;
}


async function getCover() {
    let a = await fetch("/songs-cover/");
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songsCover = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".jpg")) {
            songsCover.push(element.href)
        }
    }
    // console.log(songsCover)
    return songsCover;
}

let currSong = new Audio()
const playMusic = (track) => {
    document.querySelector(".sng-name-l").innerHTML = track;
    document.querySelector(".cardr-txt").innerHTML = track;
    // console.log(track)
    songName = track.replace("mp3", "jpg").replaceAll(" ", "\\ ")
    console.log(songName)
    document.querySelector(".cardr-logo").style.backgroundImage = `url("songs-cover/${songName}.jpg")`
    document.querySelector(".sng-logo-l").style.backgroundImage = `url("songs-cover/${songName}.jpg")`
    track.replace("$", "%24")
    if(track.startsWith("T")){
        track = "/ts/" + track + ".mp3"
    }
    else{
        track = "/songs/" + track + ".mp3"
    }
    
    console.log(track);
    currSong.src = track;
    document.querySelector(".play").style.backgroundImage = `url("images/pause.svg")`
    currSong.play();
}

let ham = document.querySelector(".ham")
ham.addEventListener("click",()=>{
    document.querySelector(".left").style.left = 0;
})

let close = document.querySelector(".close")
close.addEventListener("click",()=>{
    document.querySelector(".left").style.left = "-200%";
})

function militosec(seconds) { // Adjusted function to work with seconds directly
    let totalSeconds = Math.floor(seconds);

    let minutes = Math.floor(totalSeconds / 60);
    let remainingSeconds = totalSeconds % 60;

    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

(
    async function () {
        let songs = await getSongs();
        // console.log(songs)
        let cover = await getCover();
        let tarr = await getTs();
        // console.log(Taylor)
        // console.log(cover[0])

        // document.querySelector(".prev").addEventListener("click",()=>{
        //     currSong.pause();
        //     let index = songs.indexOf(currSong.src.split("/").slice(-1)[0])
        //     console.log(index, currSong.src.split("/") )
        // console.log(index, currSong.src.split("/").slice(-1)[0] )
        // })


        currSong = new Audio(songs[1]);

        let sngs = document.querySelector(".songs")

        let i = 1;
        function krsna() {

            for (const song of songs) {
                let songName = song.split("/Songs/")[1];
                songName = decodeURIComponent(songName);
                // console.log(songName)
                sngs.innerHTML = sngs.innerHTML + `<div class="song" >
            <div class="sng-info">
                <div class="sng-logo border" id="art${i}"></div>
                <div class="sng-name">${songName.replace(".mp3", "")}</div>
            </div><div class="lib-play"></div>`;
                songName = songName.replace("mp3", "jpg").replaceAll(" ", "\\ ")
                // console.log(songName)
                let url = document.querySelector(`#art${i}`);
                url.style.backgroundImage = `url("songs-cover/${songName}")`
                i++;
            }
            i=1;
        }
        function taylor() {

            for (const t of tarr) {
                let songName = t.split("/ts/")[1];
                songName = decodeURIComponent(songName);
                // console.log(songName)
                sngs.innerHTML = sngs.innerHTML + `<div class="song" >
            <div class="sng-info">
                <div class="sng-logo border" id="art${i}"></div>
                <div class="sng-name">${songName.replace(".mp3", "")}</div>
            </div><div class="lib-play"></div>`;
                songName = songName.replace("mp3", "jpg").replaceAll(" ", "\\ ")
                // console.log(songName)
                let url = document.querySelector(`#art${i}`);
                url.style.backgroundImage = `url("songs-cover/${songName}")`
                i++;
            }
            i=1;
        }


        let select =()=>{
        Array.from(document.querySelector(".songs").getElementsByClassName("song")).forEach(e => {
            e.addEventListener("click", () => {
                track = e.firstElementChild.lastElementChild.innerHTML;
                // if(song.firstElementChild.lastElementChild.innerHTML==track)
                console.log(e)
                playMusic(track)
                document.querySelector(".circle").style.left = "0%";
                document.querySelector(".info").firstElementChild.lastElementChild.innerHTML = track;
            })
        });
    }


        //    Play - Pause
        document.querySelector(".play").addEventListener("click", () => {
            let logo = document.querySelector(".play")
            if (currSong.paused) {
                currSong.play();
                logo.style.backgroundImage = `url("images/pause.svg")`
            }
            else {
                currSong.pause();
                logo.style.backgroundImage = `url("images/play.svg")`
            }
        })


        currSong.addEventListener("timeupdate", () => {
            let currTime = militosec(currSong.currentTime);
            document.querySelector(".currTime").innerText = currTime;
            let Duration = militosec(currSong.duration);
            document.querySelector(".totalTime").innerText = Duration;
            document.querySelector(".circle").style.left = (currSong.currentTime/currSong.duration)*100 + "%";
        })

        document.querySelector(".loop").addEventListener("click",()=>{
            currSong.addEventListener("ended",()=>{

                currSong.play();
                document.querySelector(".circle").style.left = "0%";
            }) 

        })


        document.querySelector(".seekbar-h").addEventListener("click", e => {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            // console.log(percent)
            document.querySelector(".circle").style.left = percent + "%";
            currSong.currentTime = ((currSong.duration) * percent) / 100
        })
        currSong.volume = 0.5
        document.querySelector(".m-bar-h").addEventListener("click", e => {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            console.log(percent)
            document.querySelector(".m-c").style.left = percent + "%";
            // console.log(percent);
            currSong.volume = percent / 100;
        })
        percent = currSong.volume;
        document.querySelector(".m-icn").addEventListener("click", () => {
            let logo = document.querySelector(".m-icn")

            if (currSong.muted) {
                currSong.muted = false;
                // console.log(currSong.volume)
                let a = currSong.volume * 100
                document.querySelector(".m-c").style.left = a + "%";
                logo.style.backgroundImage = `url("images/unmute1.svg")`
            }
            else {
                currSong.muted = true;
                document.querySelector(".m-c").style.left = "0%";
                logo.style.backgroundImage = `url("images/mute.svg")`
            }
        })

        document.querySelector(".i1").addEventListener("click", () => {
            document.querySelector(".songs").innerHTML = "";
                krsna();
                document.querySelector(".left").style.left = 0;
                select();
            
        }
        )
        document.querySelector(".i2").addEventListener("click", () => {
            document.querySelector(".songs").innerHTML = "";
            taylor();
            document.querySelector(".left").style.left = 0;
            select();
        }
        )





















    }
)()
