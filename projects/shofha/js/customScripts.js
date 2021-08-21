$(window).on("load",function(){
    $(".nav-container").mCustomScrollbar({
        scrollButtons:true,
        theme:"light-thin"
    });
});
//----------------------------------------------------------


$(document).ready(function(){
//------------searchbox---------------------------------------
    $('.openSearch, .closeBtn').on('click', function () {
        var container  = $(this).closest('.searchBox');
        if(!container.hasClass("input")){
            container.addClass("input");
            evt.preventDefault();
        }
        else if(container.hasClass('input') && $(this).closest('.inputBox').length == 0){
            container.removeClass("input");
        }
    })


//----------------------------------------------------------
//------------go store--------------------------------------
    $('.go-store .close-me').on('click', function () {
        $('.go-store').removeClass('show');
        $('.go-store').siblings('header').css('top', 0)
        $('.go-store').siblings('main').css('top', 0)
        $('.go-store').siblings('main').css('padding-bottom', '')
    })
    var goStoreHeight = $('.go-store').height();
    $('.go-store').siblings('header').css('top', goStoreHeight)
    $('.go-store').siblings('main').css('top', goStoreHeight)
    $('.go-store').siblings('main').css('padding-bottom', goStoreHeight)


//----------------------------------------------------------
//------------popover---------------------------------------
    $('.fav-popover').each(function () {
        $(this).on('click',function () {
            event.preventDefault();
            $(this).find('button').toggleClass('bordered');
            $(this).find('.fa-heart').toggleClass('solid');

            $(this).find('span').text(function(i, text){
                return text === "Added To My List" ? "Add to My List" : "Added To My List";
            })
        })
    });
    $('.bordered').on('click',function () {
        $(this).find('.far').toggleClass('solid');
    })


//----------------------------------------------------------
//------------active collapse-------------------------------
    $(".collapse").on('show.bs.collapse', function (e) {
        if ($(this).is(e.target)) {
            $(this).closest('.card').addClass('active-card');
            $(this).closest('.card').siblings('.card').removeClass('active-card')
        }
    });
    $(".collapse").on('hide.bs.collapse', function (e) {
        if ($(this).is(e.target)) {
            $(this).closest('.card').removeClass('active-card');
        }
    });


//----------------------------------------------------------
//------------form label----------------------------------
    $('.form-control, .textarea').focus(function(){
        $(this).parent().find("label").addClass('label-active');
    });

    $(".form-control,.textarea").focusout(function(){
        if ($(this).val() == '') {
            $(this).parent().find("label").removeClass('label-active');
        };
    });

    $('.action button').on('click', function () {
        $('.action button').toggleClass('show')
    })


//----------------------------------------------------------
//------------poster hover----------------------------------
    if ("ontouchstart" in document.documentElement)
    {
    }
    else
    {
        //$('.owl-carousel .owl-stage-outer').css('overflow', 'visible')
        $(function(event) {
            $('.poster').each(function () {
                // $(this).click(function () {
                //     return false;
                // });

                $(this).mouseover(hoverVideo);

                function hoverVideo(e) {
                    var timer;
                    var PositionItem = $(this).offset();
                    $('.item-preview').offset(PositionItem);

                    var videoSrc = $(this).attr('data-video-src');
                    var videoType = $(this).attr('data-video-type');

                    var vidName = $(this).find('.vid-name').text();
                    var vidYear = $(this).find('.vid-year').text();
                    var vidDur  = $(this).find('.vid-dur').text();
                    var vidCat  = $(this).find('.vid-cat').text();
                    var vidAge = $(this).find('.vid-age').text();

                    var video = document.getElementById('trailer');
                    var source = document.getElementById('videoSrc');
                    source.setAttribute('src', videoSrc);
                    source.setAttribute('type', videoType);
                    if (video.hasChildNodes()) {
                        video.removeChild(video.childNodes[0]);
                    }
                    video.appendChild(source);
                    $('#trailer')[0].load();

                    timer = setTimeout(function () {
                        $('.item-preview').addClass('show');
                    }, 1500);

                    $(this).mouseleave(function () {
                        window.clearTimeout(timer);
                    });

                    $('.video-info').find('h3').text(vidName);
                    $('.video-info').find('span:first-of-type').text(vidYear+' , '+vidDur);
                    $('.video-info').find('span:last-of-type').text(vidCat);
                    $('.video-info').find('small').text(vidAge);
                }
            });


            $('.item-preview').on('mouseleave', function () {
                $('.item-preview').removeClass('show');
            });
            $(window).scroll(function () {
                $('.item-preview').removeClass('show');
            })
        })
    }


//-----------------------------------------------------------------
//------------play video section (homepage-logged)-----------------
    $('#play').on('click',function () {
        $(this).parent().find('video').get(0).play()
        $(this).hide()
    })


//-----------------------------------------------------------------
//--------main carousel click on small mobile (homepage-logged)----
    if($(window).width() < 400)
    {
        $('.intro .carousel-item').each(function () {
            var playBtn = $(this).find('a').attr('href');
            $(this).on('click', function () {
                window.location.href = playBtn;
            })
        })
    }


//-----------------------------------------------------------------
//---------ways to watch tabs width--------------------------------
    var tabsCount= $('.ways-to-watch').children('li').length;
    $('.ways-to-watch li').css('width', 'calc(100% / '+tabsCount+ ')')


//-----------------------------------------------------------------
//------------------feedback wizard--------------------------------
    $('.rating input').on('change', function () {
        $('#wizardNext').prop("disabled", false)
    })

    $('#wizardNext').on('click', function () {
        $('.feedback-form form').addClass('step-2')
    })

    $('#feedbackForm').on('hidden.bs.modal', function (event) {
        $('.feedback-form form').removeClass('step-2')
    })

    $('.feedback-remove').on('click', function () {
        $(this).parent().hide()
    })


//-----------------------------------------------------------------
//------------------payment method switcher------------------------
    function showForm() {
        var checked = $('input[name="switcher"]:checked');
        var target = checked.attr('id');
        //$('form.formIn').removeClass('formIn');
        $('form[data-type="' + target + '"]').slideDown();
        $('form[data-type="' + target + '"]').siblings('form').slideUp();
    }
    showForm();
    $('input[name="switcher"]').on('change', function(){
        showForm();
    });

})




