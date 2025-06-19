$().ready(function () {
    function runScripts() {
        if(!localStorage.getItem('is_adult')){
            $('.adult_checker_js').show();

            // $('.adult_form_js').on('submit', function (e) {
            //     e.preventDefault();
            //     let day = $('.adult_form_js [name="day"]').val();
            //     let month = $('.adult_form_js [name="month"]').val();
            //     let year = $('.adult_form_js [name="year"]').val();
            //     let toggler = false;
            //
            //     if(day !== '' || month !== '' || year !== ''){
            //         let date = new Date(`${year}-${month}-${day}`);
            //         let today = new Date();
            //         if(today.getFullYear() - date.getFullYear() > 18){
            //             toggler = true;
            //         } else if(today.getFullYear() - date.getFullYear() === 18){
            //             if(today.getMonth() < date.getMonth()){
            //                 toggler = true;
            //             } else if(today.getMonth() === date.getMonth()){
            //
            //                 if(today.getDate() >= date.getDate()){
            //                     toggler = true;
            //                 }
            //             }
            //         }
            //     }
            //     if(!toggler){
            //         $('.adult_checker_alert__js').addClass('zoom');
            //         setTimeout(function () {
            //             $('.adult_checker_alert__js').removeClass('zoom');
            //         }, 500)
            //     } else {
            //         if($('#adult_checker_remember').is(':checked')){
            //             localStorage.setItem('is_adult', true)
            //         }
            //         $('.adult_checker_js').animate({
            //             opacity: 0
            //         }, 300);
            //         setTimeout(function () {
            //             $('.adult_checker_js').hide();
            //         }, 300);
            //     }
            // });
            // $('.adult_form_js [name="day"]').on('input', function () {
            //     if($(this).val().length === 2){
            //         $('.adult_form_js [name="month"]').focus();
            //     }
            // });
            // $('.adult_form_js [name="month"]').on('input', function () {
            //     if($(this).val().length === 2){
            //         $('.adult_form_js [name="year"]').focus();
            //     }
            // });
            $(document).on('click', '.adult_yes_js', function () {
                if($('#adult_checker_remember').is(':checked')){
                    localStorage.setItem('is_adult', true)
                }
                $('.adult_checker_js').animate({
                    opacity: 0
                }, 300);
                setTimeout(function () {
                    $('.adult_checker_js').hide();
                }, 300);
            });
            $(document).on('click', '.adult_no_js', function () {
                $('.adult_checker_alert__js').addClass('zoom');
                setTimeout(function () {
                    $('.adult_checker_alert__js').removeClass('zoom');
                }, 500)
            });
        }

        $('.scrollbar-inner').scrollbar();
        $(window).on('resize', function () {
            $('.scrollbar-inner').scrollbar();
        });

        // Toggle menu bar

        $(document).on('click', '.menu_toggle__js', function () {
            $('html').toggleClass('menu_opened');
        });

        $(document).on('click', '.menu_scroll_wrap', function () {
            $('html').toggleClass('menu_opened');
        });


        let videoInterval;

        let normalscrollElem = !!('ontouchstart' in window) ? '.collection_item_modal, .adult_form_js' : '.main_slider_js, .collection_item_modal, .excurs_modal_js, .adult_form_js';
        $('#fullpage').fullpage({
            autoScrolling:true,
            anchors: ['main', 'about_point', 'catalogue_point', 'video_point','map_point', 'fond_point', 'news_point',  'order_point', 'contact_point', 'feedback'],
            scrollHorizontally: true,
            scrollOverflow: true,
            fitToSectionDelay: 5000,
            normalScrollElements: normalscrollElem,
            onLeave: function(origin, destination, direction){
                // прогресс справа
                $('.main_progress_js').css('height', ((destination.index+ 1) / $('.section').length) * 100 + '%');


                // скрыть \ показать елементы в зависимости от страницы
                if(destination.anchor === "about_point" && !('ontouchstart' in window)){
                    fullpage_api.setAllowScrolling(false, 'down');
                } else {
                    fullpage_api.setAllowScrolling(true);
                }
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
$("body").mousedown();
                // запуск видео
                if(destination.anchor === "video_point") {
                    var video = $(destination.item).find('video').get(0);
                    if (video) video.play();
                    videoInterval = setInterval(function () {
                        fullpage_api.moveTo('map_point', 1);
                        clearInterval(videoInterval);
                    }, 20000);
                } else {
                    var video = $('video').get(0);
                    if (video) video.pause();
                    clearInterval(videoInterval);
                }
            }
        });

        $('.main_slider_excur_js').not('.slick-initialized').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            infinite: false
        });
        $('.main_slider_js').not('.slick-initialized').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            infinite: false
        });


        if(!!('ontouchstart' in window)){
            $('body').addClass('isTouch');
        } else {
            var timeout;
            var onWheelExcurs = function (e) {
                e = e || window.event;

                var delta = e.originalEvent.deltaY || e.originalEvent.detail || e.originalEvent.wheelDelta;

                if(!timeout){
                    var current = $('.main_slider_excur_js').slick('slickCurrentSlide');

                    if(delta < 0 && current === 0){
                        fullpage_api.moveTo('catalogue_point', 1);
                        $('.excurs_modal_js').removeClass('excurs_modal--shown');
                    } else if(delta < 0) {
                        var current = $('.main_slider_excur_js').slick('slickPrev');
                    } else if(delta > 0){
                        var current = $('.main_slider_excur_js').slick('slickNext');
                    }
                    timeout = setTimeout(function () {
                        timeout = null;
                    }, 800)
                }


                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            }
            var onWheel = function (e) {
                e = e || window.event;

                var delta = e.originalEvent.deltaY || e.originalEvent.detail || e.originalEvent.wheelDelta;

                if(!timeout){
                    var current = $('.main_slider_js').slick('slickCurrentSlide');

                    if(delta < 0 && current === 0){
                        fullpage_api.moveTo('main', 1);
                        fullpage_api.setAllowScrolling(true);
                    } else if(delta < 0) {
                        var current = $('.main_slider_js').slick('slickPrev');
                    } else if(delta > 0 && current === 5){
                        fullpage_api.moveTo('catalogue_point', 1);
                        fullpage_api.setAllowScrolling(true);
                    } else if(delta > 0){
                        var current = $('.main_slider_js').slick('slickNext');
                    }
                    timeout = setTimeout(function () {
                        timeout = null;
                    }, 800)
                }


                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            }

            if ('onwheel' in document) {
                $('.main_slider_js').on("wheel", onWheel);
                $('.main_slider_excur_js').on("wheel", onWheelExcurs);
            } else if ('onmousewheel' in document) {
                $('.main_slider_js').on("mousewheel", onWheel);
                $('.main_slider_excur_js').on("mousewheel", onWheelExcurs);
            } else {
                $('.main_slider_js').on("MozMousePixelScroll", onWheel);
                $('.main_slider_excur_js').on("MozMousePixelScroll", onWheelExcurs);
            }
        }






        $(document).on('click', '.excurs_js', function (e) {
            e.preventDefault();
            $('.excurs_modal_js').addClass('excurs_modal--shown');
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



        $(document).on('click', '#next_form_js', function (e) {
            e.preventDefault();

    var selectedVal = "";
    var selected = $("input[type='radio'][name='question_js']:checked");
    if (selected.length > 0) {

        selectedVal = selected.val();

		if(selectedVal>0){
$('.form-question0').hide();
$('.form-question2').show();
		}else{
$('.form-question0').hide();
$('.form-question1').show();
}

    }

        });


});
$(function(){
 //var select = document.getElementById('brend_id');
//var select = $('#brend_id').select2('data')[0].text;
            //select.addEventListener('change', function(){

//$('.select2').on('change', function() {
     // var data = $(".select2 option:selected").text();
      //$("#test").val(data);
    //})

//console.log( select );


$('.brend_id').on('change', function() {

var select_d = $(".brend_id option:selected").text();
var getValue = select_d;
console.log( select_d );
                //var getValue = this.value;

                var sel_1 = '        <select name="tour" id="produkt_id"  class="select2" data-theme="control" data-width="100%" required>\n' +
                    '            <option value="0">Выберете продукт *</option>\n' +
                    '            <option value="Chardonnay">Chardonnay</option>\n' +
                    '            <option value="Riesling">Riesling</option>\n' +
                    '            <option value="Riesling Orange">Riesling Orange</option>\n' +
                    '            <option value="Merlot">Merlot</option>\n' +
                    '            <option value="Cabernet Sauvignon">Cabernet Sauvignon</option>\n' +
                    '            <option value="Rose">Rose</option>\n' +
                    '            <option value="Chardonnay Reserve">Chardonnay Reserve</option>\n' +
                    '            <option value="Pinot Noir Reserve">Pinot Noir Reserve</option>\n' +
                    '            <option value="Merlot Reserve">Merlot Reserve</option>\n' +
                    '            <option value="Cabernet Sauvignon Reserve">Cabernet Sauvignon Reserve</option>\n' +
                    '            <option value="Pinot Noir Rose Noble Selection">Pinot Noir Rose Noble Selection</option>\n' +
                    '        </select>';

                var sel_2 = '        <select name="tour" id="produkt2_id" class="select2" data-theme="control" data-width="100%"  required>\n' +
                    '            <option value="0">Выберете продукт *</option>\n' +
                    '            <option value="Brut">Brut</option>\n' +
                    '            <option value="Blanc de Blancs">Blanc de Blancs</option>\n' +
                    '            <option value="Semi-dry">Semi-dry</option>\n' +
                    '            <option value="Sweet">Sweet</option>\n' +
                    '            <option value="Rose Brut">Rose Brut</option>\n' +
                    '            <option value="Rose Sweet">Rose Sweet</option>\n' +
                    '            <option value="Zero Dosage Extra Brut">Zero Dosage Extra Brut</option>\n' +
                    '            <option value="Brut Reserve">Brut Reserve</option>\n' +
                    '            <option value="Brut 0,375">Brut 0,375</option>\n' +
                    '            <option value="Brut 1,500">Brut 1,500</option>\n' +
                    '        </select>';

                var sel_3 = '        <select name="tour" class="select2" id="sel_prod"  data-theme="control" data-width="100%" required>\n' +
                    '            <option value="0">Выберете продукт *</option>\n' +
                    '        </select>';

                // this в этом контексте - элемент, который запустил фукнцию. То же, что и select.value;
                 if(getValue=='Golubitskoe Estate'){

                     $('#box-sel').html(sel_1);
					$('#produkt_id').select2();
                     console.log( getValue );

                 }else if(getValue=='Tête de Cheval'){
                     $('#box-sel').html(sel_2);
					$('#produkt2_id').select2();
                     console.log( getValue );

                }else{
                     $('#box-sel').html(sel_3);
					$('#sel_prod').select2();
                     console.log( getValue );

                 }

            //});
})
          let inputs = document.querySelectorAll('.input__file');
        Array.prototype.forEach.call(inputs, function (input) {
            let label = document.querySelector('.input__file-button'),
                labelVal = label.querySelector('.input__file-button-text').innerText;

            input.addEventListener('change', function (e) {
                let countFiles = '';
                if (this.files && this.files.length >= 1)
                    countFiles = this.files.length;

                if (countFiles)
                    label.querySelector('.input__file-button-text').innerText = 'Файлов: ' + countFiles;
                else
                    label.querySelector('.input__file-button-text').innerText = labelVal;
            });
        });


        let inputs2 = document.querySelectorAll('.input__file2');
        Array.prototype.forEach.call(inputs2, function (input) {
            let label = document.querySelector('.input__file-button2'),
                labelVal = label.querySelector('.input__file-button-text2').innerText;

            input.addEventListener('change', function (e) {
                let countFiles = '';
                if (this.files && this.files.length >= 1)
                    countFiles = this.files.length;

                if (countFiles)
                    label.querySelector('.input__file-button-text2').innerText = 'Файлов: ' + countFiles;
                else
                    label.querySelector('.input__file-button-text2').innerText = labelVal;
            });
        });
        if ($('.date_mask').length) {
            $(".date_mask").mask("99.99.9999");
        }
});