// Makes the email links clickable at load time so the address never appears in the HTML source,
// which is where address harvesters look. The visible text stays as "name [at] domain".
document.querySelectorAll("a[data-u][data-d]").forEach(function (a) {
  a.href = "mai" + "lto:" + a.dataset.u + "@" + a.dataset.d;
  if (a.dataset.subject) a.href += "?subject=" + encodeURIComponent(a.dataset.subject);
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

// English / 中文 switch. English is the default; the choice is remembered on this device,
// and adding ?lang=zh to any page address opens it in Chinese.
(function () {
  var root = document.documentElement;
  var titleEn = root.dataset.titleEn || document.title;
  function apply(lang) {
    var zh = lang === "zh";
    root.classList.toggle("zh", zh);
    root.lang = zh ? "zh-Hans" : "en";
    document.title = zh && root.dataset.titleZh ? root.dataset.titleZh : titleEn;
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
  }
  document.querySelectorAll(".lang-switch button").forEach(function (b) {
    b.addEventListener("click", function () {
      try { localStorage.setItem("lang", b.dataset.lang); } catch (e) {}
      apply(b.dataset.lang);
    });
  });
  apply(root.classList.contains("zh") ? "zh" : "en");
})();
