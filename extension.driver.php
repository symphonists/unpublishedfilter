<?php

class Extension_Unpublishedfilter extends Extension
{

	/**
	 * Add callback functions to backend delegates
	 */
	public function getSubscribedDelegates()
	{
		return array(
			array(
				'page' => '/backend/',
				'delegate' => 'InitaliseAdminPageHead',
				'callback' => 'initaliseAdminPageHead'
			)
		);
	}

	/**
	 * Add JavaScript
	 */
	public function initaliseAdminPageHead($context)
	{
		$callback = Symphony::Engine()->getPageCallback();

		// Append javascript for publish table
		if($callback['driver'] == 'publish' && $callback['context']['page'] == 'index') {
			$settings  = Symphony::Configuration()->get('unpublishedfilter');

			Administration::instance()->Page->addStylesheetToHead(URL . '/extensions/unpublishedfilter/assets/unpublishedfilter.publish.css', 'screen', 2000);
			Administration::instance()->Page->addScriptToHead(URL . '/extensions/unpublishedfilter/assets/unpublishedfilter.publish.js', 2002);

			if ($settings['filter-by-dates'] === false) {
				Administration::instance()->Page->addElementToHead(
					new XMLElement(
						'script',
						'Symphony.Context.add(\'filter-by-dates\', false);',
						array(
							'type' => 'text/javascript'
						)
					)
				);
			}
		}
	}

	public function install()
	{
		Symphony::Configuration()->set('filter-by-dates', true, 'unpublishedfilter');
		Symphony::Configuration()->write();
	}

	public function update($previousVersion)
	{
		$this->install();
	}

	public function uninstall()
	{
		Symphony::Configuration()->remove('unpublishedfilter');
		Symphony::Configuration()->write();
	}
}
