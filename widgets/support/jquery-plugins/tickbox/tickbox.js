// Image Tick Box
// replace a checkbox with a image version without losing the functionality
// License: http://www.gnu.org/licenses/lgpl.txt
// Homepage: http://blog.leenix.co.uk/2009/10/jquery-plugin-imagetickbox-change-any.html
// Version 1.00

jQuery.fn.imageTickBox = function(options) {

	//Default text to change submit button too
	var settings = jQuery.extend({
		tickedImage: null,
		unTickedImage: null,
		imageClass: null
	}, options);

	//preload images
	jQuery("<img>").attr("src", settings.tickedImage);
	jQuery("<img>").attr("src", settings.unTickedImage);

	var imageTickBoxUnquieId = 0;

	jQuery(this).each( function () {
		imageTickBoxUnquieId++;
		
		if(jQuery(this).attr("checked")) { var imageURL = settings.tickedImage;	} else { var imageURL = settings.unTickedImage;	}
		
		jQuery(this).hide().before("<img id='tickboxImage"+imageTickBoxUnquieId+"' src='"+imageURL+"' class='"+settings.imageClass+"'>");
		
		jQuery("#tickboxImage"+imageTickBoxUnquieId).click(function() {			

			if(jQuery(this).next().attr("checked")) {
				// is ticked, so untick
				jQuery(this).attr("src", settings.unTickedImage);
				jQuery(this).next().removeAttr("checked");
			}
			else
			{
				// is not ticked, so tick
				jQuery(this).attr("src", settings.tickedImage);
				jQuery(this).next().attr("checked", "checked");
				
			}
			
			return false;
		});		
	});
};