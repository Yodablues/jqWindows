	(function($) {

    $.fn.jqWindows = function(args) {
		var _init = $.ui.dialog.prototype._init;
		$.ui.dialog.prototype._init = function() {
			_init.apply(this, arguments);
			
			var dialog_element = this;
			var dialog_id = this.uiDialogTitlebar.next().attr('id');
			
			this.uiDialogTitlebar.append('<a href="#" id="' + dialog_id + 
			'-minbutton" class="ui-dialog-titlebar-minimize ui-corner-all">'+
			'<span class="ui-icon ui-icon-minusthick"></span></a>');
			
			$('#dialog_window_minimized_container').append(
				'<div class="dialog_window_minimized ui-widget ui-state-default ui-corner-all" id="' + 
				dialog_id + '_minimized">' + this.uiDialogTitlebar.find('.ui-dialog-title').text() + 
				'<span class="ui-icon ui-icon-newwin"></div>');
				
			$('#' + dialog_id + '-minbutton').hover(function() {
				$(this).addClass('ui-state-hover');
			}, function() {
				$(this).removeClass('ui-state-hover');
			}).click(function() {
				dialog_element.close();
				$('#' + dialog_id + '_minimized').show();
			});
			
			$('#' + dialog_id + '_minimized').click(function() {
				$(this).hide();
				dialog_element.open();
			});
		};
		var options = {
			width: '100%',
			height: 'auto',
			autoOpen : true,
			stack: 'horizontal',
			container: 'window'
		};
		var dimensions = {};		

		$.extend(options, args);
		dimensions = calculateWindowDimensions(options.container)

        return this.each(function(){
        	var containerPos = $(options.container).offset();

			//Contain width to conatiner.
			options.maxWidth = dimensions.width - 10;
			options.maxHeight = dimensions.height;
			options.width = dimensions.width -10;
			// options.position = [containerPos.left + 10, containerPos.top + 10];

			// if (options.autoArrange == 'horizontal'){

			// }

			var new_window = $(this).dialog(options);
    		new_window.parent().draggable({
		        containment: options.container,
		        opacity: 0.70
		    });
			$.each($('.jqWindow'),function(i,v){
			console.log(i)		;
				var numWindows = $('.jqWindow').length;
				var windowDim = {};
				var windowPos = [];

				if (options.stack == 'horizontal'){
					windowDim = {width:$(options.container).outerWidth(),height: ($(options.container).outerHeight()/numWindows)};
					// new_window.parent().outerHeight(windowDim.height);
					new_window.dialog('option','height',(windowDim.height - new_window.prev().outerHeight()));
					if (i == 0){
						windowPos = [0,0];
					}

					new_window.dialog('option','position',windowPos);

				}
				// var containerDim = {width: $(options.container).outerWidth(), height: $(options.container).outerHeight()};

				// options.position = [containerPos.left + 10,containerPos.top + (containerDim.height / numWindows)];

				// options.width = containerDim.width / numWindows;
				// options.height = (containerDim.height + $(this).parent().height()) / numWindows;
				//$(this).parent().height(containerDim.height / numWindows);



				// options.position = []
			});

	    	$(options.container).append(new_window.parent());
	    	$(window).resize(function(e){
	    		console.log(e);
	    		var containerDim = {};
	    		var containerPos = {};
	    		var windowDim = {};
	    		var windowPos = {};

	    		containerDim.width = $(options.container).outerWidth();
	    		containerDim.height = $(options.container).outerHeight();
	    		containerPos = $(options.container).offset();

	    		windowDim.width = new_window.parent().width();
	    		windowDim.height = new_window.parent().height();
	    		windowPos = new_window.parent().offset();
	    		console.log(new_window.parent());

	    		if (containerDim.width < windowDim.width)
	    			new_window.dialog('option','width', containerDim.width);
	    		if (containerDim.height < windowDim.height)
	    			new_window.dialog('option','height', containerDim.height);
	    		if (containerDim.width < (windowDim.width + windowPos.left))
	    			new_window.dialog('option','position', [windowPos.left - 1, windowPos.top]);
	    		if (containerDim.height < (windowDim.height + windowPos.top))
	    			new_window.dialog('option','position', [windowPos.left, windowPos.top - 1]);	    			
    			if(new_window.parent().offset().top < $(options.container).offset().top)	
	    			new_window.dialog('option','position', [windowPos.left, $(options.container).offset().top]);	    			  			
	    		
	    	});
        });
		
		function calculateWindowDimensions(container){
			var dimensions = {};
			dimensions.width = $(container).outerWidth() - 20;
			dimensions.height = $(container).outerHeight() - 20;
			return dimensions;
		}

    }

}(jQuery));