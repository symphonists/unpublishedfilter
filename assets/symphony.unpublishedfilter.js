
jQuery(document).ready(function() {

	// Language strings
	Symphony.Language.add({
		'No': false,
		'published': false
	});

	// Publish field index
	var index = jQuery('table thead th:contains(' + Symphony.Language.get('published') + ')').index();
	
	// Gray out unpublished entries
	jQuery('table tr').find('td:eq(' + index + ')').each(function(index, element) {
		if(jQuery(element).text() == Symphony.Language.get('No')) {
			jQuery(this).parent().addClass('inactive');
		}
	});

});