const x = 'fa-times';
const o = 'fa-circle';

var board = [0,0,0,0,0,0,0,0,0];

const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');

const c4 = document.getElementById('c4');
const c5 = document.getElementById('c5');
const c6 = document.getElementById('c6');

const c7 = document.getElementById('c7');
const c8 = document.getElementById('c8');
const c9 = document.getElementById('c9');



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

var count = 0;
function add_x(i){

    let id = `c${i}`;
    count=count+1;
    document.getElementById(id).childNodes[0].classList.add('fa-times');
    document.getElementById(id).onclick = null;
    board[i-1]=1;
    function myFunction() {
        console.log("Selected = ", id);
        if (count==5){
            document.getElementById('display').innerHTML = "NoBody";
        }
        else{heart();}
        
      }
      
      setTimeout(myFunction, 200);
      
    return;

}



function heart(){
    // check test case 5
   
    let bestMove;
    let bestScore = -Infinity;
   

    for (let i = 0; i<9; i++){
       

        if (board[i]==0){
            
            board[i]=2;
         
            let score = minmax(board, 0, false);
            board[i]=0;
            if (score>bestScore){
                bestScore = score;
                bestMove = i;
            }
        }
    }

    board[bestMove] = 2; 
    let result1 = checkWinner(board);
    let id = `c${bestMove+1}`;


    document.getElementById(id).childNodes[0].classList.add('fa-circle');
    document.getElementById(id).onclick=null;

    let result = checkWinner(board);
    if (result!=null){
        endGame();
    }
    console.log(result);
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

var player = 1;

// function add_x(i){

//     player = 1;
//     var id = `c${i}`;
//     document.getElementById(id).childNodes[0].classList.add('fa-times');
//     document.getElementById(id).onclick = null;
//     board[i-1]=1;
//     function myFunction() {s
//         console.log("Selected = ", id);
//         heart();
//       }
//       setTimeout(myFunction, 1000);
      
//     return;

// }

// function add_o(i){
//     player = 2;

//     var id = `c${i}`;
//     console.log(id);
//     document.getElementById(id).childNodes[0].classList.add('fa-circle');
//     document.getElementById(id).onclick = null;
//     board[i-1]=2;

// }


// function core(){
//     let bestMove;
//     let bestScore = -10000;
    

//     for (let i = 0; i<9; i++){
        

//         if (board[i]==0){
//             board[i]=2;
//             let score = minmax(board, 0, false);
//             board[i]=0;
//             if (score>bestScore){
//                 bestScore = score;
//                 bestMove = i;
//             }
//         }
//     }
//     board[bestMove] = 2;
  
//     add_o(bestMove+1);
//     console.log("BestMove = ",bestMove);  
// }
function remove_listeners(){
    for(i=1;i<10;i++){
        let id = `c${i}`;
        document.getElementById(id).onclick=null;
    }
}

function reset(){
    remove_listeners();
    count=0;
    for(let i = 0; i<9; i++){
        board[i]=0;
        let id = `c${i+1}`;
        document.getElementById(id).onclick=null;
        document.getElementById(id).addEventListener("click", function(){add_x(i+1)}, { once: true });
        document.getElementById(id).childNodes[0].classList.remove('fa-times');
        document.getElementById(id).childNodes[0].classList.remove('fa-circle');
    }
    console.log(board);
    location.reload();
}

function endGame(){
    let result = checkWinner();

    for(let i = 0; i<9; i++){
        let id = `c${i+1}`;
        document.getElementById(id).onclick = null;
    }

    if (result==1){
        document.getElementById('display').innerHTML = "YOU";
    }

    else if (result == 2){
        document.getElementById('display').innerHTML = "A.I";
    }

    else{
        document.getElementById('display').innerHTML = "NoBody";
    }


}