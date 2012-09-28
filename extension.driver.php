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
				Symphony::Engine()->Page->addScriptToHead(URL . '/extensions/unpublishedfilter/assets/unpublishedfilter.publish.js', 2000);
			}
			
		}
	}
