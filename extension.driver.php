<?php
	
	class Extension_Unpublishedfilter extends Extension {

		/**
		 * Add callback functions to backend delegates
		 */	
		public function getSubscribedDelegates() {
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
		public function initaliseAdminPageHead($context) {
			$callback = Symphony::Engine()->getPageCallback();

			// Append javascript for publish table
			if($callback['driver'] == 'publish' && $callback['context']['page'] == 'index') {
				Administration::instance()->Page->addStylesheetToHead(URL . '/extensions/unpublishedfilter/assets/unpublishedfilter.publish.css', 'screen', 2000);
				Administration::instance()->Page->addScriptToHead(URL . '/extensions/unpublishedfilter/lib/moment-with-lang.min.js', 2001);
				Administration::instance()->Page->addScriptToHead(URL . '/extensions/unpublishedfilter/assets/unpublishedfilter.publish.js', 2002);
			}
			
		}
	}
