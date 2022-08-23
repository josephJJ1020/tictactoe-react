// contains grid and tile components

import { useState, useEffect, useRef } from "react";
import styles from './grid.module.css'
import checkWinner from "./checkWinner";

// initialize grid container component
export default function GridContainer(props) {
    
    return(
        <div className={`container ${styles.gridContainer} center`}>
            <Grid 
            count={props.count} 
            callback={props.callback} 
            first={props.first}
            manage={props.manage} 
            setWinner={props.setWinner} 
            updateBoard={props.updateBoard} 
            getMove={props.getMove}
            board={props.board}>
            </Grid>
        </div>
        
    )
}

// initialize grid component
function Grid(props) {
    const isInitialMount = useRef(true);

    const chars = ['X', 'O']
    const tiles = [];

    const updateBoard = (grid) => {
        props.updateBoard(grid) // pass in a list to represent the board
    }
    
    const pressed = (x) => {
        props.callback(x)
    }

    // make tile components
    for (var i=0; i<9; i++) {
        tiles.push(
        <Tile key={i} 
            number={i} 
            val={props.board.grid[i]} 
            count={props.count} 
            callback={pressed} 
            first={props.first} 
            chars={chars}
        />
            )
    }

    // solution for updated state not being printed
    // fix winner checking not working
    useEffect(() => {

        // NOTE: move these callback functions inside useeffect to get rid of infinite loop
        // see https://typeofnan.dev/fix-the-maximum-update-depth-exceeded-error-in-react/

        //console.log(sessionStorage.getItem('reload'))

        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        
        else {
            const manage = () => {
                props.manage(2);
            }
            
            const setWinner = (wonnered) => {
                props.setWinner(wonnered);
            }
    
            const updateBoard = (grid) => {
                props.updateBoard(grid) // pass in a list to represent the board
            }
    
            console.log(`current count: ${props.count}`)
    
            const getMove = () => {
                props.getMove();
            }
    
            const wonnered = () => {
                var winner = checkWinner(`${styles.tile}`);
                //console.log(`winner: ${winner}`)
    
                if (winner) {
                    //setWinner(winner);
                    setWinner(winner);
                    manage();
                    console.log('useeffect working!')
                    return;
                }
    
                else if (props.count > 8) {
                    manage();
                }
            }
    
            // check if player 1 wonnered
            if (wonnered()) {
                return;
            }
    
            // update board
            var activeTiles = document.getElementsByClassName(`${styles.tile}`);
            var activeTiles = [...activeTiles];
    
            var newGrid = []
            activeTiles.map((square) => {newGrid.push(square.innerHTML)});
            
            //console.log(`new grid: ${newGrid}`)
            updateBoard(newGrid);

        }
        
      }, [props.count])

    
    return (
        <div className={styles.grid}>
            <div className={styles.currentplayer}>
                <h1>{`Current Player:   
                    
                    ${props.first}`
                    }
                </h1>
            </div>
            {tiles}
        </div>
    )
}

// initialize tile components
function Tile(props) {
    const [val, setVal] = useState(props.val)
    
    const clicked = () => {
        if (val === "") {
            //setVal(`${props.count % 2 === 0 ? (props.first === props.chars[0] ? props.chars[0] : props.chars[1] ) : (props.first === props.chars[0] ? props.chars[1] : props.chars[0])}`)
            props.callback(props.number);
        }
    }
    
    return (
        <div className={styles.tile} onClick={clicked}>
            {props.val}
        </div>
    )
}
