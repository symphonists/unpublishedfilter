(function() {
	'use strict';

	var table, headers;

	var fields = {
		text: [],
		date: []
	};

	var names = {
		text: ['status', 'published', 'veröffentlicht', 'état', 'publié', 'pubblicato'],
		date: ['date', 'publish date', 'Datum', 'Veröffentlichungsdatum', 'Zeitraum', 'Anzeigezeitraum']
	};

	var values = ['yes', 'published', 'activated', 'enabled', 'visible', 'open', 'ja', 'veröffentlicht', 'aktiviert', 'freigeschaltet', 'offen', 'sichtbar', 'publié', 'oui', 'pubblicato']

	/**
	 * Init status highlighting.
	 */
	var init = function() {
		table = document.querySelector('#contents table');
		headers = table.querySelectorAll('th');

		// Get settings
		var settings = Symphony.Context.get('filter-by-dates');

		// Find status fields
		prepareNeedles();
		[].forEach.call(headers, find);

		// Check entry status
		fields.text.forEach(handleFields);
		if (settings !== false) {
			fields.date.forEach(function(id) {
				handleFields(id, true);
			});
		}
	};

	/**
	 * Find status fields.
	 *
	 * @param Node header
	 *  The table header
	 */
	var find = function(header) {
		var value = getUnifiedValue(header);

		// Naming field
		if (names.text.indexOf(value) > -1) {
			fields.text.push(header.id);
		}

		// Dating field
		if (names.date.indexOf(value) > -1) {
			fields.date.push(header.id);
		}
	};

/*-----------------------------------------------------------------------------
	Highlighting
-----------------------------------------------------------------------------*/

	/**
	 * Handle fields and check status.
	 *
	 * @param String id
	 *  The column id
	 * @param Boolean dated
	 *  Wheather the column is dated or not
	 */
	var handleFields = function(id, dated) {
		[].forEach.call(table.querySelectorAll('.' + id), function(column) {
			check(column, dated);
		});
	};

	/**
	 * Dim unpublished entries.
	 *
	 * @param Node column
	 *  The table column to check
	 * @param Boolean dated
	 *  Wheather the column is dated or not
	 */
	var check = function(column, dated) {
		var published = {};

		// Is dated
		if (dated) {
			published = checkDates(column);
		}

		// Is named
		else {
			published = checkValue(column);
		}

		// Dim unpublished entries
		if (published.status === false) {
			dim(column, published.timed);
		}
	};

	/**
	 * Check column value.
	 *
	 * @param Node column
	 *  The column
	 * @returns Object
	 *  The publish status
	 */
	var checkValue = function(column) {
		var value = getUnifiedValue(column, true),
			status = false;

		values.forEach(function(token) {
			if (value.indexOf(token) > -1) {
				status = true;
			}
		});

		return {
			status: status,
			timed: false
		};
	};

	/**
	 * Check column dates.
	 *
	 * @param Node column
	 *  The column
	 * @returns Object
	 *  The publish status
	 */
	var checkDates = function(column) {
		var dates = getDates(column),
			published;

		// Date
		if (dates.length === 1) {
			published = checkDate(dates[0]);
		}

		// Range
		else if (dates.length === 2) {
			published = checkRange(dates[0], dates[1]);
		}

		return published;
	};

	/**
	 * Check date.
	 *
	 * @param Datetime string
	 *  The date
	 * @returns Object
	 *  The publish status
	 */
	var checkDate = function(date) {
		var status = true,
			timed = false;

		if (moment(date).isAfter('now')) {
			status = false;
			timed = true;
		}

		return {
			status: status,
			timed: timed
		};
	};

	/**
	 * Check date range.
	 *
	 * @param Datetime start
	 *  The start date
	 * @param Datetime end
	 *  The end date
	 * @returns Object
	 *  The publish status
	 */
	var checkRange = function(start, end) {
		var status = true,
			timed = false;

		if (moment(end).isBefore()) {
			status = false;
		}

		if (moment(start).isAfter()) {
			status = false;
			timed = true;
		}

		return {
			status: status,
			timed: timed
		};
	};

	/**
	 * Get column dates.
	 *
	 * @param Node column
	 *  The column
	 * @returns Array
	 *  The array of dates
	 */
	var getDates = function(column) {
		var dates = [];

		[].forEach.call(column.querySelectorAll('time'), function(time) {
			var datetime = time.getAttribute('datetime');
			dates.push(datetime);
		});

		return dates;
	};

	/**
	 * Dim row.
	 *
	 * @param Node column
	 *  The current column
	 * @param Boolean timed
	 *  Wheather the publish date lies in the future or not
	 */
	var dim = function(column, timed) {
		var row = column.parentNode;

		row.classList.add('unpublishedfilter-draft');

		if (timed) {
			row.classList.add('unpublishedfilter-future');
		}
	};

/*-----------------------------------------------------------------------------
	Utilities
-----------------------------------------------------------------------------*/

	/**
	 * Prepare needles.
	 */
	var prepareNeedles = function() {
		names.text.forEach(lowercase);
		names.date.forEach(lowercase);
		values.forEach(lowercase);
	};

	/**
	 * Convert array values to lowercase.
	 *
	 * @param String value
	 *  The array value
	 * @param Integer index
	 *  The array index
	 * @param Array strings
	 *  The full array
	 */
	var lowercase = function(value, index, strings) {
		strings[index] = value.toLowerCase();
	};

	/**
	 * Get a nodes unified text value.
	 *
	 * @param Node node
	 *  The node
	 * @param Boolean first
	 *  Wheather to select the first child node or not
	 * @returns String
	 *  The trimmed, lowercase string
	 */
	var getUnifiedValue = function(node, first) {
		var text;

		if (first) {
			text = node.childNodes[0].textContent;
		}
		else {
			text = node.textContent;
		}

		return text.trim().toLowerCase();
	}

/*-----------------------------------------------------------------------------
	Public
-----------------------------------------------------------------------------*/

	Symphony.Extensions.UnpublishedFilter = {
		'init': init
	};
})();

/*-----------------------------------------------------------------------------
	Initialise Unpublished Filter
-----------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', Symphony.Extensions.UnpublishedFilter.init);
