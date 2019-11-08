//Function to hide every element of the game interface and displays the main menu using Jquery;

function one(){
$('#game').hide();
$('#panel').hide();
$('.startUp').hide();
$('.popUpBtn').hide();
$('h5').hide();
$('.about').hide();
$('.startUp').slideDown(1000);
$('.popUpBtn').fadeIn(2000);
$('h5').fadeIn(3000)
};
//Invoking the function so it works 
one()
//once the button with the id (start) is clicked it will invoke a function
$('#start').on('click', function() {
//These three lines work on changing the page from the main menu to the game interface
$('.startUp').slideUp(1000);
$('#game').slideDown(2000);
$('#panel').slideDown(2000);

});
//once the button with the id (about) is clicked it will invoke a function
$('#about').on('click', function() {
//These two lines work on changing the page from the main menu to the about page
$('.startUp').slideUp(1000);
$('.about').slideDown(3000);

});
//once the button with the id (back) is clicked it will invoke a function
$('#back').on('click', function() {
//These two lines work on changing the page from the about page to the main menu
$('.about').slideUp(1000);
$('.startUp').slideDown(3000);

});
//once the button with the id (back) is clicked it will invoke a function
$('#mainMenu').click(function() {
//These three lines work on changing the page from the game interface page to the main menu
$('#game').fadeOut(1000);
$('#panel').fadeOut(1000);
$('.startUp').fadeIn(2000);

})

//Now the main functions 
//first we start by invoking the main function which has a multiple functions nested inside of it
main()
function main() {
//Declaring variables that we need
var player1Name = ""; 
var player2Name = "";
//to check whose turn is it;
var turn = "";
//the 9 places where you can put either X or O
var grid =  [[0,0,0],[0,0,0],[0,0,0]];
//checks if the game is finished
var winner = 0;
//counts the moves if the moves are >= 9 then the game is stopped
var count = 0;

//First function is randomizing the turn so each time a diffrent player starts

function setTurn() {
// We generate a number between 1 or two
	var random = Math.floor((Math.random() * 2) + 1);
//Set the winner to zero so we know the game hasn't started yet
	winner = 0;
// check if the random number is one
	if(random == 1) {
//then we give the turn to player 2
		turn = player2Name;
// we send a message telling the players who will start first by invoking the function msg
		msg(player1Name+"'s turn now!");

	}else {

		turn = player1Name;
		msg(player2Name+"'s turn now!");

	}
}
// function msg which gives the messages that we want the players to see by adding text to the div we already have some text
function msg(x) {
	return $("#board").text(x);
}
//This function is used when we want to reset the game or after the end of a game
function clear() {

		turn = "";
		grid =  [[0,0,0],[0,0,0],[0,0,0]];
		msg("");
// We use map to generate a new empty array
		$(".tile").map(function() {
    		$(this).text("");

		});

		winner = 0;
		count = 0;
}
// oce the start
$("#playButton").click(function() {

	if(winner === 1) {

		clear();
	}

	player1Name = $("#player1").val();
	player2Name = $("#player2").val();

	if(player1Name === "" || player2Name === "") {

		alert("Please set player all the names.");

		return;
	}

	setTurn();

});

$(".tile").click(function() {

	if(player1Name=="" || player2Name=="") {

		alert("Please set player all the names.");

		return;
	}

	var row = $(this).parent().index();
	var column = $(this).index();

	if(grid[row][column] !== 0) {

		alert("This position is taken. Please try other position.");

		return;
	}
	if(winner === 1) {

		alert("Please click play again");

		return;
	}

	if(turn==player1Name) {

		count++;

		$(this).text("O");

		grid[row][column] = 1;

		var Won = winnerCheck(1,player1Name);

		if(!Won) {

			if(count >= 9) {

				msg("Match Drawn!");
				count=0;

				$("#playButton").text("Play again");

				winner = 1;

				return;

			}else{

				turn = player2Name;

				msg(player2Name + "'s turn now!");

			}

			return;

		}

		else{

			return;

		}
		
	}
	else if(turn === player2Name) {

		count++;

		$(this).text("X");

		grid[row][column] = 2;

		var Won = winnerCheck(2,player2Name);

		if(!Won) {

			if(count >= 9) {

				msg("Match Drawn!");

				count = 0;

				$("#playButton").text("Play again");

				winner = 1;

				return;

			}else{

				turn = player1Name;

				msg(player1Name + "'s turn now!");

			}
			return;	
		}
		else{
			return;
		}
		
	}

});

function winnerCheck(n,playerName){
	if(

		(grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
		(grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
		(grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||

		(grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
		(grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
		(grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||

		(grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)	||
		(grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)


		){
		if(playerName === player1Name) {

		msg(playerName+" won the game!" + "\n" + player2Name + " is a sore loser!!");

		}else{

		msg(playerName+" won the game!" + "\n" + player1Name + " is a sore loser!!");
		}

		winner = 1;
		count = 0;

		$("#playButton").text("Play again");

		return true;
	}

	return false;
}

}

