//* Importing modules
import AudioCity from "./Electron/main";
import Player from "./AudioPlayer/player";
import dotenv from "dotenv";

//* Set up and get Environment variables
dotenv.config();
const SPID = process.env.SPID;
const SPSC = process.env.SPSC;
const SOUNCLOUD = process.env.SOUNDCLOUD;

if (!SPID || !SPSC) throw new Error("Missing spotify info");

//* Clear the console.
console.clear();


//* Creating the window
const audioCity = new AudioCity();



//* Exporting the main window class.
export default audioCity;

//* Create and export the player class.
const player = new Player(SPID, SPSC, SOUNCLOUD);

export { player };