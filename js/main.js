$(document).ready(function($) {

	"use strict";

	$(window).stellar({
    responsive: false,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
	});

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function() {
		$('.carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			stagePadding: 5,
			nav: false,
			navText: ['<span class="icon-chevron-left">', '<span class="icon-chevron-right">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});


		$('.loop-block-hero').owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			items: 1,
			autoplay: true,
			stagePadding: 0,
			nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
			animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
		});

	};
	carousel();

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 50) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 50) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 250 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 250 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.ftco-number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();
	
	

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();

});

var toggleHide = function() {
	var a = document.getElementById("filter1");
	var b = document.getElementById("filter2");
	var c = document.getElementById("filter3");
	var d = document.getElementById("filter4");
	var e = document.getElementById("filter5");
	var f = document.getElementById("filter6");
	var x = document.getElementById("sort");
	var y = document.getElementById("show-filters");
	var z = document.getElementById("hide-filters");
	if (y.style.display === "none") {
			a.style.display = "none";
			b.style.display = "none";
			c.style.display = "none";
			d.style.display = "none";
			e.style.display = "none";
			f.style.display = "none";
			x.style.display = "none";
			y.style.display = "block";
			z.style.display = "none";
	} else {
			a.style.display = "block";
			b.style.display = "block";
			c.style.display = "block";
			d.style.display = "block";
			e.style.display = "block";
			f.style.display = "block";
			x.style.display = "block";
			y.style.display = "none";
			z.style.display = "block";
	}
}

var toggleView = function(toggle) {
	var a = document.getElementById("bench-option");
	var b = document.getElementById("skills-option");
	var c = document.getElementById("global-bench");
	var d = document.getElementById("global-skills");
	if (toggle === "bench") {
		a.classList.add("active");
		b.classList.remove("active");
		c.classList.add("show");
		d.classList.remove("show");
	} else {
		a.classList.remove("active");
		b.classList.add("active");
		c.classList.remove("show");
		d.classList.add("show");
	}
}

Date.daysBetween = function( date1, date2 ) {   
	//Get 1 year in milliseconds   
	var one_year=1000*60*60*24*365;    
	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();   
	var date2_ms = date2.getTime();    
	// Calculate the difference in milliseconds  
	var difference_ms = date2_ms - date1_ms;        
	// Convert back to years
	var diff = Math.floor(difference_ms/one_year);
	return diff; 
	}

var getParams = function() {
	var params = {},
			pairs = document.URL.split('?')
						.pop()
						.split('&');

	for (var i = 0, p; i < pairs.length; i++) {
				p = pairs[i].split('=');
				params[ p[0] ] =  p[1];
	}     

	return params;
}
