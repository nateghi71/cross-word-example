// Author: HoldOffHunger
// License: BSD 3-Clause

			// Set Globals
			// --------------------------------------------

let crosswordclues = [];

			// Set Randomization Configs
			// --------------------------------------------

	/* areWeInGodMode()

		Turn on to show the crossword puzzle completed, which makes debugging and coding much easier.

	*/

function areWeInGodMode() {
	return false;
	return true;
}

	/* areWeRandomizingPuzzleWords()

		On/off switch for determining whether we randomize the puzzle words themselves (to increase the randomness of the overall resultant crossword puzzle).

	*/

function areWeRandomizingPuzzleWords() {
	return true;
}

	/* areWeRandomizingPuzzlePieces

		On/off switch for determining whether we are randomizing the puzzle pieces themselves, similarly to increase randomness.

	*/

function areWeRandomizingPuzzlePieces() {
	return true;
}

	/* areWeRandomizingAcrossDownChoices()

		On/off switch for determining if we are randomizing "spine" words from being either across or down.

	*/

function areWeRandomizingAcrossDownChoices() {
	return true;
}

	/* areWeRandomizingAcrossDownLists()

		On/off switch for determining if we randomize choices of the across and down phrase lists.

	*/

function areWeRandomizingAcrossDownLists() {
	return true;
}

			// Main()
			// --------------------------------------------

	/* crosswordPuzzle(puzzlewords)

		Main function that receives the list of puzzlewords and then displays the crossword puzzle itself.

	*/

function crosswordPuzzle(puzzlewords) {
	let wordcount = puzzlewords.length;

	if(!puzzlewords || !wordcount) {
		console.log("Developer Error : Did you forget to load words?");
		return false;
	}

	if(areWeRandomizingPuzzleWords()) {
		puzzlewords = shuffle(puzzlewords);
	}

	let crosswords = generateCrosswordBlockSources(puzzlewords);

	let crosswordblocks = crosswords['blocks'];
	let crosswordclues = crosswords['clues'];

	let graphs = buildCrosswordBlocks(crosswordblocks);
	graphs = compactCrosswordBlockSources(graphs);

	if(areWeRandomizingPuzzlePieces()) {
		graphs = shuffle(graphs);
	}

	if(!graphs || !graphs.length) {
		console.log("Developer Error : Your words could not be made into graphs.");
		return false;
	}

	let fullgraph = buildCrosswordBlockGraphs(graphs);
	let wordlists = buildCrosswordLists(fullgraph['matrixpositions']);

	showCrossWordPuzzle(fullgraph['matrix']);
	showCrossWordLists(wordlists, crosswordclues);
	showCrossWordOptions();

	return true;
}

			// User Form Actions
			// --------------------------------------------

	/* showCrossWordOptions()

		Show the crossword puzzle and the lists.

	*/

function showCrossWordOptions() {
		/* solvefunction()

			User clicked the "solve" button for a phrase on the across or down list. Provide a prompt for solving the clue.

		*/

	let solvefunction = function() {
		$('#solution-answer').val('');
		$('#answer-results').hide();
		$('#answer-results').html('');

		let word = $(this).attr('data-word');
		let acrosstext = $(this).attr('data-across') == 'false' ? 'Down' : 'Across';
		$('#position-and-clue').html('<b>' + acrosstext + '</b> : ' + $(this).attr('data-clue'));
		$('#answer-form').show();

		if($(this).children('span').attr('data-solved')) {
			$('#answer-button').attr('disabled', true);
			$('#reveal-answer-button').attr('disabled', true);

			$('#answer-results').show();
			$('#answer-results').html('You have already solved this problem.');

			$('#solution-answer').val(word);
		} else {
			$('#solution-answer').attr('maxlength', word.length);

			$('#answer-button').attr('data-word', word);
			$('#reveal-answer-button').attr('data-word', word);

			let datax = $(this).attr('data-x');

			$('#answer-button').attr('data-x', datax);
			$('#reveal-answer-button').attr('data-x', datax);

			let datay = $(this).attr('data-y');

			$('#answer-button').attr('data-y', datay);
			$('#reveal-answer-button').attr('data-y', datay);

			let across = $(this).attr('data-across');

			$('#answer-button').attr('data-across', across);
			$('#reveal-answer-button').attr('data-across', across);

			$('#solution-answer').focus();

			$('#answer-button').attr('disabled', false);
			$('#reveal-answer-button').attr('disabled', false);
		}

		return false;
	}

		/* closesolvefunction()

			User clicked "close" on the "solve phrase" dialogue that was brought up by solvefunction().

		*/

	let closesolvefunction = function() {
		$('#answer-results').hide();
		$('#answer-form').hide();
		return false;
	}

		/* answerfunction()

			User clicked "answer" on the "solve phrase" dialogue that was brought up by solvefunction().

		*/

	let answerfunction = function() {
		let word = $(this).attr('data-word');
		let answer = $('#solution-answer').val().toLowerCase();

		if(answer == word) {
			let across = $(this).attr('data-across');

			let x = parseInt($(this).attr('data-x'), 10);
			let y = parseInt($(this).attr('data-y'), 10);

			if(across && across != 'false') {
				for(let i = 0; i < answer.length; i++) {
					let newheight = y + i ;
					let letterposition = 'letter-position-' + x + '-' + newheight;
					$('#' + letterposition).text(answer[i]);
				}
			} else {
				for(let i = 0; i < answer.length; i++) {
					let newwidth = x + i ;
					let letterposition = 'letter-position-' + newwidth + '-' + y;
					$('#' + letterposition).text(answer[i]);
				}
			}

			$('#' + word + '-listing').addClass('strikeout');
			$('#' + word + '-listing').attr('data-solved', true);

			$('#answer-form').hide();
		} else {
			if(!$('#answer-results').is(':visible')) {
				$('#answer-results').show();
				$('#answer-results').html('Incorrect Answer, Please Try Again');
			}
		}

		return false;
	}

		/* revealanswerfunction()

			User clicked "reveal answer" on the "solve phrase" dialogue that was brought up by solvefunction().

		*/

	let revealanswerfunction = function() {
		let word = $(this).attr('data-word');
		let across = $(this).attr('data-across');

		let x = parseInt($(this).attr('data-x'), 10);
		let y = parseInt($(this).attr('data-y'), 10);

		if(across && across != 'false') {
			for(let i = 0; i < word.length; i++) {
				let newheight = y + i ;
				let letterposition = 'letter-position-' + x + '-' + newheight;
				$('#' + letterposition).text(word[i]);
			}
		} else {
			for(let i = 0; i < word.length; i++) {
				let newwidth = x + i ;
				let letterposition = 'letter-position-' + newwidth + '-' + y;
				$('#' + letterposition).text(word[i]);
			}
		}

		$('#' + word + '-listing').addClass('red-strikeout');
		$('#' + word + '-listing').attr('data-solved', true);

		$('#answer-form').hide();
	}

	$('.word-clue').click(solvefunction);
	$('#cancel-button').click(closesolvefunction);
	$('#answer-button').click(answerfunction);
	$('#reveal-answer-button').click(revealanswerfunction);
}

			// Show Crossword Lists
			// --------------------------------------------

	/* showCrossWordLists(wordlists, clues)

		Fill in the numbers for the crossword puzzle and then display the lists of words associated with those numbers.

	*/

