
/**
 * Helper tool for creating QUnit tests and running them at [[Project:Testar script]]
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 */
( function ( mw, $ ) {
	'use strict';

	var	page = mw.util.getParamValue('page'),
		script, test, reJS;
	if ( mw.config.get('wgNamespaceNumber') === 4
		&& mw.config.get('wgTitle') === 'Testar script'
		&& page
		&& mw.config.get('wgAction') === 'view'
	) {
		script = page.replace(/\.test\.js$/, '.js');
		$('#mw-content-text')
			.empty()
			.append('<p>Os testes a seguir foram definidos na <a href="' +
				mw.util.getUrl(page) + '">' + page +
				'</a> para garantir o funcionamento do script <a href="' +
				mw.util.getUrl(script) + '">' + script + '</a>.</p>')
			.append('<h2 id="qunit-header">Resultado dos testes QUnit</h2>')
			.append('<h3 id="qunit-banner"></h3>')
			.append('<div id="qunit-testrunner-toolbar"></div>')
			.append('<h3 id="qunit-userAgent"></h3>')
			.append('<ol id="qunit-tests"></ol>')
			.append('<div id="qunit-fixture">test markup, will be hidden</div>');
		$('#firstHeading').find('span').html('Testes definidos em <a href="' +
			mw.util.getUrl(page) + '">' + page + '</a>');
		// Based on [[:en:MediaWiki:Common.js/use.js]]
		reJS = new RegExp( '^(?:MediaWiki:|' +
			$.escapeRE(
				mw.config.get('wgFormattedNamespaces')[2] + ':' + mw.config.get( 'wgUserName' )
			) + '\\/).*\\.js$' );
		if ( reJS.test( page ) ) {
			mw.loader.using('jquery.qunit', function () {
				importScript(page);
			});
		}
	} else if (/\.js$/g.test(mw.config.get('wgTitle')) && $.inArray(mw.config.get('wgNamespaceNumber'), [8, 2]) !== -1) {
		if ( /\.test\.js$/g.test(mw.config.get('wgTitle')) ) {
			test = mw.config.get('wgPageName');
			script = test.replace(/\.test\.js$/, '.js');
			mw.util.addPortletLink(
				'p-cactions',
				mw.util.getUrl( script ),
				'Abrir script',
				'ca-open-js'
			);
		} else {
			test = mw.config.get('wgPageName').replace(/\.js$/, '.test.js');
			mw.util.addPortletLink(
				'p-cactions',
				mw.util.getUrl( test ),
				'Definir testes QUnit',
				'ca-def-qunit-tests'
			);
		}

		mw.util.addPortletLink(
			'p-cactions',
			mw.util.getUrl( 'Project:Testar script' ) + '?page=' +
				mw.util.wikiUrlencode( test ),
			'Executar testes QUnit',
			'ca-run-qunit-tests'
		);
	}
}( mediaWiki, jQuery ) );
