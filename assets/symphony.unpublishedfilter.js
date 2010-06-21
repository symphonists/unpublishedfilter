/*
 * UNPUBLISHED FILTER for Symphony
 *
 * @author: Nils Hörrmann, post@nilshoerrmann.de
 * @source: http://github.com/nilshoerrmann/unpublishedfilter
 */


/*-----------------------------------------------------------------------------
	Language strings
-----------------------------------------------------------------------------*/

	Symphony.Language.add({
		'No': false,
		'published': false
	});


/*-----------------------------------------------------------------------------
	Filter unpublished entries
-----------------------------------------------------------------------------*/
	
	jQuery(document).ready(function() {
	
		// Get publish field index
		var index = jQuery('table thead th:contains(' + Symphony.Language.get('published') + ')').index();
		
		// Gray out unpublished entries
		jQuery('table tr').find('td:eq(' + index + ')').each(function(index, element) {
			var text = jQuery.trim(jQuery(element).text());
			if(text == Symphony.Language.get('No')) {
				jQuery(this).parent().addClass('inactive');
			}
		});
	
	});
	