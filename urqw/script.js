/**
 * This file is part of the Jim from Outer Space game.
 * Copyright (C) 2026 Nikita Tseykovets <tseikovets@rambler.ru>
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

// Hide unnecessary UI elements
$('.navbar-right').hide();

/*
 * Modification for styling buttons leading to visited locations
 */

// Save links to original function
const drawButtonsOriginal1 = Client.prototype.drawButtons;

// Override original function
Client.prototype.drawButtons = function() {
	GlobalPlayer.buttons.forEach(button => {
		if (Game.getVar('count_' + button.command) > 0) {
			button.desc = '<span class="read_page">' + button.desc + '</span>';
		}
	});

	const result = drawButtonsOriginal1.call(this);

	$('#buttons').find('button').each(function() {
		const $button = $(this);

		const $readPageSpan = $button.find('span.read_page');
		if ($readPageSpan.length === 0) {
			return;
		}

		const $buttonNumber = $button.find('b').filter(function() {
			const text = $(this).text().trim();
			return /^\d+:$/.test(text);
		});

		const $textLabel = $('<span class="sr-only">&nbsp;' + Game.getVar('read_marker') + '&nbsp;</span>');

		if ($buttonNumber.length > 0) { 
			$buttonNumber.after($textLabel);
		} else {
			$readPageSpan.prepend($textLabel);
		}
	});

	return result;
};


