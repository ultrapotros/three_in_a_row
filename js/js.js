let player = 0;
var arrayCounter = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];//array para guardar las casillas por linea de los jugadores
const arrayLinesIdByid =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];//array con las líneas ganadoras por id
var counter = 0; //contador de jugadas
var arrayPlayer = [];
var arrayComputer = [];
const map = [4,9,2,3,5,7,8,1,6]; //cuadrado mágico, todas las líneas suman 15
let mapClicked = [true,true,true,true,true,true,true,true,true]; //array para ver las casillas libres.
let endMessage = "";
var levelImposible = false;
var twoPlayers = false;
//--------------------------------------------------------------------------------
function level(a) {
    levelImposible = a;
    levelImposible ? (document.getElementById('imposible').classList.add('active') , document.getElementById('hard').classList.remove('active') , document.body.classList.add('infernalBody')) 
    : (document.getElementById('hard').classList.add('active') , document.getElementById('imposible').classList.remove('active'), document.body.classList.remove('infernalBody'));
}
//--------------------------------------------------------
function players(id) {
    twoPlayers = id;
    if (twoPlayers) {
        document.getElementById('level').classList.add('non_visible');
        document.body.classList.remove('infernalBody');
        document.getElementById('true').classList.add('active');
        document.getElementById('false').classList.remove('active');
    }
    else {
        document.getElementById('level').classList.remove('non_visible');
        document.getElementById('false').classList.add('active');
        document.getElementById('true').classList.remove('active');
        levelImposible ? document.body.classList.add('infernalBody') : document.body.classList.remove('infernalBody');
    }
}


//----------------------------------------------------------------------

function showGif() {
    document.getElementById('gif').classList.remove('non_visible');
}
function hideGif() {
    document.getElementById('gif').classList.add('non_visible');
}
//---------------------------------------------------------------------------------
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
    mapClicked = [true,true,true,true,true,true,true,true,true]; 
    console.log(levelImposible);
}  


//---------------------------------------------------------------------------------------


function clickControl(a,b,c,id) {    //a, b y c son las posibles lineas, para c un 8 si solo hay dos lineas posibles y                                                              // un  9 si es la central que tiene 4 lineas posibles.
        counter++;                      // el id para identificar el input clickado. 
        mapClicked[id] = false;  //marcamos que esa casilla está elegida            
        document.getElementById(id).disabled = true;
        arrayPlayer.push(map[id]);  //meto el valor de la casilla, que lo saco del array map 
        printSimbol(player,id);   
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
        if ((arrayCounter[a][player] == 3) || (arrayCounter[b][player] == 3) || (arrayCounter[6][player] == 3) || (arrayCounter[7][player] == 3)) {
            printSimbol(player,id);
            twoPlayers ? endMessage = `Player ${player+1} win`: endMessage = `Player win`;
            setTimeout(function() {finishGame(endMessage)}, 500);
            return
        }
        else if (counter == 9) {
            printSimbol(player,id);
            endMessage = `You draw, click on INICIO to play again`;
            setTimeout(function() {finishGame(endMessage)}, 500);
            return
        }
        player = player == 0 ? 1 : 0;
        !twoPlayers ?  (document.querySelector('#message').innerHTML = `Computer`,setTimeout(function() {playComputer()}, 500)) 
        : document.querySelector('#message').innerHTML = `Player ${player == 0 ? '1' : '2'}`;

}

//---------------------------------------------------------------------------------------------


function printSimbol(player, id) {
    
    if (player == 0) {
        document.getElementById(id).value = 'X';
    }
    else {
        document.getElementById(id).value = "O";
    }
    return;
}

//---------------------------------------------------------------------------------------

