
(function($) {
	
	/**
	 * Filter unpublished entries.
	 *
	 * @author: Nils Hörrmann, post@nilshoerrmann.de
	 * @source: http://github.com/nilshoerrmann/unpublishedfilter
	 */
	$(document).ready(function() {
		var table = $('table');

		// Language strings
		Symphony.Language.add({
			'No': false,
			'published': false
		}); 

		// Find publish field
		table.find('thead th').each(function(index) {
			var column = $(this),
				title = $.trim(column.text()).toLowerCase();
			
			if(title == Symphony.Language.get('published')) {

				// Find unpublished entries
				table.find('tr td:eq(' + index + ')').each(function() {
					var cell = $(this),
						text = $.trim(cell.text());
						
					// Gray out row
					if(text == Symphony.Language.get('No')) {
						cell.parent().addClass('inactive');
					}
				});		
			}
		});

	});
	
})(jQuery.noConflict());
