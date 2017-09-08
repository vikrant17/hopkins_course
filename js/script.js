$(function() {
	$('.navbar-toggler').on('blur', function(event) {
		var sw = window.innerWidth;
		if (sw < 768)
		{
			$(".collapse").collapse('hide');
		}
		});

	$('#main-content').load('home-snippet.html');

	$('.nav-item').on('click', function() {
		$('.nav-item').removeClass('active');
		$(this).addClass('active');
	});

	$('#menu-link').on('click',function() {
		$('#main-content').html("<section class='row' id='menus'></section>");
		$.get("../categories-title-snippet.html", function(template) {
        $('#main-content').prepend(template);
      });

      $.getJSON('https://davids-restaurant.herokuapp.com/categories.json', function(data){
      
        $.get('../category-snippet.html', function(template) {
        
          for (var i = 0; i < data.length; i++) {
            var rendered = Mustache.render(template, {name: data[i].name, short_name: data[i].short_name});
       
            $('#menus').append(rendered);
          }
        });
      });
	});

	$(document).on("click", '#menu-tile-link', function(event) { 
    $('#main-content').html("<section class='row' id='menus'></section>");
		$.get("../categories-title-snippet.html", function(template) {
        $('#main-content').prepend(template);
      });

      $.getJSON('https://davids-restaurant.herokuapp.com/categories.json', function(data){
      
        $.get('../category-snippet.html', function(template) {
         
          for (var i = 0; i < data.length; i++) {
            var rendered = Mustache.render(template, {name: data[i].name, short_name: data[i].short_name});
       
            $('#menus').append(rendered);
          }
        });
      });
	});

	$(document).on('click', '.category-tile',function(event) {
		var el_id = this.id;
		$.getJSON('https://davids-restaurant.herokuapp.com/menu_items.json?category='+el_id, function(data) {
			$('#main-content').html("<section class='row' id='category-menus'></section>");	
			$.get("../single-category-title-snippet.html", function(template) {
				var rendered = Mustache.render(template, {title_name:data.category.name, title_desc:data.category.special_instructions})
        $('#main-content').prepend(rendered);
      });		

			$.get('../single-category-snippet.html', function(template) {
				for (var i = 0; i < data.menu_items.length; i++) {
					var rendered = Mustache.render(template, {name: data.menu_items[i].name, short_name: data.menu_items[i].short_name, description: data.menu_items[i].description, category_id: el_id});
					$('#category-menus').append(rendered);
					
				}
			});

		});
	});

});
