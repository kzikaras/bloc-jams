var animatePoints = function() {
	var revealPoint = function() {
		// #7
		$(this).css({
			opacity: 1,
			tranform: 'scaleX(1) translateY(0)'
		});
	};
	for(var i=0;i<points.length;i++) {
		revealPoint(i);
	}
	// #6
	$.each($('.point'), revealPoint);

};
			
animatePoints();
			

$(window).load(function() {
	// #1
	if ($(window).height() > 950){
		animatePoints();		
	}
	// #2
	var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
	// #3
	$(window).scroll(function(event) {
		// #4
		if ($(window).scrollTop() >= scrollDistance) {
			animatePoints();
		}	
	});
});		

			