$(function () {
    var $video = $("#videoPlayer");
    var $mute_button = $(".sound-button");
    var $volume_wrapper = $(".volume");
    var $volume_bar = $(".volume-bar");
    var $full_screen_btn = $(".btnFS");

    var $progress_bar = $(".video-progress");
    var $progress = $(".time-bar");
    var $buffer_bar = $(".buffer-bar");
    var $current = $(".current");
    var $duration = $(".duration");



    $('.play').on('click', function () {
        playVid()
    })
    $('.pause').on('click', function () {
        pauseVid()
    })
    function playVid() {
        $video[0].play();
    }
    function pauseVid() {
        $video[0].pause();
    }
    $('.play-pause button').on('click', function() {
        $('.play, .pause').toggle();
    });
    $video[0].onended = function(e) {
        $('.play, .pause').toggle();
    };


    function playVideo() {
        if ($video[0].paused) {
            $video[0].play();
        } else {
            $video[0].pause();
        }
    }

    $video.on('click', function () {
        $('.play, .pause').toggle();
        playVideo()
    })







//----------------------------------------------------------
//----------------------------------------------------------



    function updateVolume(x, vol) {
        if (vol) {
            $percentage = vol * 100;
        } else {
            $position = x - $volume_wrapper.offset().left;
            $percentage = 100 * $position / $volume_wrapper.width();
        }

        if ($percentage > 100) {
            $percentage = 100;
        }
        if ($percentage < 0) {
            $percentage = 0;
        }

        //update volume bar and video volume
        $volume_bar.css("width", $percentage + "%");
        $video[0].volume = $percentage / 100;

        if ($video[0].volume == 0) {
            $mute_button.removeClass("sound-med").addClass("sound-muted");
        } else if ($video[0].volume > 0.5) {
            $mute_button.removeClass("sound-muted").addClass("sound-med");
        } else {
            $mute_button.removeClass("sound-muted").removeClass("sound-med");
        }
    }
    // Volume Drag
    var volumeDrag = false;
    $volume_wrapper.on("mousedown", function(e) {
        volumeDrag = true;
        $video[0].muted = false;
        $mute_button.removeClass("muted");
        updateVolume(e.pageX);
    });

    $(document).on("mouseup", function(e) {
        if (volumeDrag) {
            volumeDrag = false;
            updateVolume(e.pageX);
        }
    });

    $(document).on("mousemove", function(e) {
        if (volumeDrag) {
            updateVolume(e.pageX);
        }
    });
    //quality change
    $('.quality button').click(function (){
        video = $('#videoPlayer');
        //Need access to DOM element for some functionality
        videoDOM = video.get(0);
        curtime = videoDOM.currentTime;  //Get Current Time of Video
        source = video.find("source[label=" + $(this).attr('id') + "]"); //Copy Source

        source.remove();                 //Remove the source from select
        video.prepend(source);           //Prepend source on top of options
        video[0].load();                    //Reload Video
        videoDOM.currentTime = curtime;  //Continue from video's stop
        videoDOM.play();
        console.log(source.attr('label'));
    });

    // Mute video on button click
    $mute_button.click(function() {
        $video[0].muted = !$video[0].muted;
        $(this).toggleClass("sound-muted");
        if ($video[0].muted) {
            $volume_bar.css("width", 0);
        } else {
            $volume_bar.css("width", $video[0].volume * 100 + "%");
        }
    });
    function time_format(seconds) {
        var m = Math.floor(seconds / 60) < 10
            ? "0" + Math.floor(seconds / 60)
            : Math.floor(seconds / 60);
        var s = Math.floor(seconds - m * 60) < 10
            ? "0" + Math.floor(seconds - m * 60)
            : Math.floor(seconds - m * 60);
        return m + ":" + s;
    }

    function startBuffer() {
        $current_buffer = $video[0].buffered.end(0);
        $max_duration = $video[0].duration;
        $perc = 100 * $current_buffer / $max_duration;
        $buffer_bar.css("width", $perc + "%");

        if ($current_buffer < $max_duration) {
            setTimeout(startBuffer, 500);
        }
    }

    function updatebar(x) {
        $position = x - $progress.offset().left;
        $percentage = 100 * $position / $progress_bar.width();
        if ($percentage > 100) {
            $percentage = 100;
        }
        if ($percentage < 0) {
            $percentage = 0;
        }
        $progress.css("width", $percentage + "%");
        $video[0].currentTime = $video[0].duration * $percentage / 100;
    }

    $video.on("loadedmetadata", function() {
        $current.text(time_format(0));
        $duration.text(time_format($video[0].duration));
        updateVolume(0, 0.7);
        setTimeout(startBuffer, 150);
    });


    // Video duration timer
    $video.on("timeupdate", function() {
        $current.text(time_format($video[0].currentTime));
        $duration.text(time_format($video[0].duration));
        // var currentPos = $video[0].currentTime;
        // var maxduration = $video[0].duration;
        var perc = 100 * $video[0].currentTime / $video[0].duration;
        $progress.css("width", perc + "%");
    });
    // VIDEO PROGRESS BAR
    //when video timebar clicked
    var timeDrag = false; /* check for drag event */
    $progress_bar.on("mousedown", function(e) {
        timeDrag = true;
        updatebar(e.pageX);
    });
    $(document).on("mouseup", function(e) {
        if (timeDrag) {
            timeDrag = false;
            updatebar(e.pageX);
        }
    });
    $(document).on("mousemove", function(e) {
        if (timeDrag) {
            updatebar(e.pageX);
        }
    });


    function launchFullscreen() {
        if ($video[0].requestFullscreen) {
            $video[0].requestFullscreen();
        } else if ($video[0].mozRequestFullScreen) {
            $video[0].mozRequestFullScreen();
        } else if ($video[0].webkitRequestFullscreen) {
            $video[0].webkitRequestFullscreen();
        } else if ($video[0].msRequestFullscreen) {
            $video[0].msRequestFullscreen();
        }
    }


    // Full Screen Button
    $full_screen_btn.click(function() {
        launchFullscreen();
    });


    // Forward and backward 10 seconds
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 37:
                event.preventDefault();

                vid_currentTime = $video[0].currentTime;
                $video[0].currentTime = vid_currentTime - 10;
                break;

            case 39:
                event.preventDefault();

                vid_currentTime = $video[0].currentTime;
                $video[0].currentTime = vid_currentTime + 10;
                break;

            case 32:
                event.preventDefault();

                playVideo();
                break;
        }
    };

    $('.backward').on('click', function () {
        vid_currentTime = $video[0].currentTime;
        $video[0].currentTime = vid_currentTime - 10;
    })
    $('.forward').on('click', function () {
        vid_currentTime = $video[0].currentTime;
        $video[0].currentTime = vid_currentTime + 10;
    })
