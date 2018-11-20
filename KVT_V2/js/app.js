

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

function followMouse() {
    var mouseX = 0, mouseY = 0;

    $(document).mousemove(function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY; 
    });

    // cache the selector
    var follower = $("#follower");
    var xp = 0, yp = 0;

    var loop = setInterval(function() {
        // change 12 to alter damping, higher is slower
        xp += (mouseX - xp) / 12;
        yp += (mouseY - yp) / 12;
        follower.css({left:xp, top:yp});
    }, 30);
}

function setTextType() {
    var ele = $('#typewriter-text');

    for (let i = 0; i < ele.length; i++) {
        var period = ele[i].getAttribute('#data-period');
        new TxtType(ele[i], strSet, period);
    }
}

function handleMenuOpenClick() {
    $('#main-nav').on('click', function() {
        $('#main-nav').animate({width: '0%'}, 500);
        $('#menu-overlay').width('100%');
    });
}

function handleMenuCloseClick() {
    $('#close-menu-overlay').on('click', function() {
        toggleMenu();
    });
}

function toggleMenu() {
    $('#main-nav').animate({width: '50vw'}, 3000);
    $('#menu-overlay').width(0);
}

function handleMenuOverlayClick() {
    $('a[href*="#"]').on('click', function() {
        toggleMenu();

        var target = this.hash, $target = $(target);

        $('html, body').stop().animate(
            {'scrollTop': $target.offset().top-70}, 1200, 'swing', function() {
                window.location.hash = target;
            }
        );
    });
}




function renderBlogPosts() {
    let max = blogPosts.length;

    let r = Math.floor((Math.random() * max) + 0);

    $('#blog-section').html(
        `
        <h3 class="blog-date">${blogPosts[r].date} | ${blogPosts[r].time}</h3>
        <h4 class="blog-title">${blogPosts[r].title}</h4>
        <p class="p-indented">${blogPosts[r].post}</p>
        <p class="blog-link-p"><a class="blog-link" href="blog.html">Read More</a></p>
        `
    );
}




function handleBackToTopClick() {
    var offset = 220;
    var duration = 1500;

    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
}


function startApp() {
    followMouse();
    setTextType();
    handleMenuOpenClick();
    handleMenuCloseClick();
    handleMenuOverlayClick();
    renderBlogPosts();
    handleBackToTopClick();
}

$(startApp);