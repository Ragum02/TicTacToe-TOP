const start = document.querySelector("#start");
const restart = document.querySelector("#restart");

const result = document.querySelector("#result");

const cells = Array.from(document.querySelectorAll(".cell")); //transform the cell to array for index in event

let players = [];
let playerCurrentIndex = 0;
let gameFinish = false;

let gameboard = ["","","","","","","","",""];

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];



start.addEventListener("click", startGame);
restart.addEventListener("click", restartGame);


//// Player creation ////

function createPlayer(name, symbol) {
    return{
        name: name,
        symbol: symbol
    }
};

///////////////////////////////


function startGame(){
    const player1Name = document.querySelector("#player1").value;
    const player2Name = document.querySelector("#player2").value;
    console.log(player1Name);
    console.log(player2Name);

    result.style.color = "rgba(48, 44, 38)";

    if(player1Name !== "" && player2Name !==""){
        if(player1Name === player2Name){
            result.style.color = "red";
            result.textContent = "PLAYER 1 and PLAYER 2 name must be different."
        }
        players = [
            createPlayer(player1Name, "X"),
            createPlayer(player2Name, "O")
        ]

        ///
        currentPlayerIndex = Math.floor(Math.random() * 2); ///randomize who player first
        gameFinish = false;  ///in case the game was finish just before;
        gameboard = ["","","","","","","","",""];
        ///

        result.textContent = `${players[currentPlayerIndex].name}, you're turn.`;
    } 
    else if(player1Name === "" && player2Name === ""){
        result.style.color = "red";
        result.textContent = "PLAYER 1 and PLAYER 2 name required !";
        return; ///important to stop the script ! 
    } 
    else if(player1Name === ""){
        result.style.color = "red";
        result.textContent = "PLAYER 1 name is required !";
        return; ///important to stop the script !
    } 
    else if(player2Name === ""){
        result.style.color = "red";
        result.textContent = "PLAYER 2 name is required !";
        return; ///important to stop the script !
    };

///
cells.forEach((cell,index) => {
    cell.textContent = ""; ///clean the cells at each start
    cell.addEventListener("click", () => handlePlayerMove(index)); /// FUCK YOU , if you just put handlePlayerMove(index) without the arrow function, the game insta play solo
})
///
};

///////////////////////////////

function restartGame(){
    gameFinish = false;
    gameboard = ["","","","","","","","",""];
    currentPlayerIndex = Math.floor(Math.random() * 2); /// randomize the player turn again

    cells.forEach(cell => {     
        cell.textContent = "";   ///reset cells content
    });


    result.textContent = `${players[currentPlayerIndex].name}, you're turn.`;
};


///////////////////////////////////////////////////////

function handlePlayerMove(index){
    if(gameFinish || gameboard[index] !=="") return;


    gameboard[index] = players[currentPlayerIndex].symbol; ///put the player symbol in the gameboard array
    cells[index].textContent = players[currentPlayerIndex].symbol; ///display the player symbol on the cell corresponding

    if(winState()){
        gameFinish = true;
        result.textContent = `${players[currentPlayerIndex].name} win !`;
    } else if(!gameboard.includes("")){///if the gameboard is full without combo
        gameFinish = true;
        result.textContent = "Draw";
    }else{ ///this else is very important, if you miss it , the player turn doesn't change
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        result.textContent = `${players[currentPlayerIndex].name}, you're turn.`
    }
}

////////////////////////////////////////////////////////////////////////////

function winState(){
    for(let i = 0; i < winCombos.length; i++){ ///check every winCombos array
        const [a,b,c] = winCombos[i];   ///create "array" to compare to every winCombos items

        if(gameboard[a] !== "" && gameboard[a] === gameboard[b] && gameboard[b] === gameboard[c]){
            return true;
        }
    }
    return false;
}