//----------------------------------------------------------

})



$(function () {
    var vid = document.getElementById('videoPlayer');
    vid.load();

    $('#-5').on('click', function() {
        vid.playbackRate = .5
        $(this).addClass('active').siblings().removeClass('active')
    });
    $('#-75').on('click', function() {
        vid.playbackRate = .75
        $(this).addClass('active').siblings().removeClass('active')
    });
    $('#1x').on('click', function() {
        vid.playbackRate = 1
        $(this).addClass('active').siblings().removeClass('active')
    });
    $('#1-5').on('click', function() {
        vid.playbackRate = 1.5
        $(this).addClass('active').siblings().removeClass('active')
    });
    $('#1-75').on('click', function() {
        vid.playbackRate = 1.75
        $(this).addClass('active').siblings().removeClass('active')
    });
    $('#2x').on('click', function() {
        vid.playbackRate = 2
        $(this).addClass('active').siblings().removeClass('active')
    });
})
//----------------------------------------------------------
//----------------------------------------------------------


$('#backBtn').on('click', function () {
    window.history.back();
})


$(function () {
    var justHidden = false;
    var j;

    function hide() {
        $('html').css({
            cursor: 'none'
        });
        justHidden = true;
        setTimeout(function() {
            justHidden = false;
        }, 500);
        $('.video-controls').addClass('hideme')
        $('.vid-caption').addClass('hideme')
    }
    $(document).mousemove(function() {
        if (!justHidden) {
            justHidden = false;
            clearTimeout(j);
            $('html').css({
                cursor: 'default'
            });
            j = setTimeout(hide, 2000);
        }
        $('.video-controls').removeClass('hideme')
        $('.vid-caption').removeClass('hideme')
    });
})
$('.quality-list button').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active')
})


//----------------------------------------------------------
//----------------------------------------------------------
$('#showPlaylist').on('click', function (){
    var fullWidth = $(window).width(),
        playlistWidth = $('.playlist-wrapper').width();

    $(this).toggleClass('show');
    $('.playlist-wrapper').toggleClass('show');
    $('.player').width(fullWidth - playlistWidth).toggleClass('player-s');
})





