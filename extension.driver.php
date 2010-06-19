<?php
	
	class Extension_Unpublishedfilter extends Extension {
		
		public function about() {
			return array(
				'name' => 'Unpublished Filter',
				'version' => '1.0',
				'release-date' => '2010-06-19',
				'author' => array(
					'name' => 'Nils Hörrmann',
					'website' => 'http://www.nilshoerrmann.de',
					'email' => 'post@nilshoerrmann.de'
				),
				'description' => 'Greyes out unpuplished entries in the section overview.'
			);
		}
		
		public function getSubscribedDelegates() {
			return array(
				array(
					'page' => '/backend/',
					'delegate' => 'InitaliseAdminPageHead',
					'callback' => 'initaliseAdminPageHead'
				)
			);
		}
		
		public function initaliseAdminPageHead($context) {
			$page = $context['parent']->Page;
			if($page instanceof ContentPublish and $page->_context['page'] == 'index') {
				$page->addScriptToHead(URL . '/extensions/unpublishedfilter/assets/symphony.unpublishedfilter.js', 2000);
			}
			
		}
	}
	
?>