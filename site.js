// Makes the email links clickable at load time so the address never appears in the HTML source,
// which is where address harvesters look. The visible text stays as "name [at] domain".
document.querySelectorAll("a[data-u][data-d]").forEach(function (a) {
  a.href = "mai" + "lto:" + a.dataset.u + "@" + a.dataset.d;
});

// Click-to-play video: the Bilibili player is only loaded when the visitor presses play.
// Without JavaScript the poster is an ordinary link to the video page.
document.querySelectorAll("a.video-poster[data-bvid]").forEach(function (poster) {
  poster.addEventListener("click", function (event) {
    event.preventDefault();
    var frame = document.createElement("iframe");
    frame.src = "https://player.bilibili.com/player.html?isOutside=true&autoplay=1&bvid=" + encodeURIComponent(poster.dataset.bvid);
    frame.title = poster.dataset.title;
    frame.allow = "autoplay; fullscreen; picture-in-picture";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "no-referrer";
    poster.replaceWith(frame);
  });
});
