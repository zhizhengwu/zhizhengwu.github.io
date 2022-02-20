$(function () {
    var myAudio = document.createElement('audio');
    myAudio.onended = function () {
        $('a.audio').each(function (index, item) {
            $(item).html('<img class="imgButton" src="/Content/play.png" />');
        });
    };
    if (!myAudio.canPlayType('audio/wav')) {
        // Replace by download text
        $('audio').each(function (index, item) {
            $(item).replaceWith('<a href="' + item.src + '" target="_blank"><img class="imgButton" src="/Content/play.png" /></a>');
        });
    } else {
        // Add by play button
        $('audio').each(function (index, item) {
            $(item).replaceWith('<a class="audio" href="' + item.src + '" target="_blank"><img class="imgButton" src="/Content/play.png" /></a>');
        });

        $('a.audio').click(function (e) {
            e.preventDefault();

            var tag = eval('this');
            var jtag = $(tag);
            console.log(jtag.html());
            if (jtag.html().indexOf("play.png") >= 0) {
                $('a.audio').each(function (index, item) {
                    $(item).html('<img class="imgButton" src="/Content/play.png" />');
                });
                jtag.html('<img class="imgButton" src="/Content/stop.png" />');

                myAudio.src = tag.href;
                myAudio.play();
            } else {
                jtag.html('<img class="imgButton" src="/Content/play.png" />');
                myAudio.pause();
            }
        });
    }
});
//# sourceMappingURL=audiobutton.js.map