function playComputer() {
    if (arrayPlayer.length == 1) {
        if (mapClicked[4]) {
            let n = 4;
            addComputerPlay(n);
        }
        else {
            for (let i=0; i < map.length; i++) {
                if (map[i]) {
                    addComputerPlay(i);
                    break;
                }
            }
        }

    }
    else {
        let wrote = false;
        if (arrayComputer.length > 1) {
            for (let i =0; i < arrayComputer.length-1; i++) {//en este for buscamos hacer linea
                for (let j=0; j < arrayComputer.length; j++) {
                    if (i != j) {
                        let n = 15-(arrayComputer[i]+arrayComputer[j]);
                        n = map.indexOf(n);
                        if (mapClicked[n]) {
                            document.getElementById(n).disabled = true;
                            printSimbol(player,n);
                            endMessage = `Computer Win, YOU LOST LITTLE BASTARD :)`;
                            setTimeout(function() {finishGame(endMessage)}, 500);
                            return
                        }                    
                    }
                }   
            }            
        }
        if (!wrote) {
            
            for (let i =0; i < arrayPlayer.length-1; i++) {//en este for buscamos evitar la linea del jugador
                for (let j in arrayPlayer) {
                    if (i != j) {
                        let n = map.indexOf(15-(arrayPlayer[i]+arrayPlayer[j]));
                        if (mapClicked[n] && !wrote) {
                            addComputerPlay(n);
                            wrote = true;
                            break;
                        }                    
                    }
                }   
            }            
        }
        if (!wrote && levelImposible == true) { //este if solo entra en modo demencial
            let firstLine = 9;
            let secondLine = 9;
            for (let i = 0; i < 8; i++) {
                if ((arrayCounter[i][1] == 1) && (arrayCounter[i][0] == 0)) {
                    firstLine = i;
                    for (let j =(i + 1); j < 8;j++) {
                        if ((arrayCounter[j][1] == 1) && (arrayCounter[j][0] == 0)) {
                            secondLine = j;
                        }
                    }
                }
            }
            if (firstLine != 9 && secondLine!= 9) {
                for (let j =0; j < 3;j++) {
                    if ((arrayLinesIdByid[firstLine].includes(arrayLinesIdByid[j])) && mapClicked[j]) {
                        addComputerPlay(j);
                        wrote = true;
                        break;
                    }
                } 
                //solo puede coincidir un id, si esta libre cogerlo.
                //aquí ya tengo que buscar cual coincide y no está elegida y cogerla
            }
        }
        if (!wrote) {
            for (let i = 0; i < 8; i++) {//intentar que repase el arrayCounter y si en alguna linea ya hemos sumado y quedan
                if (arrayCounter[i][1] == 1) {//las otras dos opciones libres cojer una
                    let auxArray = [];
                    for (let j =0; j < 3;j++) {
                        if (!arrayComputer.includes(map[arrayLinesIdByid[i][j]])) {
                            auxArray.push(arrayLinesIdByid[i][j]);
                        }
                    } 
                    if (mapClicked[auxArray[0]] && mapClicked[auxArray[1]] && !wrote) {
                        addComputerPlay(auxArray[0]);
                        wrote = true;
                        break;
                    }
                }
            }
        }
        //intentar buscar dos lineas con una, y en el caso de que compartan un hueco vacio tachar ese hueco.
        if (!wrote) {
            for (let i = 0; i < mapClicked.length; i++) {
                if (mapClicked[i] && !wrote) {
                    addComputerPlay(i); 
                    wrote = true;
                    break;
                }
            }
        }
    }
    counter++;
    printSimbol(player,map.indexOf(arrayComputer[arrayComputer.length-1]));
    player = 0;
    document.querySelector('#message').innerHTML = `Player 1`;    
}

//--------------------------------------------------------------------------------------

function countPlays(n) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 3; j++) {
            if (n == arrayLinesIdByid[i][j]) {
                let aux = arrayCounter[i][player];//funcion para añadir a arrayCounter
                aux ++;
                arrayCounter[i][player]= aux;
            }
        }
    }
    return arrayCounter;
}
//--------------------------------------------------------------------------


function finishGame(message) { //vuelvo a desactivar todos los inputs y reinizalizo el contador de jugadas
    alert(message);
    counter = 0;
    deactivateCells = document.querySelectorAll('.inputCells');
    deactivateCells.forEach(element => {element.disabled = true;element.value = ""});
}

//------------------------------------------

function addComputerPlay(playId) {//funciónp para hacer todo lo necesario cuando la máquina elige casilla.
    arrayComputer.push(map[playId]);
    mapClicked[playId] = false;
    countPlays(playId);
    document.getElementById(playId).disabled = true;
}

//funcion para buscar una fila en la que yo tenga 1 linea y el contrario nada
