alert("Why hello there! I am a wee bit of JavaScript.");
			var animatePoints = function(){
				var points = document.getElementsByClassName('point');
				var revealPoint = function(index){
					index.style.opacity = 1;
					index.style.transform = "scaleX(1) translateY(0)";
					index.style.msTransform = "scaleX(1) translateY(0)";
					index.style.WebkitTransform = "scaleX(1) translateY(0)";
					}
				forEach(points, revealPoint);
				
			};
			animatePoints();
			