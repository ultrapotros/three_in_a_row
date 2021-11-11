let player = 0;
var arrayCounter = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
const arrayLines= [[4,9,2],[3,5,7],[8,1,6],[4,3,8],[9,5,1],[2,7,6],[4,5,6],[2,5,8]];
const arrayLinesIdByid =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var counter = 0;
var arrayPlayer = [];
var arrayComputer = [];
const map = [4,9,2,3,5,7,8,1,6]; 
let mapClicked = [true,true,true,true,true,true,true,true,true]; 
function start() {
    var messageBox = document.querySelector('#message');
    messageBox.innerHTML = 'Player 1';
    player = 0;
    activateCells = document.querySelectorAll('.inputCells');
    activateCells.forEach(element => {element.disabled = false;element.value = ""});
    arrayCounter = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    counter = 0;
    arrayPlayer = [];
    arrayComputer = [];
}   // ahora tengo las lines ganadoras, con buscar luego el index en el array map se que casilla picar

function clickControl(a,b,c,id) {    //a, b y c son las posibles lineas, para c un 8 si solo hay dos lineas posibles y 
    if (player == 0) {   
        printSimbol(player,id);        // un  9 si es la central que tiene 4 lineas posibles.
        counter++;              // el id para identificar el input clickado.
        document.getElementById(id).disabled = true;
        arrayPlayer.push(map[id]);  //meto el valor de la casilla, que lo saco del array map 
        mapClicked[id] = false;  //marcamos que esa casilla está elegida
        let aux = arrayCounter[a][player];
        aux ++;
        arrayCounter[a][player] = aux;
        aux = arrayCounter[b][player];
        aux ++;
        arrayCounter[b][player] = aux;
        if (c ==9) {
            aux = arrayCounter[6][player];
            aux ++;
            arrayCounter[6][player]= aux;
            aux = arrayCounter[7][player];
            aux ++;
            arrayCounter[7][player]= aux;
        }
        else if ((c == 7) || (c == 6)) {
            aux = arrayCounter[c][player];
            aux ++;
            arrayCounter[c][player]= aux;        
        }
        //console.log(arrayCounter);
        if (arrayCounter[a][player] == 3) {
            finishGame();
            alert('you win');
        }
        /* console.log(arrayCounter); */
        else if (arrayCounter[b][player] == 3) {
            finishGame();
            alert('you win');
        }
        /* console.log(arrayCounter); */
        else if (arrayCounter[c][player] == 3) {
            finishGame();
            alert('you win');
        }    
        else if (counter == 9) {
            finishGame();
            alert(`You draw, click on INICIO to play again`);
        }
        player = 1;
        document.querySelector('#message').innerHTML = `Computer`;
        
        // player = player == 0 ? 1 : 0; 
        //document.querySelector('#message').innerHTML = `Player ${player == 0 ? '1' : '2'}`;
        //console.log(player);
        //console.log(arrayCounter);
    }
    else {
        playComputer();
    }
}
function printSimbol(player, id) {
    
    if (player == 0) {
        document.getElementById(id).value = 'X';
        console.log(mapClicked);
        console.log(arrayCounter);
        console.log('imprimiendo jugada jugador');
    }
    else {
        document.getElementById(id).value = "O";
        console.log(mapClicked);
        console.log(arrayCounter);
        console.log('imprimiendo jugada ordenador');
    }
    return;
}


