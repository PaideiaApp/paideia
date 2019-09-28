$(function () {

	// Smooth scroll
	$("a.scrolling").click(function (e) {
		e.preventDefault();
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;
		$("body,html").animate({scrollTop: destination }, 800);
	});

	$('.with_sub_menu a').click(function (e) {
		e.preventDefault();
	});

	$('.with_sub_menu').hover(function () {
		let subWidth = $(this).find('.sub_menu').width();
		$(this).find('.sub_menu').css('width', subWidth);	
	});

	$('.login').click(function () {
		$(function(){
			$('#login_modal').arcticmodal();
		});
	});

	$('.get_started').click(function () {
		$(function(){
			$('#get_started_modal').arcticmodal();
		});
	});

	var mainOfferHeight = $('.main_offer').height();
	//$('.main_offer').css('margin-top', -mainOfferHeight / 2);
	$('.main_offer').css('margin-top', -mainOfferHeight / 2.6);


	var elementImageHeight = $('.element_image').height();
	$('.element_image').css('margin-top', -elementImageHeight / 2);

	var infoFifthTextHeight = $('.info_fifth_text').height();
	$('.info_fifth_text').css('margin-top', -infoFifthTextHeight / 2);

	var ticksWidth = $('.ticks').height();
	$('.ticks').css('margin-left', -ticksWidth / 2);

	var titleText = $('.logo').find('span').text();
	$('.logo_mobile').find('span').text(titleText);

	var titleImage = $('.logo').find('img').attr('src');
	$('.logo_mobile').find('img').attr('src', titleImage);

	$(window).on('resize', function() {
		var mainOfferHeight = $('.main_offer').height();
		$('.main_offer').css('margin-top', -mainOfferHeight / 2);

		$('.element_image').css('margin-top', -elementImageHeight / 2);
		$('.info_fifth_text').css('margin-top', -infoFifthTextHeight / 2);
		$('.ticks').css('margin-left', -ticksWidth / 2);
	});

	$('.bars_wrap').click(function () {
		$('.navigation').toggleClass('navigation_active');
		$('.bars_wrap').toggleClass('menu_bars_active');
		$('.sub_menu').toggleClass('sub_menu_active');

		$('.bars_1').toggleClass('bars_1_active');
		$('.bars_2').toggleClass('bars_2_active');
		$('.bars_3').toggleClass('bars_3_active');
	});

	$(document).click(function() {
		$('.navigation').removeClass('navigation_active');
		$('.bars_wrap').removeClass('menu_bars_active');
		$('.sub_menu').removeClass('sub_menu_active');

		$('.bars_1').removeClass('bars_1_active');
		$('.bars_2').removeClass('bars_2_active');
		$('.bars_3').removeClass('bars_3_active');
	});

	$('.bars_wrap, .navigation, .box-modal').click(function(e) {
		e.stopPropagation();
	});
});
