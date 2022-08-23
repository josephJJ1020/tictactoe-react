// use function below to check winner on screen
export default function checkWinner(cls) {
    var activeTiles = document.getElementsByClassName(cls);
    var activeTiles = [...activeTiles];


    console.log(activeTiles.map((tile) => tile.innerHTML));


    // optimize win conditions
    var row1 = [activeTiles[0], activeTiles[1], activeTiles[2]];
    var row2 = [activeTiles[3], activeTiles[4], activeTiles[5]];
    var row3 = [activeTiles[6], activeTiles[7], activeTiles[8]];


    var col1 = [activeTiles[0], activeTiles[3], activeTiles[6]];
    var col2 = [activeTiles[1], activeTiles[4], activeTiles[7]];
    var col3 = [activeTiles[2], activeTiles[5], activeTiles[8]];


    var diagonal1 = [activeTiles[0], activeTiles[4], activeTiles[8]];
    var diagonal2 = [activeTiles[2], activeTiles[4], activeTiles[6]];


    var wincons = [row1, row2, row3, col1, col2, col3, diagonal1, diagonal2];
    //console.log(`wonnered on first row: ${row1.every((tile) => { return tile.innerHTML === 'X'; })}`);

    // check wincons
    for (var i = 0; i < wincons.length; i++) {
        if (wincons[i].every((tile) => { return tile.innerHTML === 'X'; })) {
            return 'X';
        }
        else if (wincons[i].every((tile) => { return tile.innerHTML === 'O'; })) {
            return 'O';
        }
    }

    //console.log(`wonnered: ${wincons.some(wonnered)}`)
    return null;
}



// use function below to check winner on grid and to set board.current_winner if there is one
export function checkWinnerMinimax(board) {
    var grid = board.grid;

    // optimize win conditions
    var row1 = [grid[0], grid[1], grid[2]];
    var row2 = [grid[3], grid[4], grid[5]];
    var row3 = [grid[6], grid[7], grid[8]];


    var col1 = [grid[0], grid[3], grid[6]];
    var col2 = [grid[1], grid[4], grid[7]];
    var col3 = [grid[2], grid[5], grid[8]];


    var diagonal1 = [grid[0], grid[4], grid[8]];
    var diagonal2 = [grid[2], grid[4], grid[6]];

    var wincons = [row1, row2, row3, col1, col2, col3, diagonal1, diagonal2]

    // check wincons
    for (var i = 0; i < wincons.length; i++) {
        if (wincons[i].every((tile) => { return tile === 'X'; })) {
            board.current_winner = 'X';
            return 'X';
        }
        else if (wincons[i].every((tile) => { return tile === 'O'; })) {
            board.current_winner = 'O';
            return 'O';
        }
    }

    //console.log(`wonnered: ${wincons.some(wonnered)}`)
    return null;
}