function playComputer() {
    console.log('dentro playComputer');
    if (arrayPlayer.length == 1) {
        if (mapClicked[4]) {
            arrayComputer.push(map[4]);
            let n = 4;
            countPlays(n);
            mapClicked[4] = false;
            document.getElementById('4').disabled = true;
        }
        else {
            for (let i=0; n <  map.length; i++) {
                if (map[i]) {
                    arrayComputer.push(map[i]);
                    mapClicked[i] = false;
                    countPlays(i);
                    document.getElementById(i).disabled = true;
                }
            }
        }
        //console.log(map);
        //console.log(arrayComputer);
    }
    else {
        let wrote = false;
        if (arrayComputer.length > 1) {
            for (let i =0; i < arrayComputer.length-1; i++) {//en este for buscamos hacer linea
                for (let j=0; j < arrayComputer.length; j++) {
                    if (i != j) {
                        let n = 15-(arrayComputer[i]+arrayComputer[j]);
                        n = map.indexOf(n);
                        if (mapClicked[map.indexOf(n)]) {
                            arrayComputer.push(n);//ESTE CREO QUE FUNCIONA BIEN
                            countPlays(n);
                            //console.log(arrayComputer);
                            mapClicked[n] = false;
                            document.getElementById(n).disabled = true;
                            wrote = true;
                            alert ("computer win");
                            finishGame();
                            break
                        }                    
                    }
                }   
            }            
        }
        if (!wrote) {
            console.log('dentro del segundo if de la funcion playComputer');
            for (let i =0; i < arrayPlayer.length-1; i++) {//en este for buscamos evitar la linea del jugador
                for (let j=0; j < arrayPlayer.length; j++) {//ESTE CREO QUE FUNCIONA BIEN
                    if (i != j) {
                        let n = map.indexOf(15-(arrayPlayer[i]+arrayPlayer[j]));
                        //console.log(map.indexOf(15-(arrayPlayer[i]+arrayPlayer[j])));
                        //console.log(arrayPlayer[i]);
                        //console.log(arrayPlayer[j]);
                        //console.log(arrayPlayer);
                        //console.log(n);
                        if (mapClicked[n]) {
                            arrayComputer.push(map[n]);
                            countPlays(n);
                            //console.log(arrayComputer);
                            mapClicked[n] = false;
                            wrote = true;
                            document.getElementById(n).disabled = true;
                            continue;
                        }                    
                    }
                }   
            }            
        }
        console.log(wrote);
        if (!wrote) {
            for (let i = 0; i < 8; i++) {//intentar que repase el arrayCounter y si en alguna linea ya hemos sumado y quedan
                //console.log('antes del primer if interior del ultimo if');
                //console.log(arrayCounter[i][1]);
                if (arrayCounter[i][1] == 1) {//las otras dos opciones libres cojer una
                    //console.log('dentro del último if');
                    //let auxArray = arrayComputer.filter(number => !arrayLines[i].some(number));
                    let auxArray = [];
                    for (let j =0; j < 3;j++) {
                        if (arrayLinesIdByid[i][j] != i) {
                            auxArray.push(arrayLinesIdByid[i][j]);
                        }
                    } 
                    //console.log(i);
                    //console.log(arrayComputer);
                    //console.log(auxArray);
                    if (mapClicked[auxArray[0]] && mapClicked[auxArray[1]] ) {
                        arrayComputer.push(auxArray[0]);
                        countPlays(i);
                        //console.log(arrayComputer);
                        wrote = true;
                        document.getElementById(auxArray[0]).disabled = true;
                        continue
                    }
                }
            }
        }

    }
    console.log('antes del print del computer');
    counter++;
    printSimbol(player,map.indexOf(arrayComputer[arrayComputer.length-1]));
    //player = player == 1 ? 1 : 0;
    player = 0;
    //document.querySelector('#message').innerHTML = `Player ${player == 0 ? '1' : '2'}`;   
    //document.getElementById(id).disabled = true;
    document.querySelector('#message').innerHTML = `Player 1`;    
}
function countPlays(n) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 3; j++) {
            if (n == arrayLinesIdByid[i][j]) {
                let aux = arrayCounter[i][player];//funcion para añadir a arrayCounter
                aux ++;
                arrayCounter[i][player]= aux;
                //console.log(player);
                //console.log(i);
                //console.log(arrayLinesIdByid[i][j]);
            }
        }
    }
    return arrayCounter;
}
function finishGame() { //vuelvo a desactivar todos los inputs y reinizalizo el contador de jugadas
    counter = 0;
    counterArray = [];
    arrayPlayer = [];
    arrayComputer = [];
    arrayCounter = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    mapClicked = [true,true,true,true,true,true,true,true,true]; 
    deactivateCells = document.querySelectorAll('.inputCells');
    deactivateCells.forEach(element => {element.disabled = true;element.value = ""});
    return
}

