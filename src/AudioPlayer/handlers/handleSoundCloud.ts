import { player } from "../../index";

export default function handleSoundCloud(URL: string) {
    player.register_song(URL);
}