function showCrossWordLists(wordlists, clues) {
	let acrosslist = wordlists['across'];
	let downlist = wordlists['down'];

	if(areWeRandomizingAcrossDownLists()) {
		acrosslist = shuffle(acrosslist);
		downlist = shuffle(downlist);
	}

	let acrosslistordered = fillInCrossWordNumbers(acrosslist);
	let downlistordered = fillInCrossWordNumbers(downlist, acrosslist, acrosslistordered);

	let acrosslistorderedelement = getViewableCrossWordList(acrosslistordered, clues, true);
	let downlistorderedelement = getViewableCrossWordList(downlistordered, clues, false);

	$('#left-list').append(acrosslistorderedelement);
	$('#right-list').append(downlistorderedelement);
}

	/* getViewableCrossWordList(listitems, clues, across)

		Get a single crossword list, which may be used for either across or down lists.

	*/

function getViewableCrossWordList(listitems, clues, across) {
	let numbers = Object.keys(listitems);

	let element = '<ul>';

	for(let i = 0; i < numbers.length; i++) {
		let number = numbers[i];
		let wordinfo = listitems[number];
		let word = wordinfo['word'];
		let coordinates = wordinfo['coordinates'];
		let clue = clues[word];

		element += '<li ';
		element += 'data-word="' + word.replace(/"/g, '&quot;') + '" ';
		element += 'data-clue="' + clue.replace(/"/g, '&quot;') + '" ';
		element += 'data-x="' + coordinates[0] + '" ';
		element += 'data-y="' + coordinates[1] + '" ';
		element += 'data-across="' + across + '" ';
		element += 'class="word-clue clickable" ';
		element += '>';
		element += number + ' : ' ;
		element += '<span id="';
		element += word + '-listing';
		element += '" ';
		element += 'class="linkable">';
		element += clue;
		element += '</span>';
		element += '</li>';
	}

	element += '</ul>';

	return element;
}

	/* fillInCrossWordNumbers(listitems, blockitems, blockitemsordered)

		Fill in the numbers in the crossword puzzle boxes that are each individually associated with a particular clue from the across or down lists.

	*/

function fillInCrossWordNumbers(listitems, blockitems, blockitemsordered) {
	let orderedlist = [];
	let listnumber = 0;
	for(let i = 0; i < listitems.length; i++) {
		listnumber++;

		let listitem = listitems[i];
		let word = listitem['word'];
		let coordinates = listitem['position'];

		let blockingitemnumber = getBlockingItemNumber(coordinates, blockitems, blockitemsordered);

		fillnumber = listnumber;
		if(blockingitemnumber) {
			fillnumber = blockingitemnumber;
		}

		let element = '<div class="background-text"><span class="crossword-grid-cell-number">' + fillnumber + '</span></div>';

		let parentelement;

		parentelement = $('#cell-position-' + coordinates[0] + '-' + coordinates[1]);

		if(parentelement && $(parentelement).attr('id')) {
			$(parentelement).prepend(element);
		}

		orderedlist[listnumber] = {
			'word':word,
			'coordinates':coordinates,
		};
	}

	return orderedlist;
}

	/* getBlockingItemNumber(coordinates, blockitems, blockitemsordered)

		It is possible for a grid cell to be the start position for one item from the across list and one item from the down list. In this case, a "blocking number" is already assigned to the grid cell. We resolve this by placing the number on the opposite side in the cell, so all cells have a number in the top-left corner, but this one has a number in the top-left and the top-right.

	*/

function getBlockingItemNumber(coordinates, blockitems, blockitemsordered) {
	if(!blockitems || !blockitems.length || !blockitemsordered || !blockitemsordered.length) {
		return false;
	}
	for (let i = 0; i < blockitems.length; i++) {
		let blockitem = blockitems[i];

		let blockcoordinates = blockitem['position'];

		if(blockcoordinates[0] == coordinates[0] && blockcoordinates[1] == coordinates[1]) {
			return getBlockItemNumberPosition(blockitem['word'], blockitemsordered);
		}
	}

	return false;
}

	/* getBlockItemNumberPosition(word, items)

		This returns the number position of the blocking item.

	*/

function getBlockItemNumberPosition(word, items) {
	let itemkeys = Object.keys(items);

	for(let i = 0; i < itemkeys.length; i++) {
		let itemkey = itemkeys[i];

		let itemword = items[itemkey];

		if(itemword.word == word) {
			return itemkey;
		}
	}
}

			// Show Crossword Puzzle
			// --------------------------------------------

	/* showCrossWordPuzzle(matrix)

		Show the crossword puzzle itself. Only display the answers if we are in god mode.

	*/

function showCrossWordPuzzle(matrix) {
	let widestline = getWidestLine(matrix);
	let tallestline = getTallestLine(matrix);

	let table = $('<table class="puzzle" border="1" cellpadding="0" cellspacing="0"></table>');

	for(let i = 0; i < tallestline; i++) {
		let tablerow = '<tr class="letter-row">';

		for(let j = 0; j < widestline; j++) {
			let cellclass = 'letter-cell';

			if(!matrix[i][j] || matrix[i][j] == ' ') {
				cellclass += ' blank-cell';

			}
			tablerow += '<td id="cell-position-' + i + '-' + j + '" class="relative-position ' + cellclass + '">';

			tablerow += '<span class="letter-text" id="letter-position-' + i + '-' + j + '">';

			if(areWeInGodMode() && matrix[i][j] && matrix[i][j] != ' ') {
				tablerow += matrix[i][j];
			}

			tablerow += '</span>';

			tablerow += '</td>';
		}

		tablerow += '</tr>';

		$(table).append(tablerow);
	}

	$('#root').append(table);

	return true;
}

	/* buildCrosswordLists(matrixpositions)

		From the crossword puzzle, build the lists of across and down.

	*/

function buildCrosswordLists(matrixpositions) {
	let acrosslist = [];
	let downlist = [];

	for(let i = 0; i < matrixpositions.length; i++) {
		let matrixposition = matrixpositions[i];

		let across = matrixposition['across'];
		let word = matrixposition['word'];
		let positions = matrixposition['matrixpositions'];

		let primaryelement = {
			'word':word,
			'position':positions[word],
		}

		delete positions[word];
		if(across) {
			if(word != '(unmatched)') {
				acrosslist.push(primaryelement);
			}
			downlist = buildCrosswordList(downlist, positions);
		} else {
			if(word != '(unmatched)') {
				downlist.push(primaryelement);
			}
			acrosslist = buildCrosswordList(acrosslist, positions);
		}
	}

	return {
		'across':acrosslist,
		'down':downlist,
	};
}

	/* buildCrosswordList(list, positions)

		Build a single crossword list, either for across or down.

	*/

function buildCrosswordList(list, positions) {
	let matrixpositionwords = Object.keys(positions);

	for(let i = 0; i < matrixpositionwords.length; i++) {
		let matrixpositionword = matrixpositionwords[i];

		let coordinates = positions[matrixpositionword];

		list.push({
			'word':matrixpositionword,
			'position':coordinates,
		});
	}

	return list;
}

			// Build Crossword
			// --------------------------------------------

	/* buildCrosswordBlockGraphs(graphs)

		Given groups of words, each with a "spine" word, assemble these into a single crossword puzzle block graph.

	*/

function buildCrosswordBlockGraphs(graphs) {
	let firstgraph = graphs.shift();

	let fullmatrix = firstgraph['matrix'];
	let fullmatrixpositions = [{
		'matrixpositions':firstgraph['matrixpositions'],
		'across':firstgraph['across'],
		'word':firstgraph['word'],
	}];

	for(let i = 0; i < graphs.length; i++) {
		let graph = graphs[i];

		let matrix = graph['matrix'];
		let matrixpositions = graph['matrixpositions'];
		let across = graph['across'];
		let word = graph['word'];

		console.log("BT: BUILD BLOCK GRAPH...|" + i + "|" + word + "|");
		console.info(matrixpositions);

		let widestline = getWidestLine(fullmatrix);
		let tallestline = getTallestLine(fullmatrix);

		let buildvertically = checkToBuildVertically(fullmatrix, matrix, widestline, tallestline);
		let built = false;

		if(!buildvertically) {
						// I AM LEAF!!!
			let possiblefullmatrixsolution = false;
			let possiblefullmatrixcoordinates = [];
			let shortestlinelength = 99999999;

			for(let j = 0; j < fullmatrix.length; j++) {
				let trimmedfullmatrixline = rtrim(fullmatrix[j]);
				if(trimmedfullmatrixline.length > 0 && trimmedfullmatrixline.length < shortestlinelength) {
					let solutioncoordinates = [trimmedfullmatrixline.length,j + i];
					let newerpossiblefullmatrixsolution = joinHorizontalMatrices(fullmatrix, matrix, solutioncoordinates);
					if(newerpossiblefullmatrixsolution) {
						shortestlinelength = getThinnestLine(newerpossiblefullmatrixsolution);
						possiblefullmatrixsolution = newerpossiblefullmatrixsolution;
						possiblefullmatrixcoordinates = solutioncoordinates;

						canmutate = true;
						var leftpushback = 1;

						while(canmutate && (trimmedfullmatrixline.length - leftpushback) >= 0) {
							console.log("BT: Across ALPHA.");
							solutioncoordinates = [trimmedfullmatrixline.length - leftpushback,j + i];
							let newestpossiblefullmatrixsolution = joinHorizontalMatrices(fullmatrix, matrix, solutioncoordinates);
							if(newestpossiblefullmatrixsolution) {
								shortestlinelength = getThinnestLine(newestpossiblefullmatrixsolution);
								possiblefullmatrixsolution = newestpossiblefullmatrixsolution;
								possiblefullmatrixcoordinates = solutioncoordinates;
								leftpushback++;
							} else {
								canmutate = false;
								leftpushback--;
							}
						}

						let toppushback = 1;

						while((j + i) - toppushback > 0) {
							solutioncoordinates = [trimmedfullmatrixline.length - leftpushback,(j + i) - toppushback];
							let newestpossiblefullmatrixsolution = joinHorizontalMatrices(fullmatrix, matrix, solutioncoordinates);
							if(newestpossiblefullmatrixsolution) {
								shortestlinelength = getThinnestLine(newestpossiblefullmatrixsolution);
								possiblefullmatrixsolution = newestpossiblefullmatrixsolution;
								possiblefullmatrixcoordinates = solutioncoordinates;
							}

							toppushback++;
						}

						toppushback--;

						canmutate = true;
						var leftpushback = 1;

						while(canmutate && (trimmedfullmatrixline.length - leftpushback) >= 0) {
							solutioncoordinates = [trimmedfullmatrixline.length - leftpushback,j + i - toppushback];
							let newestpossiblefullmatrixsolution = joinHorizontalMatrices(fullmatrix, matrix, solutioncoordinates);
							if(newestpossiblefullmatrixsolution) {
								shortestlinelength = getThinnestLine(newestpossiblefullmatrixsolution);
								possiblefullmatrixsolution = newestpossiblefullmatrixsolution;
								possiblefullmatrixcoordinates = solutioncoordinates;
								leftpushback++;
							} else {
								canmutate = false;
								leftpushback--;
							}
						}
					}
				}
			}

			if(possiblefullmatrixsolution) {
				fullmatrix = possiblefullmatrixsolution;
				console.info(matrixpositions);
				matrixpositions = interpolateMatrixPositions(matrixpositions, [possiblefullmatrixcoordinates[1], possiblefullmatrixcoordinates[0]]);
				fullmatrixpositions.push({
					'matrixpositions':matrixpositions,
					'across':across,
					'word':word,
				});
				built = true;
			}
		}

		if(buildvertically || !built) {
				console.log("BT: Vertical ALPHA.");
						// AND I AM TWIG!!!
			let oldlength = fullmatrix.length;
			fullmatrixbottom = fullmatrix[fullmatrix.length - 1];
			for(let j = 0; j < widestline; j++) {
				let smallmatrixtop = matrix[0];
				if(nonConflictingRows(fullmatrixbottom, smallmatrixtop)) {
					fullmatrix = joinVerticalMatrices(fullmatrix, matrix);
					solutioncoordinates = [oldlength, j];
					matrixpositions = interpolateMatrixPositions(matrixpositions, solutioncoordinates);
					fullmatrixpositions.push({
						'matrixpositions':matrixpositions,
						'across':across,
						'word':word,
					});
					j = widestline;
					built = true;
				} else {
					matrix = incrementMatrixHorizontally(matrix);
				}
			}

			if(!built) {
				viewPuzzle(matrix);

				solutioncoordinates = [fullmatrix.length + 1, 0];
				matrix = compactCrosswordBlockSource({'matrix':matrix})['matrix'];
				fullmatrix.push('');
				fullmatrix = joinVerticalMatrices(fullmatrix, matrix);

				matrixpositions = interpolateMatrixPositions(matrixpositions, solutioncoordinates);

				console.info(matrixpositions);
				fullmatrixpositions.push({
					'matrixpositions':matrixpositions,
					'across':across,
					'word':word,
				});
			}
		}

		fullmatrix = compactCrosswordBlockSource({'matrix':fullmatrix})['matrix'];
	}

	let fullgraph = {
		'matrix':fullmatrix,
		'matrixpositions':fullmatrixpositions,
	};

	return fullgraph;
}

	/* interpolateMatrixPositions(matrixpositions, coordinates, word)

		Shift the entire matrix of crossword puzzle words by some coordinates. For example, move each row up by 1 and left by 5, which would retain the relationship among the words, since they are all moved by the same amount and in the same directions.

	*/

function interpolateMatrixPositions(matrixpositions, coordinates, word) {
	let matrixpositionwords = Object.keys(matrixpositions);

	for(let i = 0; i < matrixpositionwords.length; i++) {
		let matrixpositionword = matrixpositionwords[i];
		let matrixpositioncoordinates = matrixpositions[matrixpositionword];
		matrixpositioncoordinates[0] += coordinates[0];
		matrixpositioncoordinates[1] += coordinates[1];
	}

	return matrixpositions;
}

	/* viewPuzzle(puzzle)

		Debugging tool to view the puzzle.

	*/

function viewPuzzle(puzzle) {
	console.log("Viewing puzzle from...|" + arguments.callee.caller.name + "|");
	console.info(JSON.stringify(puzzle).replace(/,/g, ",\n"));
}

	/* rtrim(string)

		Right-trim a string.

	*/

function rtrim(string) {
	if(!string) {
		return "";
	}
	return string.replace(/\s+$/, '');
}

	/* joinHorizontalMatrices(fullmatrix, matrix, coordinates)

		Given two matrices of crossword puzzle graphs, join them horizontally.

	*/

function joinHorizontalMatrices(fullmatrix, matrix, coordinates) {
	if(coordinates[0] == 0 || coordinates[1] == 0) {
		return false;
	}
	originalfullmatrix = fullmatrix;
	let maxheight = fullmatrix.length + matrix.length;
	fullmatrix = fullmatrix.slice();
	for(let i = 0; i < matrix.length; i++) {
		let line = matrix[i];

		for(let j = 0; j < line.length; j++) {
			let x = coordinates[0];
			let y = coordinates[1];

			x += j;
			y += i;

			if(!fullmatrix[y]) {
				fullmatrix[y] = "";
			}

			if(fullmatrix[y] && fullmatrix[y][x] && fullmatrix[y][x] != ' ' && matrix[i][j] != ' ') {
				return false;
			} else {
				if(matrix[i][j] != ' ') {
					if(originalfullmatrix[y - 1] && originalfullmatrix[y - 1][x] && originalfullmatrix[y - 1][x] != ' ') {
						return false;
					}

					if(originalfullmatrix[y + 1] && originalfullmatrix[y + 1][x] && originalfullmatrix[y + 1][x] != ' ') {
						return false;
					}

					if(originalfullmatrix[y] && originalfullmatrix[y][x - 1] && originalfullmatrix[y][x - 1] != ' ') {
						return false;
					}

					if(originalfullmatrix[y] && originalfullmatrix[y][x + 1] && originalfullmatrix[y][x + 1] != ' ') {
						return false;
					}
				}
			}

			while(!fullmatrix[y][x]) {
				fullmatrix[y] += ' ';
			}
			if(matrix[i][j] != ' ') {
				fullmatrix[y] = insertLetterAtStringPosition(matrix[i][j], fullmatrix[y], x);
			}
		}
	}

	return fullmatrix;
}

	/* joinVerticalMatrices(bigmatrix, smallmatrix)

		Given two matrices of crossword puzzle graphs, join them vertically.

	*/

function joinVerticalMatrices(bigmatrix, smallmatrix) {
	let height = bigmatrix.length;

	for(let i = 0; i < smallmatrix.length; i++) {
		bigmatrix[height + i] = smallmatrix[i];
	}

	return bigmatrix;
}

	/* nonConflictingRows(toprow, bottomrow)

		Are these two rows without conflicts between each other? A conflict is when one of the words from one row touch the words of another row (which breaks the crossword puzzle rule that only corners and edges may be the origin of a word, and never the center of the grid block).

	*/

function nonConflictingRows(toprow, bottomrow) {
	let rowtocheck;

	if(toprow[bottomrow.length] && toprow[bottomrow.length] == ' ') {
		return false;
	}

	if(toprow.length > bottomrow.length) {
		rowtocheck = bottomrow;
		altrowtocheck = toprow;
	} else {
		rowtocheck = toprow;
		altrowtocheck = bottomrow;
	}

	for(let i = 0; i < rowtocheck.length; i++) {
		if(rowtocheck[i] && altrowtocheck[i]) {
			if(rowtocheck[i] != ' ' && altrowtocheck[i] != ' ') {
				return false;
			}
		}
	}

	return true;
}

	/* incrementMatrixHorizontally(matrix)

		Add another blank column to the crossword puzzle grid.

	*/

function incrementMatrixHorizontally(matrix) {
	for(let i = 0; i < matrix.length; i++) {
		matrix[i] = ' ' + matrix[i];
	}

	return matrix;
}

	/* checkToBuildVertically(matrix, smallmatrix, widestline, tallestline)

		Should we build vertically? We should do so if the crossword puzzle is wider than it is taller, which will give us the most compact crossword puzzle possibility.

	*/

function checkToBuildVertically(matrix, smallmatrix, widestline, tallestline) {
	if(matrix.length <= smallmatrix.length) {
		return true;
	} else if(tallestline < widestline) {
		return true;
	} else if(widestline < tallestline) {
		return false;
	}

	return randomTrueFalse();
}

	/* randomTrueFalse()

		Random yes/no generator.

	*/

function randomTrueFalse() {
	return Math.random() > 0.5 ? true : false;
}

	/* getWidestLine(matrix)

		Given a matrix, returns the widest line.

	*/

function getWidestLine(matrix) {
	let widestlength = 0;

	for(let i = 0; i < matrix.length; i++) {
		let row = matrix[i];
		if(row && row.length && row.length > widestlength) {
			widestlength = row.length;
		}
	}

	return widestlength;
}

	/* getThinnestLine(matrix)

		Given a matrix, returns the thinnest line. This is the line with the most amount of black space to its right.

	*/

function getThinnestLine(matrix) {
	let thinnestlength = 999999;

	for(let i = 0; i < matrix.length; i++) {
		let row = matrix[i];
		if(row && row.length < thinnestlength) {
			thinnestlength = row.length;
		}
	}

	return thinnestlength;
}

	/* getTallestLine(matrix)

		Given a matrix, return the tallest line. This is the line with the least amount of blank space below it.

	*/

function getTallestLine(matrix) {
	return matrix.length;
}

	/* buildCrosswordBlocks(crosswordblocks)

		Build groups of words, each with one spine word.

	*/

function buildCrosswordBlocks(crosswordblocks) {
	let graphs = [];
	let lastacross = false;

	for (let word in crosswordblocks) {
		if (!crosswordblocks.hasOwnProperty(word) || word == '(unmatched)') continue;

		let subwords = crosswordblocks[word];
		let longestwordlength = getLongestWordLength(subwords);

		let across = true;

		if(areWeRandomizingAcrossDownChoices()) {
			across = randomTrueFalse();
		}

		let matrix = [];
		let matrixpositions = [];

		if(across) {
			matrix[longestwordlength - 1] = word;
			matrixpositions[word] = [longestwordlength - 1, 0];

			for(let i = 0; i < subwords.length; i++) {
				let subwordentry = subwords[i];

				let subword = subwordentry[0];
				let subletter = subwordentry[1];

				let matchingposition = findMatchingLetterMatrixPosition(matrix, word, subletter, longestwordlength - 2);
				let matchingoffset = findMatchingOffset(subword, subletter);
				matrixpositions[subword] = [longestwordlength - matchingoffset - 1, matchingposition];
				matrix = setLetterMatrixVertically(matrix, subword, longestwordlength - matchingoffset - 1, matchingposition);
			}
		} else {
			matrix = fillLetterMatrixVertically(matrix, word, longestwordlength + 1, 0);
			matrixpositions[word] = [0, longestwordlength];

			for(let i = 0; i < subwords.length; i++) {
				let subwordentry = subwords[i];

				let subword = subwordentry[0];
				let subletter = subwordentry[1];
				let matchingposition = findMatchingLetterMatrixPositionVertical(matrix, word, subletter, longestwordlength - 1);
				let matchingoffset = findMatchingOffset(subword, subletter);
				matrixpositions[subword] = [matchingposition, longestwordlength - matchingoffset];
				matrix = setLetterMatrixHorizontally(matrix, subword, matchingposition, longestwordlength - matchingoffset);
			}
		}
		let graph = {
			'matrix':matrix,
			'matrixpositions':matrixpositions,
			'across':across,
			'word':word,
		};

		graphs.push(graph);
	}

	if(crosswordblocks['(unmatched)']) {
		let graph = buildUnassignedCrosswordBlock(crosswordblocks['(unmatched)']);
		graphs.push(graph);
	}

	return graphs;
}

	/* buildUnassignedCrosswordBlock(unmatchedcrosswords)

		At the end of making our groups of words with spine words, we have smoe that could not be matched at all. Group these together as a block.

	*/

function buildUnassignedCrosswordBlock(unmatchedcrosswords) {
	let across = true;

	if(areWeRandomizingAcrossDownChoices()) {
		across = randomTrueFalse();
	}

	let longestwordlength = getLongestWordLength(unmatchedcrosswords);

	let matrix = [];
	let matrixpositions = [];

	if(across) {
		for(let i = 0; i < unmatchedcrosswords.length; i++) {
			let unmatchedcrossword = unmatchedcrosswords[i];
			matrix[i] = unmatchedcrossword;
			matrixpositions[unmatchedcrossword] = [0,i];
		}
	} else {
		for(let i = 0; i < unmatchedcrosswords.length; i++) {
			let unmatchedcrossword = unmatchedcrosswords[i];
			matrix = setLetterMatrixVertically(matrix, unmatchedcrossword, 0, i);
			matrixpositions[unmatchedcrossword] = [i,0];
		}
	}

	let graph = {
		'matrix':matrix,
		'matrixpositions':matrixpositions,
		'across':!across,
		'word':'(unmatched)',
	};

	return graph;
}

	/* insertLetterAtStringPosition(letter, string, position)

		Arrays are immutable within JavaScript. So, this method allows us to edit strings by inserting letters at positions.

	*/

function insertLetterAtStringPosition(letter, string, position) {
	if(!letter) {
		letter = ' ';
	}
	return string.substr(0, position) + letter + string.substr(position + 1);
}

	/* setLetterMatrixHorizontally(matrix, word, y, x)

		Build a graph from a group of words horizontally.

	*/

function setLetterMatrixHorizontally(matrix, word, y, x) {
	for(let i = 0; i < word.length; i++) {
		let position = i + x;
		if(!matrix[y]) {
			matrix[y] = '';
		}
		letters = matrix[y];

		if(letters.length < position) {
			while(letters.length < position) {
				letters += ' ';
			}
			letters += word[i];
		} else {
			letters = insertLetterAtStringPosition(word[i], letters, position);
		}

		matrix[y] = letters;
	}
	return matrix;
}

	/* setLetterMatrixVertically(matrix, word, y, x)

		Build a group from a group of words vertically.

	*/

function setLetterMatrixVertically(matrix, word, y, x) {
	for(let i = 0; i < word.length; i++) {
		let position = i + y;
		if(!matrix[position]) {
			matrix[position] = '';
		}
		letters = matrix[position];

		if(letters.length < x) {
			while(letters.length < x) {
				letters += ' ';
			}

			letters += word[i];
		} else {
			letters = insertLetterAtStringPosition(word[i], letters, x);
		}

		matrix[position] = letters;
	}
	return matrix;
}

	/* findMatchingOffset(word, letter)

		Find the position of a letter in a word.

	*/

function findMatchingOffset(word, letter) {
	for(let i = 0; i < word.length; i++) {
		if(word[i] == letter) {
			return i;
		}
	}
	return false;
}

	/* findMatchingLetterMatrixPositionVertical(matrix, word, subletter, index)

		Find the vertical position of a letter.

	*/

function findMatchingLetterMatrixPositionVertical(matrix, word, subletter, index) {
	for(let i = 0; i < word.length; i++) {
		let letter = word[i];
		if(!matrix[i]) {
			matrix[i] = '';
		}

		if(subletter == letter && (!matrix[i][index] || matrix[i][index] == ' ') && (!matrix[i][index + 2] || matrix[i][index + 2] == ' ')) {
			return i;
		}
	}
	return false;
}

	/* findMatchingLetterMatrixPosition(matrix, word, subletter, index)

		Find the horizontal position of a letter.

	*/

function findMatchingLetterMatrixPosition(matrix, word, subletter, index) {
	for(let i = 0; i < word.length; i++) {
		let letter = word[i];
		if(!matrix[index]) {
			matrix[index] = '';
		}
		if(subletter == letter && (!matrix[index][i] || matrix[index][i] == ' ') && (!matrix[index + 2] || !matrix[index + 2][i] || matrix[index + 2][i] == ' ')) {
			return i;
		}
	}
	return false;
}

	/* fillLetterMatrixVertically(matrix, word, index)

		Fill a matrix with the appropriate amount of white space to make it into a perfect rectangular block.

	*/

function fillLetterMatrixVertically(matrix, word, index) {
	let spacing = Array(index).join(" ");
	for(let i = 0; i < word.length; i++) {
		matrix[i] = spacing + word[i];
	}
	return matrix;
}

	/* buildUnmatchedBlock(unmatchedblock)

		Compose the unmatched block. Since nothing matches, there's nothing to build here.

	*/

function buildUnmatchedBlock(unmatchedblock) {
	return unmatchedblock;
}

	/* getLongestWordLength(words)

		Get the length of the longest word.

	*/

function getLongestWordLength(words) {
	let length = 0;

	for(let i = 0; i < words.length; i++) {
		let word = words[i];
		let wordlength = word[0].length;
		if(wordlength > length) {
			length = wordlength;
		}
	}

	return length;
}

	/* compactCrosswordBlockSources(graphs)

		Compact the graphs that will be used to make the full crossword puzzle graph.

	*/

function compactCrosswordBlockSources(graphs) {
	for(let i = 0; i < graphs.length; i++) {
		let graph = graphs[i];

		let matrix = graph['matrix'];

		graph = compactCrosswordBlockSource(graph);

		graphs[i] = graph;
	}
	return graphs;
}

	/* compactCrosswordBlockSource(graph)

		Compact a single crossword block source graph.

	*/

function compactCrosswordBlockSource(graph) {
	graph = compactCrosswordBlockBottom(graph);
	graph = compactCrosswordBlockTop(graph);
	graph = compactCrosswordBlockLeft(graph);
	graph = compactCrosswordBlockRight(graph);
	return graph;
}

	/* compactCrosswordBlockTop(graph)

		Compact the crossword block from the top.

	*/

function compactCrosswordBlockTop(graph) {
	let crosswordblock = graph['matrix'];
	let crosswordblocksolutions = graph['matrixpositions'];
	let crosswordblockacross = graph['across'];

	let crosswordblocklength = crosswordblock.length;

	for(let i = 0; i < crosswordblocklength; i++) {
		let row = crosswordblock[i];
		let trimmedrow = $.trim(row);
		if(!row || !trimmedrow.length) {
			crosswordblock.splice(i, 1);
			crosswordblocksolutions = incrementCrossWordBlockHeights(crosswordblocksolutions);
			i--;
			crosswordblocklength--;
		} else {
			i = crosswordblocklength;
		}
	}

	graph['matrix'] = crosswordblock;
	graph['matrixpositions'] = crosswordblocksolutions;

	return graph;
}

	/* incrementCrossWordBlockHeights(crosswordblocksolutions)

		Increase the vertical position of the words in a crossword block by one.

	*/

function incrementCrossWordBlockHeights(crosswordblocksolutions) {
	if(!crosswordblocksolutions) {
		return crosswordblocksolutions;
	}

	crosswordblockwords = Object.keys(crosswordblocksolutions);
	for(let i = 0; i < crosswordblockwords.length; i++) {
		let crosswordblockword = crosswordblockwords[i];

		crosswordblocksolutions[crosswordblockword][0]--;
	}
	return crosswordblocksolutions;
}

	/* incrementCrossWordBlockLengths(crosswordblocksolutions)

		Increase the horizontal position of the words in a crossword block by one.

	*/

function incrementCrossWordBlockLengths(crosswordblocksolutions) {
	if(!crosswordblocksolutions) {
		return crosswordblocksolutions;
	}

	crosswordblockwords = Object.keys(crosswordblocksolutions);
	for(let i = 0; i < crosswordblockwords.length; i++) {
		let crosswordblockword = crosswordblockwords[i];

		crosswordblocksolutions[crosswordblockword][1]--;
	}
	return crosswordblocksolutions;
}

	/* compactCrosswordBlockBottom(graph)

		Compact a crossword block on the bottom.

	*/

function compactCrosswordBlockBottom(graph) {
	let crosswordblock = graph['matrix'];
	let crosswordblocksolutions = graph['matrixpositions'];
	let crosswordblockacross = graph['across'];

	let crosswordblocklength = crosswordblock.length;
	for(let i = crosswordblocklength - 1; i >= 0; i--) {
		let row = crosswordblock[i];
		let trimmedrow = $.trim(row);
		if(!trimmedrow.length) {
			crosswordblock.splice(i, 1);
		} else {
			i = -1;
		}
	}

	graph['matrix'] = crosswordblock;
	graph['matrixpositions'] = crosswordblocksolutions;

	return graph;
}

	/* compactCrosswordBlockLeft(graph)

		Compact a crossword block on the left.

	*/

function compactCrosswordBlockLeft(graph) {
	let crosswordblock = graph['matrix'];
	let crosswordblocksolutions = graph['matrixpositions'];
	let crosswordblockacross = graph['across'];

	let crosswordblocklength = crosswordblock.length;

	let shorten = true;

	while(shorten) {
		if(crosswordblocklength) {
			for(let i = 0; i < crosswordblocklength; i++) {
				if(crosswordblock[i]) {
					let crosswordrow = crosswordblock[i];
					if(crosswordrow && crosswordrow[0] && crosswordrow[0] != ' ') {
						shorten = false;
						i = crosswordblocklength;
					}
				}
			}
		} else {
			shorten = false;
		}

		if(shorten) {
			for(let i = 0; i < crosswordblocklength; i++) {
				let crosswordrow = crosswordblock[i];
				crosswordblock[i] = crosswordrow.substr(1, crosswordrow.length);
			}

			crosswordblocksolutions = incrementCrossWordBlockLengths(crosswordblocksolutions);
		}
	}

	graph['matrix'] = crosswordblock;
	graph['matrixpositions'] = crosswordblocksolutions;

	return graph;
}

	/* compactCrosswordBlockRight(graph)

		Compact a crossword block on the right.

	*/

function compactCrosswordBlockRight(graph) {
	let crosswordblock = graph['matrix'];
	let crosswordblocksolutions = graph['matrixpositions'];
	let crosswordblockacross = graph['across'];

	let longestpiece = getWidestLine(crosswordblock) - 1;
	let crosswordblocklength = crosswordblock.length;

	let shorten = true;

	while(shorten) {
		if(crosswordblocklength) {
			for(let i = 0; i < crosswordblocklength; i++) {
				if(crosswordblock[i]) {
					let crosswordrow = crosswordblock[i];
					if(crosswordrow[longestpiece] && crosswordrow[longestpiece] != ' ') {
						shorten = false;
						i = crosswordblocklength;
					}
				}
			}
		} else {
			shorten = false;
		}
		if(shorten) {
			longestpiece--;
			for(let i = 0; i < crosswordblocklength; i++) {
				let crosswordrow = crosswordblock[i];
				crosswordblock[i] = crosswordrow.substr(0, crosswordrow.length - 1);
			}
		}
	}

	graph['matrix'] = crosswordblock;
	graph['matrixpositions'] = crosswordblocksolutions;

	return graph;
}

	/* generateCrosswordBlockSources(shuffledwords)

		Make the crossword block sources, which are the sub-graphs or mini-graphs. These will be put together to make the full crossword puzzle.

	*/

function generateCrosswordBlockSources(shuffledwords) {
	let crosswordblocks = [];
	let checkedcrosswords = [];
	let clues = [];
	for(let i = 0; i < shuffledwords.length; i++) {
		let shuffledword = shuffledwords[i];
		let word = shuffledword[0].toLowerCase();
		let clue = shuffledword[1];
		clues[word] = clue;

		crosswordclues[word] = clue;

		let checkedcrosswordkey = word + '-' + clue;

		let unmatchedwords = [];

		if(!checkedcrosswords[checkedcrosswordkey]) {
			let wordletters = getLettersHashCountForWord(word);
			let crosswordblock = [];

			for(let j = i + 1; j < shuffledwords.length; j++) {
				let nextshuffledword = shuffledwords[j];

				let nextword = nextshuffledword[0].toLowerCase();
				let nextclue = nextshuffledword[1];
				let nextcrosswordkey = nextword + '-' + nextclue;

				if(!checkedcrosswords[nextcrosswordkey]) {
					let matchingletter = getMatchingLetter(wordletters, nextword);
					if(matchingletter && matchingletter.length) {
						wordletters[matchingletter]--;
						checkedcrosswords[nextcrosswordkey] = true;
						crosswordblock.push([nextword, matchingletter]);
					}
				}
			}

			if(crosswordblock.length) {
				crosswordblocks[word] = crosswordblock;
			} else {
				unmatchedwords.push(word);
			}
			checkedcrosswords[checkedcrosswordkey] = true;
		}

		if(unmatchedwords.length) {
			crosswordblocks['(unmatched)'] = unmatchedwords;
		}
	}

	return {
		'blocks':crosswordblocks,
		'clues':clues,
	};
}

	/* getLettersHashPositionsForWord(word)

		Get a hash of the letters and the positions of the letters of a word.

	*/

function getLettersHashPositionsForWord(word) {
	let lettershash = [];

	for(let i = 0; i < word.length; i++) {
		let letter = word[i];
		if(lettershash[letter]) {
			lettershash[letter].push(i);
		} else {
			lettershash[letter] = [i];
		}
	}

	return lettershash;
}

	/* getLettersHashCountForWord(word)

		Get a hash of the counts for the letters of a word.

	*/

function getLettersHashCountForWord(word) {
	let lettershash = [];

	for(let i = 0; i < word.length; i++) {
		let letter = word[i];
		if(lettershash[letter]) {
			lettershash[letter]++;
		} else {
			lettershash[letter] = 1;
		}
	}

	return lettershash;
}

	/* getMatchingLetter(letters, nextword)

		Get the matching letter between two overlapping words.

	*/

function getMatchingLetter(letters, nextword) {
	let matchingletter = '';

	for(let i = 0; i < nextword.length; i++) {
		let letter = nextword[i];
		if(letters[letter]) {
			return letter;
		}
	}

	return matchingletter;
}

	/* shuffle(array)

		Randomize array.

	*/

function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}
