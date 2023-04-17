$(function(){
	"use strict";
		var move = true;
		var firstLaunch = true;
		var savedTextNodes = [];
		// create a list of text nodes to be messed up
		// var textNodes = $('*').contents().filter(function() {
		var textNodes = $('p, h1, h2, h3, h4, h5, h6, a, title, label, b, i, strong').contents().filter(function() {
			return this.nodeType === 3;
		});
		// iterate over each text node and mess up their values
		setInterval(function() {
			for (var i = 0; i < textNodes.length; i++) {
				if (firstLaunch == true) {
					savedTextNodes[i] = textNodes[i].nodeValue;
					if (i+1 == textNodes.length) {
						firstLaunch = false;
					}
				}
				if (move == true) {
					textNodes[i].nodeValue = messUpWords(textNodes[i].nodeValue);
				} else {
					textNodes[i].nodeValue = savedTextNodes[i];
				}
			}
		}, 10);
		// parse words out of a string and mess them up
		function messUpWords(str) {
			var messedUpText = '';
			// iterate through each word and scramble it
			var re = /\w+/g;
			var word;
			while ((word = re.exec(str)) != null) {
				// include any special characters before the word
				messedUpText += str.slice(messedUpText.length, word.index);
				// scramble the word
				messedUpText += scrambleWord(word[0]);
			}
			// include any special characters after the word
			messedUpText += str.slice(messedUpText.length, str.length);
			return messedUpText;
		}
		// scramble the word, being sure to always keep the first and last letters
		// in-tact. this is important so the text can still be read.
		function scrambleWord(word) {
			var scrambledWord = '';
			// if it's a small word or ~randomness~, don't scramble it
			if (word.length < 3 || Math.random() > 1/10) {
				return word;
			}
			var a = getRandomInt(1, word.length - 1);
			var b = getRandomInt(a, word.length - 1);
			scrambledWord += word.slice(0, a);
			scrambledWord += word.slice(a, b).split('').reverse().join('');
			scrambledWord += word.slice(b, word.length);
			return scrambledWord;
		}
		// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		$("#alert").show(); 
		$("#playStopMove").click(function() {
			if (move == true) {
				move = false;
				$("#playStopMove").html('Activer la danse des lettres');
			} else {
				move = true;
				$("#playStopMove").html('Désactiver la danse des lettres');
			}
		});
	});