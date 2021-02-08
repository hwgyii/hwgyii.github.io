//IMPORTANT VARIABLES
var isSinglePlayer;
var board = [[-1, -1, -1],
             [-1, -1, -1],
             [-1, -1, -1]];
var player1turn;
var playing;


//GAME FUNCTIONS

//ADDS IMAGE TO BOARD
function changeImage(row, col) {
    //THE ID OF THE DIV WHERE THE IMAGE WILL BE ADDED
    const id = row.toString().concat(col.toString());

    //THE IMAGE
    const img = document.createElement("img");
    img.id = "img-tile"; //ID OF THE IMAGE FOR REMOVING PURPOSES WHEN RESETTING GAME

    //WHAT IMAGE TO ADD(BASED ON THE PLAYER WHO MADE THE MOVE)
    if (board[row][col] == 0) {
        img.src = "../images/o.png";
    }
    else {
        img.src = "../images/x.png";
    }
    
    //ADDING THE IMAGE
    document.getElementById(id).append(img);
}

//RESETS/REMOVES IMAGES IN THE BOARD
function resetBoard() {
    for (var i = 0; i < 3; i ++) {
        for (var j = 0; j < 3; j ++) {
            const id = i.toString().concat(j.toString()); //ID OF THE DIV WHERE WE WILL REMOVE THE IMAGE
            try {
                document.getElementById(id).removeChild(document.getElementById("img-tile")); //REMOVING THE IMAGE
            }
            catch(err) {}
        }
    }
}

//CHECK IF SOMEONE WON returns true if yes, false otherwise
function checkWin(n) {
    //horizontal
    for (var col = 0; col < 3; col ++) {
        if (n[0][col] === n[1][col] && n[0][col] === n[2][col] && n[0][col] != -1) return true;
    }

    //vertical
    for (var row = 0; row < 3; row ++) {
        if (n[row][0] === n[row][1] && n[row][0] === n[row][2] && n[row][0] != -1) return true;
    }

    //diagonal
    if (n[0][0] === n[1][1] && n[0][0] === n[2][2] && n[0][0] != -1) return true;
    else if (n[0][2] === n[1][1] && n[0][2] === n[2][0] && n[0][2] != -1) return true;

    return false;
}

//CHECK IF THE GAME IS TIE returns true if yes, false otherwise
function checkTie(n) {
    for (var row = 0; row < 3; row ++) {
        for (var col = 0; col < 3; col ++) {
            if (n[row][col] == -1) return false;
        }
    }
    return true;
}

//CHECKS WHO WON THE GAME returns true if the user/player1, false otherwise
function getWin(n) {
     //horizontal
     for (var col = 0; col < 3; col ++) {
        if (n[0][col] === n[1][col] && n[0][col] === n[2][col] && n[0][col] == 0) return true;
    }

    //vertical
    for (var row = 0; row < 3; row ++) {
        if (n[row][0] === n[row][1] && n[row][0] === n[row][2] && n[row][0] == 0) return true;
    }

    //diagonal
    if (n[0][0] === n[1][1] && n[0][0] === n[2][2] && n[0][0] == 0) return true;
    else if (n[0][2] === n[1][1] && n[0][2] === n[2][0] && n[0][2] == 0) return true;

    return false;
}

//RETURNS ARRAY OF "<row_value><col_value>" THAT IS AVAILABLE
function availableMoves() {
    var available = [];
    for (var row = 0; row < 3; row ++) {
        for (var col = 0; col < 3; col ++) {
            if(board[row][col] == -1) available.push(row.toString().concat(col.toString())); 
        }
    }
    return available;
}

//AI ALGORITHMS/FUNCTIONS
function utility(idealBoard) {
    if (checkWin(idealBoard)) {
        if (getWin(idealBoard)) return -1;
        return 1;
    }
    return 0;
}

