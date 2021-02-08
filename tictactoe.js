//IMPORTANT VARIABLES
var isSinglePlayer;
var board = [[-1,-1,1],[-1,-1,-1],[-1,-1,-1]];
var player1turn;
var playing;

//EVENT LISTENER FOR DYNAMICALLY ADDED ELEMENTS
document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'back-button') {
        document.getElementById("title").innerHTML = "Tic-Tac-Toe";

        document.getElementById("buttons").removeChild(document.getElementById("reset-button"));
        document.getElementById("buttons").removeChild(document.getElementById("back-button"));

        const one = document.createElement("BUTTON");
        one.id = "one-player";
        one.innerHTML = "1 Player";

        const two = document.createElement("BUTTON");
        two.id = "two-player";
        two.innerHTML = "2 Player";

        document.getElementById("buttons").append(one);
        document.getElementById("buttons").append(two);

        playing = false;
    }

    //RESET GAME
    else if(e.target && e.target.id == 'reset-button') {
        //just reset game
        console.log("resetted");
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

        isSinglePlayer = true;
        playing = true;
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

        isSinglePlayer = false;
        playing = true;
    }

    //GAME BUTTON
    else if(e.target) {
        const row = e.target.id[0];
        const col = e.target.id[1];

        if (playing) {
            console.log("ROW: " + row + "\nCOL: " + col);
        }
        else {
            console.log("Not playing");
        }
    }

 });