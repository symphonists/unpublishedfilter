<?php
	
	class Extension_Unpublishedfilter extends Extension {

		/**
		 * Extension information
		 */	
		public function about() {
			return array(
				'name' => 'Unpublished Filter',
				'version' => '1.3',
				'release-date' => '2011-06-07',
				'author' => array(
					'name' => 'Nils Hörrmann',
					'website' => 'http://nilshoerrmann.de',
					'email' => 'post@nilshoerrmann.de'
				),
				'description' => 'Greyes out unpuplished entries in the section overview.'
			);
		}

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