/**
 * Typography - plugin for UrqW <https://github.com/urqw/typography>
 * Copyright (C) 2025 Nikita Tseykovets <tseikovets@rambler.ru>
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

// The file encoding is UTF-8 (without BOM)

// Save links to original functions
const printOriginal = Player.prototype.print;
const drawButtonsOriginal = Client.prototype.drawButtons;

// Override original functions

Player.prototype.print = function(text, br) {
	text = typography(text);
	return printOriginal.call(this, text, br);
}

Client.prototype.drawButtons = function() {
	GlobalPlayer.buttons.forEach(button => {
		button.desc = typography(button.desc);
	});
	return drawButtonsOriginal.call(this);
};

// Typographic transformation function
window.typography = function(text, lang = '') {
	if (Game.getVar('urqw_typography_off') > 0) return text;

	if (!lang) {
		const urqwTypographyLang = Game.getVar('urqw_typography_lang');
		if (urqwTypographyLang) {
			lang = urqwTypographyLang;
		} else {
			lang = Game.getVar('urqw_game_lang');
		}
	}
	lang = lang.toLowerCase();

	// Split text: grab either tags or the text between them
	const parts = text.split(/(<[^>]+>)/);
	return parts.map(part => {
		// If it's a tag (starts with < and ends with >), leave it as is
		if (/^<[^>]+>$/.test(part)) {
			return part;
		}
		// Otherwise, this is a text fragment: perform replacements

		// Language-specific replacements
		switch (lang) {
			// Belarusian
			case 'be':
				// Replace cyrillic capital letter IE plus combining diaeresis with cyrillic capital letter IO
				part = part.replace(/\u0415\u0308/g, '\u0401');
				// Replace cyrillic small letter ie plus combining diaeresis with cyrillic small letter io
				part = part.replace(/\u0435\u0308/g, '\u0451');
				// Replace cyrillic capital letter I plus combining breve with cyrillic capital letter short I
				part = part.replace(/\u0418\u0306/g, '\u0419');
				// Replace cyrillic small letter i plus combining breve with cyrillic small letter short i
				part = part.replace(/\u0438\u0306/g, '\u0439');
				// Replace cyrillic capital letter U plus combining breve with cyrillic capital letter short U
				part = part.replace(/\u0423\u0306/g, '\u040E');
				// Replace cyrillic small letter u plus combining breve with cyrillic small letter short u
				part = part.replace(/\u0443\u0306/g, '\u045E');
				// Replace typewriter apostrophe with right apostrophe
				part = part.replace(/'/g, '\u2019');
				// Replace  typewriter quotation mark with «outside» and „inside“ quotes
				part = replaceQuotes(part, '\u00AB', '\u00BB', '\u201E', '\u201C');
				break;
			// German
			case 'de':
				// Replace typewriter apostrophe with right apostrophe
				part = part.replace(/'/g, '\u2019');
				// Replace  typewriter quotation mark with »outside« and ›inside‹ quotes
				part = replaceQuotes(part, '\u00BB', '\u00AB', '\u203A', '\u2039');
				// Replace  typewriter quotation mark with „outside“ and ‚inside‘ quotes
				//part = replaceQuotes(part, '\u201E', '\u201C', '\u201A', '\u2018');
				break;
			// English
			case 'en':
			// English (United States)
			case 'en-us':
				// Replace typewriter apostrophe with right apostrophe
				part = part.replace(/'/g, '\u2019');
				// Replace  typewriter quotation mark with “outside” and ‘inside’ quotes
				part = replaceQuotes(part, '\u201C', '\u201D', '\u2018', '\u2019');
				break;
			// English (United Kingdom / Great Britain)
			case 'en-gb':
			case 'en-uk':
				// Replace typewriter apostrophe with right apostrophe
				part = part.replace(/'/g, '\u2019');
				// Replace  typewriter quotation mark with ‘outside’ and “inside” quotes
				part = replaceQuotes(part, '\u2018', '\u2019', '\u201C', '\u201D');
				break;
			// Spanish
			case 'es':
				// Replace  typewriter quotation mark with «outside» and “inside” quotes
				part = replaceQuotes(part, '\u00AB', '\u00BB', '\u201C', '\u201D');
				break;
			// French
			case 'fr':
				// Replace typewriter apostrophe with right apostrophe
				part = part.replace(/'/g, '\u2019');
				// Replace  typewriter quotation mark with « outside » and “ inside ” quotes
				part = replaceQuotes(part, '\u00AB\u202F', '\u202F\u00BB', '\u201C\u202F', '\u202F\u201D');
				break;
			// Italian
			case 'it':
				// Replace typewriter apostrophe with right apostrophe
				part = part.replace(/'/g, '\u2019');
				// Replace  typewriter quotation mark with «outside» and “inside” quotes
				part = replaceQuotes(part, '\u00AB', '\u00BB', '\u201C', '\u201D');
				break;
			// Russian
			case 'ru':
				// Replace cyrillic capital letter IE plus combining diaeresis with cyrillic capital letter IO
				part = part.replace(/\u0415\u0308/g, '\u0401');
				// Replace cyrillic small letter ie plus combining diaeresis with cyrillic small letter io
				part = part.replace(/\u0435\u0308/g, '\u0451');
				// Replace cyrillic capital letter I plus combining breve with cyrillic capital letter short I
				part = part.replace(/\u0418\u0306/g, '\u0419');
				// Replace cyrillic small letter i plus combining breve with cyrillic small letter short i
				part = part.replace(/\u0438\u0306/g, '\u0439');
				// Replace  typewriter quotation mark with «outside» and „inside“ quotes
				part = replaceQuotes(part, '\u00AB', '\u00BB', '\u201E', '\u201C');
				break;
			// Ukrainian
			case 'uk':
				// Replace cyrillic capital letter I plus combining breve with cyrillic capital letter short I
				part = part.replace(/\u0418\u0306/g, '\u0419');
				// Replace cyrillic small letter i plus combining breve with cyrillic small letter short i
				part = part.replace(/\u0438\u0306/g, '\u0439');
				// Replace typewriter apostrophe with right apostrophe
				part = part.replace(/'/g, '\u2019');
				// Replace  typewriter quotation mark with «outside» and „inside“ quotes
				//part = replaceQuotes(part, '\u00AB', '\u00BB', '\u201E', '\u201C');
				// Replace  typewriter quotation mark with «outside» and “inside” quotes
				part = replaceQuotes(part, '\u00AB', '\u00BB', '\u201C', '\u201D');
				break;
		}

		// General replacements
		// Replace three periods with ellipsis
		part = part.replace(/(?<!\.)\.{3}(?!\.)/g, '\u2026');
		// Replace hyphen-minus with em dash (At the beginning of the line
		// and a space to the right, or with spaces around)
		part = part.replace(/(?<=^|\s)-(?=\s)/g, '\u2014');
		// Replace two hyphen-minuses with em dash
		part = part.replace(/(?<!-)-{2}(?!-)/g, '\u2014');
		// Replace hyphen-minus with en dash (between two groups of digits)
		part = part.replace(/(?<!\d-)(?<!\d)(\d+)-(\d+)(?!-\d)(?!\d)/g, '$1\u2013$2');
		// Replace hyphen-minus with figure dash (between digits)
		part = part.replace(/(\d)-(?=\d)/g, '$1\u2012');
		// Replace hyphen-minus with minus (at the beginning of a line or after a space
		// and before any non-space character)
		part = part.replace(/(^|\s)-(\S)(?!-)/g, '$1\u2212$2');
		// Replace all remaining hyphen-minuses with hyphens
		part = part.replace(/-/g, '\u2010');
		// Delete soft hyphens from text
		part = part.replace(/\u00AD/g, '');
		// Replace (C) with copyright sign
		part = part.replace(/\(C\)/gi, '\u00A9');
		// Replace (P) with sound recording copyright
		part = part.replace(/\(P\)/gi, '\u2117');
		// Replace (R) with registered sign
		part = part.replace(/\(R\)/gi, '\u00AE');
		// Replace (TM) with trade mark sign
		part = part.replace(/\(TM\)/gi, '\u2122');

		return part;
	}).join('');

	/**
	 * Replaces typewriter quotation mark with typographically correct ones,
	 * taking into account nesting
	 * @param {string} outOpen - opening outside quotes
	 * @param {string} outClose - closing outside quotes
	 * @param {string} inOpen - opening inside quotes
	 * @param {string} inClose - closing inside quotes
	 * @returns {string} Text with replaced quotation marks
	 */
	function replaceQuotes(text, outOpen, outClose, inOpen, inClose) {
		let result = '';
		let nestLevel = 0; // Quote nesting level counter

		for (let i = 0; i < text.length; i++) {
			const char = text[i];

			// If it's not a quotation mark, copy the character
			if (char !== '"') {
				result += char;
				continue;
			}

			// Check the context to determine the type of quotation mark
			// Opening quote is the first character of a string, the character after a space or a left parenthesis
			const isOpening = (i === 0) || /[\s\]\)\}]/.test(text[i - 1]);
			// Closing quote is the last character of a string or a character before some punctuation marks
			const isClosing = (i === text.length - 1) || /[\s.,;:!?\]\)\}]/.test(text[i + 1]);

			if (isOpening) {
				// Opening quotation mark: choice by nesting level
				if (nestLevel === 0) {
					result += outOpen;
				} else {
					result += inOpen;
				}
				nestLevel++;
			} else if (isClosing) {
				// Closing quotation mark: choice by nesting level
				if (nestLevel > 1) {
					result += inClose;
				} else {
					result += outClose;
				}
				if (nestLevel > 0) nestLevel--;
			} else {
				// If the context is not appropriate, leave the quotation mark as is
				result += char;
			}
		}

		return result;
	}
}
