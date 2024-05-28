console.log("Spotify Clone made by Yash")

//         Function to fetch song locally

// async function getTs() {
//     let a = await fetch(`/${folderName}/`);
//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");
//     let songs = [];
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             ts.push(element.href)
//         }
//     }
//     console.log(songs)
//     return ts;
// }


//      functions to fetch song from github   
async function getSongs() {
    let response = await fetch("https://api.github.com/repos/YashTheLearner/Spotify-Clone/contents/Songs");
    let data = await response.json();
    let songs = data
        .filter(item => item.type === 'file' && item.name.endsWith('.mp3'))
        .map(item => item.download_url);
    // console.log(songs);
    return songs;
}

async function getTs() {
    let response = await fetch("https://api.github.com/repos/YashTheLearner/Spotify-Clone/contents/ts");
    let data = await response.json();
    let ts = data
        .filter(item => item.type === 'file' && item.name.endsWith('.mp3'))
        .map(item => item.download_url);
    // console.log(ts);
    return ts;
}

//      function to get song cover
async function getCover() {
    let a = await fetch("/songs-cover/");
    let response = await a.text();
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

// for responsive design
let ham = document.querySelector(".ham")
ham.addEventListener("click", () => {
    document.querySelector(".left").style.left = 0;
})

let close = document.querySelector(".close")
close.addEventListener("click", () => {
    document.querySelector(".left").style.left = "-200%";
})


//    function to format the time to 00:00 format   
function militosec(seconds) { // Adjusted function to work with seconds directly
    let totalSeconds = Math.floor(seconds);

    let minutes = Math.floor(totalSeconds / 60);
    let remainingSeconds = totalSeconds % 60;

    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

//     updates the Song Info
function updateSongInfo(track, songName) {
    document.querySelector(".sng-name-l").innerHTML = track;
    document.querySelector(".cardr-txt").innerHTML = track;
    document.querySelector(".cardr-logo").style.backgroundImage = `url("songs-cover/${songName}.jpg")`
    document.querySelector(".sng-logo-l").style.backgroundImage = `url("songs-cover/${songName}.jpg")`
}
let sel;
    let nsel = 0;
//  plays the song
let currSong = new Audio()
const playMusic = (track) => {
    // console.log("track", track)
    songName = track.replace(" ", "\\ ")
    // console.log("songName",songName)

    updateSongInfo(track, songName)

  
    Array.from(document.querySelector(".songs").getElementsByClassName("song")).forEach(e => {

       
        let trackName = e.firstElementChild.lastElementChild.innerText;
        if (nsel == 1) {
            sel.classList.remove("selected");
            nsel = 0;
        }
        if (trackName == track) {
            // console.log("found")
            // console.log(e.firstElementChild.lastElementChild)
            sel = e;
            // console.log(sel);
            sel.classList.add("selected");
            
        }
    });
    nsel = 1;
    track.replace("$", "%24")
    if (track.startsWith("T")) {
        track = "/ts/" + track + ".mp3"
    }
    else {
        track = "/Songs/" + track + ".mp3"
    }
    // console.log("track",track)
    // console.log(track);
    currSong.src = track;
    document.querySelector(".play").style.backgroundImage = `url("images/pause.svg")`


    document.querySelector(".circle").style.left = "0%";

    currSong.play();
}


(
    async function () {
        let songs = await getSongs();
        let cover = await getCover();
        let tarr = await getTs();

        // set sample song //
        currSong = new Audio(songs[1]);

        let sngs = document.querySelector(".songs")


        //   generates the library dynamically
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
            i = 1;
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
            i = 1;
        }

        //   select and plays the selected song from library   

        function selected() {
            Array.from(document.querySelector(".songs").getElementsByClassName("song")).forEach(e => {
                e.addEventListener("click", () => {
                    track = e.firstElementChild.lastElementChild.innerHTML;

                    // console.log(e)
                    playMusic(track)


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

        //     updates current time and duration
        currSong.addEventListener("timeupdate", () => {
            let currTime = militosec(currSong.currentTime);
            document.querySelector(".currTime").innerText = currTime;
            if (!isNaN(currSong.duration)) {

                
                document.querySelector(".seekbar-g").style.width = (currSong.currentTime/currSong.duration)*100 + "%";


                let Duration = militosec(currSong.duration);

                document.querySelector(".totalTime").innerText = Duration;
            } document.querySelector(".circle").style.left = (currSong.currentTime / currSong.duration) * 100 + "%";
        })

        //     loop  function
        let isLooping = false;

function toggleLoop() {
    if (!isLooping) {
        currSong.loop = true; // Enable looping
        document.querySelector(".loop").style.backgroundImage = `url("/images/loop-s.svg")`; // Change background image
    } else {
        currSong.loop = false; // Disable looping
        document.querySelector(".loop").style.backgroundImage = `url("/images/loop.svg")`; // Change background image
    }
    isLooping = !isLooping; // Toggle loop state
}

document.querySelector(".loop").addEventListener("click", toggleLoop);


        //     seekbar
        document.querySelector(".seekbar-h").addEventListener("click", e => {
            // console.log(e)
            // console.log(e.offsetX , e.target.getBoundingClientRect().width , (e.offsetX / e.target.getBoundingClientRect().width) * 100 );
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            // console.log(percent)
            document.querySelector(".circle").style.left = percent + "%";
            currSong.currentTime = ((currSong.duration) * percent) / 100
            document.querySelector(".seekbar-g").style.width = percent + "%";

        })
        currSong.volume = 0.5
        document.querySelector(".m-bar-h").addEventListener("click", e => {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            console.log(percent)
            document.querySelector(".m-c").style.left = percent + "%";
            // console.log(percent);
            document.querySelector(".m-bar-g").style.width = percent + "%";
            currSong.volume = percent / 100;
        })
        percent = currSong.volume;



        //       mute
        document.querySelector(".m-icn").addEventListener("click", () => {
            let logo = document.querySelector(".m-icn")

            if (currSong.muted) {
                currSong.muted = false;
                // console.log(currSong.volume)
                let a = currSong.volume * 100
                document.querySelector(".m-c").style.left = a + "%";
                document.querySelector(".m-bar-g").style.width = a + "%";
                logo.style.backgroundImage = `url("images/unmute1.svg")`
            }
            else {
                currSong.muted = true;
                document.querySelector(".m-c").style.left = "0%";
                document.querySelector(".m-bar-g").style.width = "0%";
                logo.style.backgroundImage = `url("images/mute.svg")`
            }
        })


        //      choose Artist
        document.querySelector(".i1").addEventListener("click", () => {
            document.querySelector(".songs").innerHTML = "";
            krsna();
            document.querySelector(".left").style.left = 0;
            selected();

        }
        )
        document.querySelector(".i2").addEventListener("click", () => {
            document.querySelector(".songs").innerHTML = "";
            taylor();
            document.querySelector(".left").style.left = 0;
            selected();
        }
        )

        console.log(songs)
        console.log(songs.length)
        console.log(tarr)
        //         next and previous
        document.querySelector(".prev").addEventListener("click", () => {
            console.log( typeof currSong.src)
            console.log(currSong.src.replace("https://sunlo.vercel.app","https://raw.githubusercontent.com/YashTheLearner/SunLo/main").replace("$","%24").trim())
            let index;
            if(currSong.src.includes('ts')){
                index = tarr.indexOf(currSong.src.replace("https://sunlo.vercel.app","https://raw.githubusercontent.com/YashTheLearner/SunLo/main").replace("$","%24").trim());
                if (index > 0) {
                    currSong.pause();
                    track = tarr[index + 1]
                    track = track.split("s/")[1].replace(".mp3", "")
                    track = decodeURIComponent(track);
                    playMusic(track)
                }
            }
            else{
                index = songs.indexOf(currSong.src.replace("https://sunlo.vercel.app","https://raw.githubusercontent.com/YashTheLearner/SunLo/main").replace("$","%24").trim());
                if (index > 0) {
                    currSong.pause();
                    track = songs[index - 1]
                    track = track.split("s/")[1].replace(".mp3", "")
                    track = decodeURIComponent(track);
    
                    playMusic(track)
                }
            }
        })
        document.querySelector(".next").addEventListener("click", () => {
           console.log( typeof currSong.src)
            console.log(currSong.src.replace("https://sunlo.vercel.app","https://raw.githubusercontent.com/YashTheLearner/SunLo/main").replace("$","%24").trim())
            let index;
            if(currSong.src.includes('ts')){
                index = tarr.indexOf(currSong.src.replace("https://sunlo.vercel.app","https://raw.githubusercontent.com/YashTheLearner/SunLo/main").replace("$","%24").trim());
                if (index < tarr.length - 1) {
                    currSong.pause();
                    track = tarr[index + 1]
                    track = track.split("s/")[1].replace(".mp3", "")
                    track = decodeURIComponent(track);
                    playMusic(track)
                }
            }
            else{
                index = songs.indexOf(currSong.src.replace("https://sunlo.vercel.app","https://raw.githubusercontent.com/YashTheLearner/SunLo/main").replace("$","%24").trim());
                if (index < songs.length - 1) {
                    currSong.pause();
                    track = songs[index - 1]
                    track = track.split("s/")[1].replace(".mp3", "")
                    track = decodeURIComponent(track);
    
                    playMusic(track)
                }
            }

        })





















    }
)()
