var PlayerName1 = '';
var playerName2 = '';
var turn = '';
var grid = [[0,0,0],[0,0,0],[0,0,0]]
var winner = 0;
var count = 0;

function setTurn() {
	var random = Math.floor((Math.random()*2)+1);
	winner = 0;
	if(r === 1) {
		turn = playerName2;
		printMsg(playerName2+ "'s turn now");

	} else {
		turn = playerName1;
		printMsg(playerName1+ "'s turn now");
	}
}
function printMsg(string) {
	return $('#msg').html(x);
}

$('#reset').click(function clear() {
	turn = '';
	grid = [[0,0,0],[0,0,0],[0,0,0]]
	winner = 0;
	count = 0;

	$('.tiles').map(function() {
		$(this).text('')
	}.get()
});

$('#start').click(function() {
	if(winner === 1) {
		clear();
	}
	playerName1 = $('inputName1').val();
	playerName2 = $('inputName2').val();

	if(playerName1 = '' || playerName2 = '') {
		alert("Please enter players names!");
	}
	setTurn();
});

$('.tiles').click(function() {
	if(playerName1 = '' || playerName2 = '') {
		alert("Please enter players names!");
	}
	var row = $(this).index();
	var column = $(this).index();
	if(winner >= 1) {
		alert('Please click play again');
	}
	if(grid[row][column] !== 0) {
		alert('Position is taken, try again')
		return;
	}
});