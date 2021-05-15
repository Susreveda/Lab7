// script.js

import { router } from "./router.js"; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

//Make sure you register your service worker here too
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/Lab7/sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

var num = 1;

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://cse110lab6.herokuapp.com/entries")
    .then((response) => response.json())
    .then((entries) => {
      entries.forEach((entry) => {
        let newPost = document.createElement("journal-entry");
        newPost.entry = entry;
        document.querySelector("main").appendChild(newPost);

        let numPost = num;
        newPost.addEventListener("click", () => {
          setState(
            { page: "journal", entry: entry, num: numPost },
            numPost,
            false
          );
        });
        num++;
      });
    });
});

var sett = document.querySelector("img");
sett.addEventListener("click", () => {
  setState({ page: "setting" }, 0, false);
});

var topTitle = document.querySelector("header h1");
topTitle.addEventListener("click", () => {
  setState({ page: "home" }, 0, false);
});

window.addEventListener("popstate", (event) => {
  setState(event.state, 0, true);
});
