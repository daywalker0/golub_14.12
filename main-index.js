$().ready(function () {
    function runScripts() {
        if(!localStorage.getItem('is_adult')){
            $('.adult_checker_js').show();

            $('.adult_form_js').on('submit', function (e) {
                e.preventDefault();
                let day = $('.adult_form_js [name="day"]').val();
                let month = $('.adult_form_js [name="month"]').val();
                let year = $('.adult_form_js [name="year"]').val();
                let toggler = false;

                if(day !== '' || month !== '' || year !== ''){
                    let date = new Date(`${year}-${month}-${day}`);
                    let today = new Date();
                    if(today.getFullYear() - date.getFullYear() > 18){
                        toggler = true;
                    } else if(today.getFullYear() - date.getFullYear() === 18){
                        if(today.getMonth() < date.getMonth()){
                            toggler = true;
                        } else if(today.getMonth() === date.getMonth()){

                            if(today.getDate() >= date.getDate()){
                                toggler = true;
                            }
                        }
                    }
                }
                if(!toggler){
                    $('.adult_checker_alert__js').addClass('zoom');
                    setTimeout(function () {
                        $('.adult_checker_alert__js').removeClass('zoom');
                    }, 500)
                } else {
                    if($('#adult_checker_remember').is(':checked')){
                        localStorage.setItem('is_adult', true)
                    }
                    $('.adult_checker_js').animate({
                        opacity: 0
                    }, 300);
                    setTimeout(function () {
                        $('.adult_checker_js').hide();
                    }, 300);
                }
            });
            $('.adult_form_js [name="day"]').on('input', function () {
                if($(this).val().length === 2){
                    $('.adult_form_js [name="month"]').focus();
                }
            });
            $('.adult_form_js [name="month"]').on('input', function () {
                if($(this).val().length === 2){
                    $('.adult_form_js [name="year"]').focus();
                }
            });
        }

        $('.scrollbar-inner').scrollbar();
        $(window).on('resize', function () {
            $('.scrollbar-inner').scrollbar();
        });

        $(document).on('click', '.menu_toggle__js', function () {
            $('html').toggleClass('menu_opened');
        });
        $('.main_slider_js').not('.slick-initialized').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            autoplaySpeed: 3000,
            pauseOnHover: false
        });

        let videoInterval;

        $('#fullpage').fullpage({
            autoScrolling:true,
            anchors: ['main', 'about_point', 'catalogue_point', 'map_point', 'map_description_point', 'news_point', 'order_point', 'contact_point'],
            scrollHorizontally: true,
            scrollOverflow: true,
            normalScrollElements: '.collection_item_modal, .adult_form_js',
            onLeave: function(origin, destination, direction){
                $('.main_progress_js').css('height', ((destination.index+ 1) / $('.section').length) * 100 + '%');

                if(destination.anchor === "about_point" || destination.anchor === "map_point" || destination.anchor === "map_description_point" || destination.anchor === "news_point"){
                    $('.hide_on_catalog_js').show();
                    $('.hide_on_slider_js').hide();
                    if(destination.anchor === "news_point"){
                        $('.head_logo').hide();
                    } else {
                        $('.head_logo').show();
                    }
                } else if (destination.anchor === "catalogue_point" ) {
                    $('.hide_on_slider_js').show();
                    $('.hide_on_catalog_js').hide();
                    $('.head_logo').show();
                } else {
                    $('.hide_on_slider_js').show();
                    $('.hide_on_catalog_js').show();
                    $('.head_logo').show();
                }
                if(destination.anchor === "about_point" || destination.anchor === "map_description_point"){
                    $(destination.item).find('.main_slider_js').slick('slickPlay');
                }
                if(destination.anchor === "map_point") {
                    $(destination.item).find('video').get(0).play();
                    videoInterval = setInterval(function () {
                        $('.video_screen_js').addClass('video_screen--map');
                        clearInterval(videoInterval);
                    }, 3500);
                } else {
                    $('video').get(0).pause();
                    clearInterval(videoInterval);
                    $('.video_screen_js').removeClass('video_screen--map');
                }
            }
        });
        $(document).on('click', '.scroll_to_js', function (e) {
            e.preventDefault();
            $('.collection_item_modal').removeClass('collection_item_modal--shown');
            $('.head_logo').show();
            let id = $(this).attr('href').slice(1);
            fullpage_api.moveTo(id, 1);
        });
        $(document).on('click', '.show_more__js', function () {
            $(this).prev('p').slideToggle();
            $(this).find('i').toggle();
        });
        $(document).on('click', '.show_team__js', function () {
            $(this).closest('.team_wrap_js').toggleClass('team_opened');
            $(this).closest('.team_item_js').toggleClass('team_active');
            $(this).find('i').toggle();
        });
        function initSliderCollection() {
            $('.collection_slider_js').not('.slick-initialized').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                responsive: [
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                ]
            });
        };
        initSliderCollection();

        $(document).on('click', '.collection_tabs_js a', function (e) {
            e.preventDefault();
            let current = $(this);
            if(current.hasClass('_default_title')){
                return false;
            }
            $('.collection_tabs_js a').removeClass('_default_title');

            current.addClass('_default_title');

            $('.collection_content_js').hide();
            $(current.attr('href')).show();
            $('.collection_slider_js').slick('unslick');
            initSliderCollection();
        });
        $(document).on('click', '.collection_modal_js', function (e) {
            e.preventDefault();
            $($(this).attr('href')).addClass('collection_item_modal--shown');
            $('.head_logo').hide();
        });
        $(document).on('mouseenter', '.collection_modal_js', function (e) {
            if($(this).attr('data-bg')){
                $('.collection_bg_js').css('background-image', 'url('+$(this).attr('data-bg')+')').addClass('collection_bg--visible');
            }
        });
        $(document).on('mouseleave', '.collection_modal_js', function (e) {
            $('.collection_bg_js').removeClass('collection_bg--visible');
        });
        $(document).on('click', '.collection_close_js', function (e) {
            e.preventDefault();
            $('.collection_item_modal').removeClass('collection_item_modal--shown');
            $('.head_logo').show();
        });

        $('.select2').select2({ minimumResultsForSearch: 9});

        function pathPrepare ($el) {
            var lineLength = $el[0].getTotalLength();
            $el.css("stroke-dasharray", lineLength);
            $el.css("stroke-dashoffset", lineLength);
        }

        let line1 = $('#video_line_1'),
            line2 = $('#video_line_2'),
            line3 = $('#video_line_3'),
            line4 = $('#video_line_4');


        // prepare SVG
        pathPrepare(line1);
        pathPrepare(line2);
        pathPrepare(line3);
        pathPrepare(line4);

        // init controller
        var controller = new ScrollMagic.Controller();

        // build tween
        var tween = new TimelineMax()
            .add(TweenMax.to(line1, .8, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
            .add(TweenMax.to(line2, .8, {strokeDashoffset: 0, ease:Linear.easeNone}))  // draw dot for 0.1
            .add(TweenMax.to(line3, .8, {strokeDashoffset: 0, ease:Linear.easeNone}))  // draw dot for 0.1
            .add(TweenMax.to(line4, .8, {strokeDashoffset: 0, ease:Linear.easeNone}))  // draw dot for 0.1
            .add(TweenMax.to("path", 1, {stroke: "#fff", ease:Linear.easeNone}), 0);			// change color during the whole thing

        // build scene
        var scene = new ScrollMagic.Scene({triggerElement: ".video_screen", duration: 200, tweenChanges: true})
            .setTween(tween)
            .addTo(controller);
    }
    let isLoad = false;
    let height = 10, value = 30, vineY = 18;

    let load = setInterval(function () {
        value = value + 5;
        vineY = vineY - 10;
        height = value;
        if(value <= 100) {
            $('.bottle_fill_js').css('transform', 'translateY('+vineY+'px) translateX(-95px)');
            $('.preload_value__js').text(value + '%');
            $('.preload_wave__js').css('height', height + '%');
        } else if (isLoad){
            clearInterval(load);
            $('.preloader_js').animate({opacity: 0}, 500);
            setTimeout(function () {
                $('.preloader_js').hide();
            }, 500);
        }
    }, 300);
    setTimeout(function () {
        $('.load_js').show();
        runScripts();
        isLoad = true;
    }, 1000);



});