function one(){
$('#game').hide()
$('#panel').hide()
$('.startUp').hide()
$('.popUpBtn').hide()
$('h5').hide()
$('.about').hide()
$('.startUp').slideDown(1000)
$('.popUpBtn').fadeIn(2000)
$('h5').fadeIn(3000)
}
one()

$('#start').on('click', function() {

$('.startUp').slideUp(1000)
$('#game').slideDown(3000)
$('#panel').slideDown(3000)

});

$('#about').on('click', function() {

$('.startUp').slideUp(1000)
$('.about').slideDown(3000)

});

$('#back').on('click', function() {

$('.about').slideUp(1000)
$('.startUp').slideDown(3000)

});


var player1Name="" 
var player2Name=""
var turn = "";
var grid =  [[0,0,0],[0,0,0],[0,0,0]];
var winner = 0
var count=0;


function setTurn(){
	var random = Math.floor((Math.random() * 2) + 1);
	hasWinner=0;
	if(random == 1){
		turn = player1Name;
		msg(player1Name+"'s turn now!");
	}
	else{
		turn = player2Name;
		msg(player2Name+"'s turn now!");
	}
}

function msg(x){
	return $("#board").text(x);
}

function clear(){
		turn = "";
		grid =  [[0,0,0],[0,0,0],[0,0,0]];
		msg("");
		$(".tile").map(function() {
    		$(this).text("");
		}).get();
		winner = 0;
		count = 0;
}

$("#playButton").click(function (){

	if(winner==1){
		clear();
	}

	player1Name = $("#player1").val();
	player2Name = $("#player2").val();

	if(player1Name=="" || player2Name==""){
		alert("Please set player all the names.");
		return;
	}

	setTurn();
});

$(".tile").click(function (){

	if(player1Name=="" || player2Name==""){
		alert("Please set player all the names.");
		return;
	}

	var row = $(this).parent().index();
	var column = $(this).index();

	if(grid[row][column]!==0){
		alert("This position is taken. Please try other position.");
		return;
	}
	if(winner==1){
		alert("Please click play again");
		return;
	}

	if(turn==player1Name){
		count++;
		$(this).text("O");
		grid[row][column] = 1;
		var Won = winnerCheck(1,player1Name);
		if(!Won){
			if(count>=9){
				msg("Match Drawn!");
				count=0;
				$("#playButton").text("Play again");
				winner=1;
				return;
			}else{
				turn = player2Name;
				msg(player2Name+"'s turn now!");
			}
			return;	
		}
		else{
			return;
		}
		
	}
	else if(turn==player2Name){
		count++;
		$(this).text("X");
		grid[row][column] = 2;
		var Won = winnerCheck(2,player2Name);
		if(!Won){
			if(count>=9){
				msg("Match Drawn!");
				count=0;
				$("#playButton").text("Play again");
				winner = 1;
				return;
			}else{
				turn = player1Name;
				msg(player1Name+"'s turn now!");
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

		(grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)||
		(grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)


		){
		if(playerName === player1Name) {
		msg(playerName+" won the game!" + "\n" + player2Name + " is a sore loser!!");
		}else{
		msg(playerName+" won the game!" + "\n" + player1Name + " is a sore loser!!");
		}
		winner = 1;
		count=0;
		$("#playButton").text("Play again");
		return true;
	}
	return false;
}

