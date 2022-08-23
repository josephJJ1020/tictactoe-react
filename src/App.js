import "./App.css";
import { useState, useEffect, useRef } from "react";
import { HomePage, SelectPage, ResultPage } from "./screens";
import GridContainer from "./grid";
import { Board, GeniusComputerPlayer, RandomComputerPlayer } from "./minimax";

function App() {
  const isFirstMount = useRef(true);
  const [count, setCount] = useState(0);
  const [first, setFirst] = useState("X");
  const [winner, setWinner] = useState(null);

  // set states for minimax player
  const [playerMode, setPlayerMode] = useState(0); // 0 for two player, 1 for vs random computer player, 2 for vs smart player
  const [computerLetter, setComputerLetter] = useState('O');
  const [boardState, setBoardState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // init board and minimax player
  const computerPlayer = new GeniusComputerPlayer(computerLetter);
  const randomPlayer = new RandomComputerPlayer(computerLetter);
  const board = new Board(boardState);


  // set screen states for screen management
  const [gridVisible, setGridVisible] = useState(true);
  const [mainVisible, setMainVisible] = useState(
    sessionStorage.getItem("reload") !== "true" ? true : false
  );


  const [selectVisible, setSelectVisible] = useState(true);
  const [winnerVisible, setWinnerVisible] = useState(false);


  const setfirst = (x) => {
    setFirst(x);
    setComputerLetter(x === "X" ? "O" : "X");
  };


  const setBoard = (grid) => {
    setBoardState(grid);
    board.grid = boardState;
    board.count = count;
  };


  const getMove = () => { // for smart computer player
    if (playerMode === 1) {
      randomPlayer.getMove(board);
    }

    else if (playerMode === 2) {
      computerPlayer.getMove(board);
    }
  };


  // callback to update who goes first
  // only used on one button selection
  const selected = () => {
    setFirst(`${first === "X" ? "O" : "X"}`);
  };


  // callback to update game mode (two player, vs random player, vs smart player)
  const setMode = (x) => {
    setPlayerMode(x)
  }


  // callback to update count (to alternate players) and to update moves on screen and in board object
  const updateCount = (square) => {
    setCount(count + 1);
    boardState[square] = first;
    board.grid = boardState;
    
    if (playerMode > 0) {

      if (playerMode === 1 ) {
        var computermove = randomPlayer.getMove(board);
        console.log(`computer's move ${computermove}`);
      }

      else if (playerMode === 2) {
        // computer makes move using minimax after player 
        var computermove = computerPlayer.getMove(board);
        console.log(`computer's move ${computermove}`);
      }

      boardState[computermove] =  computerLetter; //count % 2 === 0 ? first : computerLetter;
      board.grid = boardState;
      setCount(count + 2)
      
    }
  };


  // callback to update winner
  const updateWinner = (winner) => {
    setWinner(winner);
  };


  // callback to manage screens
  const manage = (screenNumber) => {
    //console.log('screen management working!')
    switch (screenNumber) {
      // note: break is necessary
      case 0: // screen 0 == landing page
        setMainVisible(mainVisible ? false : true);
        break;

      case 1: // screen 1 == select page
        setSelectVisible(selectVisible ? false : true);
        break;

      case 2: // screen 2 == result page
        setWinnerVisible(winnerVisible ? false : true);
        break;

      case 3: // screen 3 == grid page
        setGridVisible(gridVisible ? false : true);
        break;

      default:
        console.log("error managing screens");
    }
  };


  // useeffect for every time computerletter is changed
  useEffect(() => {
    computerPlayer.letter = computerLetter;
  }, [computerLetter, computerPlayer]);


  // useeffect for every time boardState is changed
  useEffect(() => {
    board.grid = boardState;
    //console.log(`current board: ${board.grid}`)
  }, [board, boardState]);


  // use minimax here (maybe not here) (definitely not here)
  // update current player after count increments
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
    } else {
      if (playerMode === 0) {
        console.log('count updated!')
        setFirst(first === 'X' ? 'O' : 'X')
        
      }
    }
  }, [count]);


  return (
    <div className="App">
      {mainVisible ? <HomePage manage={manage} /> : null}
      {selectVisible ? (
        <SelectPage
          first={first}
          callback={selected}
          manage={manage}
          setfirst={setfirst}
          playerMode={playerMode}
          setMode={setMode}
        />
      ) : null}
      {winnerVisible ? <ResultPage manage={manage} winner={winner} /> : null}
      {gridVisible ? (
        <GridContainer
          count={count}
          callback={updateCount}
          first={first}
          manage={manage}
          setWinner={updateWinner}
          updateBoard={setBoard}
          getMove={getMove}
          board={board}
        />
      ) : null}
    </div>
  );
}

export default App;
