board = [0,0,0,0,0,0,0,0,0];


function checkWinner(){
    let winner = null;
  
   
    if ((board[0] == 1 && board[1] == 1 && board[2] == 1) ||
            (board[3] == 1 && board[4] == 1 && board[5] == 1) ||
            (board[6] == 1 && board[7] == 1 && board[8] == 1) ||
            (board[0] == 1 && board[4] == 1 && board[8] == 1) ||
            (board[2] == 1 && board[4] == 1 && board[6] == 1) ||
            (board[0] == 1 && board[3] == 1 && board[6] == 1) ||
            (board[1] == 1 && board[4] == 1 && board[7] == 1) ||
            (board[2] == 1 && board[5] == 1 && board[8] == 1)) {

            winner = 1;
    }


    else if ((board[0] == 2 && board[1] == 2 && board[2] == 2) ||
        (board[3] == 2 && board[4] == 2 && board[5] == 2) ||
        (board[6] == 2 && board[7] == 2 && board[8] == 2) ||
        (board[0] == 2 && board[4] == 2 && board[8] == 2) ||
        (board[2] == 2 && board[4] == 2 && board[6] == 2) ||
        (board[0] == 2 && board[3] == 2 && board[6] == 2) ||
        (board[1] == 2 && board[4] == 2 && board[7] == 2) ||
        (board[2] == 2 && board[5] == 2 && board[8] == 2)) {

            winner = 2;
    }
 
    else if (!board.includes(0)) {
            winner = 0;
    }

   
    // 0    -> draw
    // 1    -> Player wins
    // 2    -> Ai Wins
    // null -> game is still on
    return winner;



}


function display(){
    console.log(board[0],board[1], board[2]);
    console.log(board[3],board[4], board[5]);
    console.log(board[6],board[7], board[8]);
    console.log();
}

function ai_move(){
    let bestScore = -Infinity;
    let bestMove;
    for(let i=0; i<9; i++){
        if (board[i]==0){
            board[i]=2;
            let score = minmax(board, 0, false);
            board[i]=0;
         
            if (score>bestScore){
                console.log(score);
                bestScore=score;
                bestMove = i;
            }
        }
    }
 
    board[bestMove] = 2;
    display();
}

function get_move(){
    let a = prompt("Enter ur move = ");
    var index = a-1;
    board[index]=1;
    ai_move();
}

function minmax(board, depth, isMaximizing){
    
    let result = checkWinner();
    if (result == 1){
        return -1;
    }
    else if (result == 2){
        return 1;
    }
    else if(result == 0) {
        return 0;
    }

    if (isMaximizing){

        let bestScore = -Infinity;
   
        for(let i=0; i<9; i++){
            if (board[i]==0){
                board[i]=2;
                let score = minmax(board, depth+1, false);
                board[i]=0;
            
                if (score>bestScore){
             
                    bestScore=score;
              
                }
            }
        }
        return bestScore;
    
    }

    else{

        let bestScore = Infinity;
   
        for(let i=0; i<9; i++){
            if (board[i]==0){
                board[i]=1;
                let score = minmax(board, depth + 1, true);
                board[i]=0;
            
                if (score<bestScore){
             
                    bestScore=score;
              
                }
            }
        }
        return bestScore;
    
    }






 
 

}


for (let i=0; i<5;i++){
    get_move();


}

function max(i,j){

    if (i>j){
        return i;
    }

    else return j;

}

function min(i,j){

    if (i>j){
        return j;
    }

    else return i;

}