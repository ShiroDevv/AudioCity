import handleYt from "./handlers/handleYT";
import handleSpotify from "./handlers/handleSpotify";
import handleSoundCloud from "./handlers/handleSoundCloud";

export default function differentiator(URL: string) {
    console.log(URL);
    if (URL.includes("youtu.be") || URL.includes("youtube.com")) return handleYt(URL);
    if (URL.includes("open.spotify.com")) return handleSpotify(URL);
    if (URL.includes("soundcloud.com")) return handleSoundCloud(URL);
}