function maxValue(idealBoard, alpha, beta) {
    var m = -Infinity;

    var newBoard = idealBoard.slice();

    var available = availableMoves(newBoard);

    for(var i = 0; i < available.length; i ++) {
        newBoard[parseInt(available[i][0])][parseInt(available[i][1])] = 1;
        const v = value(newBoard, false, alpha, beta);
        newBoard[parseInt(available[i][0])][parseInt(available[i][1])] = -1;
        
        m = Math.max(m, v);

        if (v >= beta) return m;

        alpha = Math.max(alpha, m);
    }
    return m;
}

function minValue(idealBoard, alpha, beta) {
    var m = Infinity;

    var newBoard = idealBoard.slice();

    var available = availableMoves(newBoard);

    for(var i = 0; i < available.length; i ++) {
        newBoard[parseInt(available[i][0])][parseInt(available[i][1])] = 0;
        const v = value(newBoard, true, alpha, beta);
        newBoard[parseInt(available[i][0])][parseInt(available[i][1])] = -1;
        
        m = Math.min(m, v);

        if (v <= alpha) return m;

        beta = Math.min(beta, m);
    }
    return m;
}

function value(idealBoard, aiTurn, alpha, beta) {
    if (checkWin(idealBoard) || checkTie(idealBoard)) return utility(idealBoard);
    if (aiTurn) return maxValue(idealBoard, alpha, beta);
    else return minValue(idealBoard, alpha, beta);
}

function aiMove(board) {
    var newboard = board.slice();

    var bestValue = -Infinity;

    var bestMove = "";

    var available = availableMoves(newboard);

    for(var i = 0; i < available.length; i ++) {
        newboard[parseInt(available[i][0])][parseInt(available[i][1])] = 1;
        var newValue = value(newboard, false, -Infinity, Infinity);
        newboard[parseInt(available[i][0])][parseInt(available[i][1])] = -1;
        
        if (newValue > bestValue) {
            bestMove = available[i];
            bestValue = newValue;
        }
    }
    return bestMove;
}



