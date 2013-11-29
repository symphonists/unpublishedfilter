(function($) {


	var Unpublished = function() {
		var table,
			fieldNames = ['status', 'published'],
			fieldToggles = ['yes', 'published'],
			fieldId = 0;

		function init() {
			table = $('#contents table');

			// Translate names and toggles
			$.each(fieldNames, function(index, value) {
				fieldNames.push(translate(value));
			});
			$.each(fieldToggles, function(index, value) {
				fieldToggles.push(translate(value));
			});

			// Find publish status fields
			table.find('th').each(find);

			// Dim unpublished entries
			table.find('.' + fieldId).each(dim);
		}

		// Find publish status fields
		function find() {
			if($.inArray(this.innerText.toLowerCase(), fieldNames) > -1) {
				fieldId = this.id;
			}
		}

		// Dim unpublished entries
		function dim() {
			if($.inArray(this.innerText.toLowerCase(), fieldToggles) == -1) {
				$(this).parent().addClass('inactive');
			}
		}

		// Translate string
		function translate(string) {
			term = {};
			term[string] = false;
			Symphony.Language.add(term);
			return Symphony.Language.get(string);
		}

	/*-------------------------------------------------------------------------
		API
	-------------------------------------------------------------------------*/

		return {
			'init': init
		};
	}();

	$(document).on('ready.unpublishedfilter', function() {
		Unpublished.init();
	});
	
})(jQuery.noConflict());
