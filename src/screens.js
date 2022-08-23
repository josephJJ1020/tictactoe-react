// contains screen components
import { useEffect } from 'react'
import styles from './screens.module.css'


// home page/starting page/ landing page/ main menu
export function HomePage(props) {
    // onclick, trigger callback
    const hideScreen = () => {
        props.manage(0)
        //console.log('working!')
    }

    return(
        <div className={`container ${styles.homepage} center`}>
            <h1>TicTacToe</h1>
            <button onClick={hideScreen}>Start Game</button>
        </div>
    )
}

// select first player page
export function SelectPage(props) {
    const setfirst = (x) => {
        props.setfirst(x);

    }
    // onclick, trigger callback
    const hideScreen = () => {
        props.manage(1);
    }

    const backToMain = () => {
        //sessionStorage.setItem('reload', 'false')
        props.manage(0);
    }

    const setMode = (mode) => {
        props.setMode(mode);
        
    }

    useEffect(() => {
        console.log(props.playerMode)
    })

    return(
        <div className={`container ${styles.selectpage} center`}>
            <div className='back' onClick={backToMain}>
                Back
            </div>
            <h1>Select your settings</h1>
            <div className="column-space-evenly half">
                <div className={`text-align-center ${styles.selectmodecontainer}`} > 
                    <p>Choose your game mode</p>
                    <div className='flex-wrap'>
                        <button onClick={() => {setMode(0)}} 
                            id={styles.x} 
                            className={`${styles.selectbutton} ${styles.selectmode}
                            ${props.playerMode === 0 ? styles.active : null}`}>
                                PvP
                        </button>

                        <button onClick={() => {setMode(1)}} 
                            id={styles.x} 
                            className={`${styles.selectbutton} ${styles.selectmode} 
                            ${props.playerMode === 1 ? styles.active : null}`}>
                                vs Random Computer Player
                        </button>

                        <button onClick={() => {setMode(2)}} 
                            className={`${styles.selectbutton} ${styles.selectmode}
                            ${props.playerMode === 2 ? styles.active : null}`}>
                                vs Smart Computer Player
                        </button>
                        
                        
                        {/* <input type='text' value={props.first} readOnly/>
                        <button onClick={props.callback}>Change</button>*/}
                    </div>
                    <hr className={`${props.playerMode === 1 ? styles.activebar1 :
                        props.playerMode === 2 ? styles.activebar2 : 
                        null}`}/>
                </div>

                <div className='text-align-center'> 
                    <p>
                        Who goes first?
                    </p>
                    <button onClick={() => {setfirst('X')}} id={styles.x} className={`${styles.selectbutton} ${props.first === 'X' ? styles.active : null}`}>X</button>
                    <button onClick={() => {setfirst('O')}} id={styles.o} className={`${styles.selectbutton} ${props.first === 'O' ? styles.active : null}`}>O</button>
                    <hr className={`${props.first === 'O' ? styles.activebar : null}`}/>
                    {/* <input type='text' value={props.first} readOnly/>
                    <button onClick={props.callback}>Change</button>*/}
                </div>
                <div>
                    <button className={styles.start} type="button" onClick={hideScreen}>Start</button>
                </div>
            </div>
        </div>
    )
}

// result page 
export function ResultPage(props) {
    const restart = () => {
        sessionStorage.setItem('reload', 'true')
        window.location.reload();
    }
    return(
        <div className={`container ${styles.resultpage} center`}>
            <div className={`center ${styles.results} column-space-evenly`}>
                {
                    props.winner === 'X' ? 
                    <h1>X wins!</h1> : 
                    props.winner === 'O' ? <h1>O wins!</h1> : 
                    <h1>It's a Tie!</h1>
                }
                <button onClick={restart}>Restart</button>
            </div>
            
        </div>
    )
}

