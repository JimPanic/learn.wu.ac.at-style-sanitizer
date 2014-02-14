// ==UserScript==
// @name      	learn.wu.ac.at Style Sanitizer
// @description A couple of scripts to invalidate some style rules that makes reading/using the page harder. (Especially for people with typographical needs.)
// @author      Alexander Pánek <a.panek@brainsware.org>
// @match				http://learn.wu.ac.at/*
// @match				https://learn.wu.ac.at/*
// @version			0.1.25
// ==/UserScript==

console.log('Started style sanitizer for learn.wu.ac.at');

try {
	(function (document) {
		var to_array = function to_array (list) { return Array.prototype.slice.call(list); };
		var get_body = function get_body ()     { return document.getElementsByTagName('body')[0]; };

		var set_style = function set_style (element, key, value) { 
			if (null === element) return;

			element.style[key] = value;
		};

		var reset_fonts = function reset_fonts (element) {
			set_style(element, 'font-family', 'auto');
			set_style(element, 'font-size',   '100%');
		};

		var reset_float = function reset_float (element) {
			set_style(element, 'float', 'none');
		}

		var alter_all_fonts = function alter_all_fonts () {
			try {
				reset_fonts.call(null, get_body());

			} catch (error) {
				console.log ('Error replacing body fonts: ', error);
			} 

			try {
				reset_fonts.call(null, document.querySelector('.xowiki-content'));

			} catch (error) {
				console.log ('Error replacing .xowiki-content fonts: ', error);
			}

			console.log('Successfully resetted fonts');
		};

		var alter_textbook = function alter_textbook () {
			var textbook = document.querySelector('#textbuch');

			if (!textbook) return;

			var menu = textbook.parentNode;

			menu.classList.toggle('first');
			reset_float(menu);

			var content = menu.parentNode.querySelector('.book-content').parentNode;

			reset_float(content);

			console.log('Successfully resetted float and .first');
		};

		alter_all_fonts();
		alter_textbook();

	})(document);
} catch (error) {
	console.log('learn.wu.ac.at: Style sanitizer failed: ', error);
}

// TODO: Add body rule to enable particular web font OR remove all body rules
//       regarding setting the font family and size. Lets go with the easier
//       one.
