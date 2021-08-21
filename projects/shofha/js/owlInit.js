//------------owl carousel----------------------------------
$('.ranked-carousel').owlCarousel({
    //rtl: true,
    dots:false,
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{items:3},
        600:{items:3},
        992:{items:4},
        1200:{items:5},
        1400:{items:6}
    }
})

var owl = $('.animated-carousel');
owl.owlCarousel({
    //rtl: true,
    dots:false,
    loop:true,
    margin:20,
    nav:true,
    //autoplay: true,
    // autoplaySpeed: 3000,
    // autoplayTimeout:0,
    // autoplayHoverPause:false,
    responsiveClass:true,
    responsive:{
        0:{items:3, nav:false},
        768:{items:3},
        992:{items:4},
        1000:{items:5}
    }
})

$( ".owl-prev").html('<i class="fa fa-chevron-left"></i>');
$( ".owl-next").html('<i class="fa fa-chevron-right"></i>');