//EVENT LISTENER FOR DYNAMICALLY ADDED ELEMENTS
document.addEventListener('click',function(e){
    //IF BACK BUTTON IS CLICKED
    if(e.target && e.target.id== 'back-button') {
        //CHANGING THE TITLE
        document.getElementById("title").innerHTML = "Tic-Tac-Toe";

        //REMOVING THE BUTTONS
        document.getElementById("buttons").removeChild(document.getElementById("reset-button"));
        document.getElementById("buttons").removeChild(document.getElementById("back-button"));

        //CREATING BUTTONS TO ADD
        const one = document.createElement("BUTTON");
        one.id = "one-player";
        one.innerHTML = "1 Player";

        const two = document.createElement("BUTTON");
        two.id = "two-player";
        two.innerHTML = "2 Player";

        //ADDING THE BUTTONS
        document.getElementById("buttons").append(one);
        document.getElementById("buttons").append(two);

        //PLAYING == FALSE BECAUSE THE USER WILL CHANGE MODE IN THIS CASE
        playing = false;
    }

    //RESET GAME
    else if(e.target && e.target.id == 'reset-button') {
        //RESETTING BOARD
        board = [[-1, -1, -1],
                 [-1, -1, -1],
                 [-1, -1, -1]];
        resetBoard(); //CALLS THE FUNCTIONS THAT REMOVES THE IMAGES IN THE BOARD
        playing = true; //PLAYING == TRUE BECAUSE IT IS A NEW GAME
        player1turn = true;
    }

    //SINGLE PLAYER MODE TIC TAC TOE
    else if(e.target && e.target.id== 'one-player') {
        document.getElementById("title").innerHTML = "Single Player Tic-Tac-Toe";
    
        document.getElementById("buttons").removeChild(document.getElementById("one-player"));
        document.getElementById("buttons").removeChild(document.getElementById("two-player"));
        
        const reset = document.createElement("BUTTON");
        reset.id = "reset-button";
        reset.innerHTML = "Reset";
    
        const back = document.createElement("BUTTON");
        back.id = "back-button";
        back.innerHTML = "Back";
    
        document.getElementById("buttons").append(back);
        document.getElementById("buttons").append(reset);

        board = [[-1, -1, -1],
                 [-1, -1, -1],
                 [-1, -1, -1]];
        resetBoard();
        isSinglePlayer = true;
        playing = true;
        player1turn = true;
    }

    //MULTI PLAYER MODE TIC TAC TOE
    else if(e.target && e.target.id == 'two-player') {
        document.getElementById("title").innerHTML = "Multi Player Tic-Tac-Toe";

        document.getElementById("buttons").removeChild(document.getElementById("one-player"));
        document.getElementById("buttons").removeChild(document.getElementById("two-player"));
    
        const reset = document.createElement("BUTTON");
        reset.id = "reset-button";
        reset.innerHTML = "Reset";
    
        const back = document.createElement("BUTTON");
        back.id = "back-button";
        back.innerHTML = "Back";
    
        document.getElementById("buttons").append(back);
        document.getElementById("buttons").append(reset);

        board = [[-1, -1, -1],
                 [-1, -1, -1],
                 [-1, -1, -1]];
        isSinglePlayer = false;
        playing = true;
        player1turn = true;
        resetBoard();
    }

    //GAME BUTTON
    else if(e.target) {
        const row = parseInt(e.target.id[0]);
        const col = parseInt(e.target.id[1]);

        if (e.target.id.length != 2){}
        else if(board[row][col] == -1 && playing && ((isSinglePlayer && player1turn) || (!isSinglePlayer))) {
            //IF IT'S PLAYER1'S TURN
            if (player1turn) {
                board[row][col] = 0; //user is always 0 (player 1)
            }
            //IF IT IS NOT PLAYER1'S TURN AND IT IS MULTIPLAYER
            else if (!player1turn && !isSinglePlayer) {
                board[row][col] = 1; // player 2
            }

            //CHANGING TO ACCOMODATE WHO'S TURN IT IS NOW
            player1turn = !player1turn;

            //ADDING IMAGE IN THE BOARD
            changeImage(row, col);

            //CHECKING IF SOMEONE WON
            if (checkWin(board)) {

                var isPlayer1won = getWin(board); //CHECKING IF PLAYER1 WON
                
                var dialog = ""; //STRING TO STORE THE DIALOG TO SHOW

                if (isPlayer1won && isSinglePlayer) {
                    dialog = "You Won!";
                }
                else if (!isPlayer1won && isSinglePlayer) {
                    dialog = "You Lost!";
                }
                else if (isPlayer1won && !isSinglePlayer) {
                    dialog = "Player 1 Won!";
                }
                else if (!isPlayer1won && !isSinglePlayer) {
                    dialog = "Player 2 Won!";
                }

                alert(dialog); //ALERTING THE RESULT OF THE GAME
                playing = false; //CHANGING PLAYING TO FALSE
            }

            else if (checkTie(board)) {
                alert("It's a TIE!");
                playing = false;
            }

            //IF SINGLE PLAYER, AI's TURN
            if(isSinglePlayer && !player1turn && playing) {
                const move = aiMove(board);

                const row = parseInt(move[0]);
                const col = parseInt(move[1]);

                board[row][col] = 1;

                changeImage(row, col);


                player1turn = !player1turn;


                //CHECKING IF SOMEONE WON
                if (checkWin(board)) {

                    var isPlayer1won = getWin(board); //CHECKING IF PLAYER1 WON
                    
                    var dialog = ""; //STRING TO STORE THE DIALOG TO SHOW

                    if (isPlayer1won && isSinglePlayer) {
                        dialog = "You Won!";
                    }
                    else if (!isPlayer1won && isSinglePlayer) {
                        dialog = "You Lost!";
                    }
                    else if (isPlayer1won && !isSinglePlayer) {
                        dialog = "Player 1 Won!";
                    }
                    else if (!isPlayer1won && !isSinglePlayer) {
                        dialog = "Player 2 Won!";
                    }

                    alert(dialog); //ALERTING THE RESULT OF THE GAME
                    playing = false; //CHANGING PLAYING TO FALSE
                }

                else if (checkTie(board)) {
                    alert("It's a TIE!");
                    playing = false;
                }
            }
        }
    }

 });