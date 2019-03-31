var main = $(".main");
var vHeight;
var isScrolling = false;
var isDotScrolling = false;
var scrollY = 0;
var lastScrollY = 0;
var page = 0;
var sunY = $(".sun").offset().top;
var cloudLeftY = $(".cloud-btn--left").offset().top;
var cloudRightY = $(".cloud-btn--right").offset().top;
//var video = document.getElementById('brewerton-mp4'); #novideo
var videoPage = 1;

$(document).ready(function() {
    
//    vHeight = $(".second").offset().top;
     vHeight = $(window).height();
//    video.load(); #novideo
    
    var scrollIntervalID = setInterval(animate, 10);
    
    $(".main").scroll(function() {
        checkScroll();
//        parallax($(".tree-background"), 1, 0);
//        parallax($(".sun"), 0.5, sunY);
     });
    
});

$(window).on('resize', function() {
     vHeight = $(window).height();
});

function animate() {
//    window.requestAnimationFrame(parallaxFixed($(".tree-background"), 0.3));
    parallaxFixed($(".tree-background"), 0.3, 0);
    parallaxFixed($(".sun"), 0.05, sunY);
//    parallaxFixed($(".cloud-btn--left"), 0.3, cloudLeftY);
//    parallaxFixed($(".cloud-btn--right"), 0.3, cloudRightY);
}

function parallaxFixed($el, amount, offset) {
    var yPos = $(".main").scrollTop();
    var newPos = -yPos*amount + offset;
    $el.css('top', newPos);
}

/*function parallaxAbsolute() {
    var yPos = $(".main").scrollTop();
    var newPos = yPos*0.8;
    $el.css('top', newPos);
}*/

function checkScroll() {
    if(!isScrolling && !isDotScrolling) {
            isScrolling = true;
            scrollY = main.scrollTop();
//            alert(scrollY + " " + lastScrollY);
            if(scrollY > lastScrollY) { // scroll down
                scrollDown();
            }
            else if(scrollY < lastScrollY) { // scroll up
                scrollUp();
            }
        }
}

function scrollDown() {
    page++;
    scrollToPage(page);
}

function scrollUp() {
    page--;
    scrollToPage(page);
}

function scrollToPage(thePage) {
    if(!isDotScrolling) {
        page = thePage;
        isDotScrolling = true; // needed for dots which calls this function directly
        $(".dot").removeClass("dot--current");
        var dotNum = page + 1;
        $(".nav-dots ul li:nth-child(" + dotNum + ") .dot").addClass("dot--current");

        var newYPos = Math.round(vHeight * page);
    //    alert(main.scrollTop() + "  to   " + newYPos + " (" + page + ")");
//        prepareBrewertonAnimation();

        main.animate({
            scrollTop: newYPos
        }, 900, function() {
            pageLanded(page);
            setTimeout(function() {
                isDotScrolling = false;
                isScrolling = false;
            }, 50);
        });
        lastScrollY = newYPos;
    }
}

function getDist() {
    return Math.abs($(".main").scrollTop());
}

function pageLanded(page) {
//    if(page == videoPage-1) {
//        resetVideo(); #novideo
//        setTimeout(function() {
//            $(".about-1").addClass("fadeUp");
//        }, 0);
//        setTimeout(function() {
//            $(".about-2").addClass("fadeUp");
//        }, 1000);
//    }
//    if(page == videoPage+1) { #novideo
//        resetVideo();
//    }
    if(page == 1) {
        $(".mission-title").addClass("fadeIn");
        $(".mission--1").addClass("fadeIn");
        setTimeout(function() { $(".mission-goals").addClass("fadeIn"); }, 700);
        setTimeout(function() { $(".mission-link").addClass("fadeIn"); }, 1400);
    }
    if(page == 9) {
        $(".team").addClass("fadeIn");
//        setTimeout(function() { $(".mission").addClass("fadeIn"); }, 700);
    }
}

function prepareBrewertonAnimation() {
    if(page == videoPage) {
        setTimeout(function() {
            video.play();
        }, 500);
    }
}

function resetVideo() {
    video.pause();
    video.currentTime = 0;
    video.load();
}