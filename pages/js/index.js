//* Getting DOM Elements.
const URLElement = document.getElementById("URL");

//* When the submit button is clicked
function submitURL() {
    console.log("Hello!");
    let URL = URLElement.value;
    URL = URL.replace("https://www.", "https://")
    if (!URL.includes("https://youtu.be") && !URL.includes("https://youtube.com") && !URL.includes("https://open.spotify.com") && !URL.includes("https://soundcloud.com")) return URLElement.value = "Invalid URL"

    ipcRenderer.send("url", URL);
}