/*

notes:
- pass in a list as a board
- get current winner in app (or not)

*/
import {checkWinnerMinimax} from "./checkWinner";
import styles from './grid.module.css'
import checkWinner from './checkWinner';

export class Board {
    constructor(grid) {
        this.grid = grid;
        this.current_winner = null;
        this.count = 0;
    }

    available_moves() {
        var moves = [];
        this.grid.map((square, index) => { if (square === '') {moves.push(index)}});
        return moves;
    }

    spaces_left() {
        return this.grid.some((square) => {return square === ''})
    }

    num_available_moves() {
        var count = 0;
        for (var i=0; i < this.grid.length; i++) {
            if (this.grid[i] === '') {
                count ++;
            }
        }
        return count;
    }

    make_move(letter, square) {
        if (this.grid[square] === '') {
            this.grid[square] = letter;

            if (checkWinnerMinimax(this) === letter) {
                this.current_winner = letter;
            }
            return true;
        }

        return false;
    }


}


export class GeniusComputerPlayer {
    constructor(letter) {
        this.letter = letter;
    }

    getMove(board) {
        if (board.available_moves.length === 9) {
            // make random move
            var move = board.available_moves()[Math.floor(Math.random()*board.available_moves().length)]
            return move;
        }
        var move = this.minimax(board, this.letter)['position']
        return move;
    }

    minimax(board, player) {
        var max_player = this.letter
        var other_player = player === 'X' ? 'O' : 'X'

        //var winner = checkWinnerMinimax(board);
        //if (winner === other_player) {
        if (board.current_winner === other_player) {    
            //console.log(`${other_player} wonnered!`)
            return {'position': null, 'score': other_player === max_player ? 1 * (board.num_available_moves() + 1) : -1 * (board.num_available_moves() + 1)}
        }

        else if (!board.spaces_left()) {
            //console.log('No spaces left!')
            return {'position': null, 'score': 0}
        }

        if (player === max_player) {
            var best = {'position': null, 'score': -Infinity}
        }

        else {
            var best = {'position': null, 'score': Infinity}
        }

        //console.log(board.grid)
        //console.log(`available moves: ${board.available_moves()}`)

        var moves = board.available_moves();
        //console.log(`moves: ${moves}`)
        for (var i=0; i < moves.length; i++) {
            //console.log(`iter no: ${possible_move}`)
            //board.make_move(player, moves[i]);
            //board.grid[moves[i]] = player;
            //checkWinnerMinimax(board)
            board.make_move(player, moves[i])

            var sim_score = this.minimax(board, other_player);

            board.grid[moves[i]] = ""
            board.current_winner = null;
            sim_score['position'] = moves[i]

            if (player === max_player) {
                if (sim_score['score'] > best['score']) {
                    best = sim_score
                }
            }
            else {
                if (sim_score['score'] < best['score']) {
                    best = sim_score
                }
            }
        }

        //console.log(best)
        return best;
    }
}

export class RandomComputerPlayer {
    constructor(letter) {
        this.letter = letter;
    }

    getMove(board) {
        // make random move
        var move = board.available_moves()[Math.floor(Math.random()*board.available_moves().length)]
        return move;
    }
}