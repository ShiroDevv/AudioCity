//* Importing modules
import stream from "youtube-audio-stream";
const scStream = require("soundcloud-audio"); //* Doesn't have a .d.ts file.
import SpotifyApi from "spotify-audio-api";


//* Creating and exporting the player class
export default class Player {
    //* Creating variables to hold the players info, and other things.
    #spClientID: string;
    #spClientSecret: string;
    #scAPI: any;
    spotify: SpotifyApi;
    stream: typeof stream;
    scPlayer: typeof scStream;

    song: string;
    origin: "yt" | "sc" | "sp" | "";

    paused: boolean = false;
    queue: Array<{
        url: string;
        origin: "yt" | "sc" | "sp" | "";
    }> = [];


    //* Creating the variables definitions, and basic setup
    constructor(spotify_clientID: string, spotify_Secret: string, scID: string | undefined) {
        //* Setting up the APIs info
        this.#spClientID = spotify_clientID;
        this.#spClientSecret = spotify_Secret;
        this.#scAPI = scID;

        //* Creating the players.
        this.spotify = new SpotifyApi(spotify_clientID, spotify_Secret);
        this.stream = stream;
        this.scPlayer = new scStream(null, "https://sc-api-proxy.herokuapp.com");

        //* Keeping track of the current song, and the origin of the song (yt, soundcloud, spotify)
        this.song = "";
        this.origin = "";
    }


    register_song(url: string) {
        let origin: "yt" | "sp" | "sc" | "" = findOriginsQueue(url);

        if (origin === "") return;

        this.queue.push({
            url: url,
            origin: origin
        });

        if (this.queue.length === 1) return this.playSong;
    }

    #findOrigin() {
        if (this.song.includes("youtu.be") || this.song.includes("youtube.com")) return "yt";
        if (this.song.includes("open.spotify.com")) return "sp";
        if (this.song.includes("soundcloud.com")) return "sc";
    }

    playSong() {
        if (this.queue.length === 0) return;
        const songDetails = this.queue[0];

        if (songDetails.origin === "yt") {
            this.queue.shift();
            this.playSong();
            return console.log("In development!");
        }

        if (songDetails.origin === "sc") {
            this.scPlayer.resolve(songDetails.url, (track: any) => {
                this.scPlayer.play();
            })
        }

        if (songDetails.origin === "sp") {
            this.queue.shift();
            this.playSong();
            return console.log("In development!");
        }
    }

    pauseSong() {
        const songDetails = this.queue[0];

        if (songDetails.origin === "sc") return this.scPlayer.pause();
    }
}

function findOriginsQueue(URL: string) {
    if (URL.includes("youtu.be") || URL.includes("youtube.com")) return "yt";
    if (URL.includes("open.spotify.com")) return "sp";
    if (URL.includes("soundcloud.com")) return "sc";
    return "";
}