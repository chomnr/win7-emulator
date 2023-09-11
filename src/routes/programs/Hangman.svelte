<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';

    //
    // Hangman
    //

    var program: ComputerProgram = ProgramFilter.Find('hangman')!;

    class HangmanGame {
        private maxTries: number;
        private currentWord: string;

        constructor() {
            this.maxTries = 5;
            this.currentWord = this.GetRandomWord();
        }

        IsCorrectAnswer(answer: string): Boolean {
            if (answer.toLowerCase() == this.currentWord.toLowerCase()) {
                return true;
            }
            return false;
        }

        SetMaxTries(maxTries: number) {
            this.maxTries = maxTries;
        }

        GetAnswer(): string {
            return this.currentWord;
        }

        GetMaxTries(): number {
            return this.maxTries;
        }

        private GetRandomWord(): string {
            return words[~~(words.length * Math.random())];
        }
    }

    class HangmanPlayer {
        private game: HangmanGame;
        private currentAttempts: number;
        private answer: string;

        constructor(game: HangmanGame) {
            this.game = game;
            this.answer = '';
            this.currentAttempts = 0;
        }

        GetGame(): HangmanGame {
            return game;
        }

        UseAttempt(attemptWord: string) {
            if (this.currentAttempts < game.GetMaxTries()) {
                this.answer = attemptWord;
            }
        }

        GetTheirAnswer(): string {
            return this.answer;
        }

        GetAlphabet(): string {
            return 'ABDEFGHIJKLMNOPQRSTUVWXYZ';
        }

        GetAttempts(): number {
            return this.currentAttempts;
        }

        private AddAttempt() {
            this.currentAttempts + 1;
        }
    }

    var words = ['csharp', 'javascript', 'programmer', 'software', 'postgres', 'react', 'redis'];

    var game: HangmanGame = new HangmanGame();
    var player: HangmanPlayer = new HangmanPlayer(game);
</script>

<WindowBase {program} isWebSite={false} showTitle={true} width={600} height={500}>
    <div class="game">
        <div class="letter-choices" style="grid-template-columns: repeat({game.GetAnswer().length}, auto);">
            {#each { length: game.GetAnswer().length } as _, i}
                <div class="letter" />
            {/each}
        </div>
        <div class="hangman">
            <div class="hangman-environment">
                <div class="top-board" />
                <div class="hanging-board" />
                <div class="pole" />
                <div class="bottom-board" />
            </div>
            <div class="hangman-person">
                <div class="head" />
                <div class="body" />
                <div class="left-arm" />
                <div class="right-arm" />
                <div class="left-leg" />
                <div class="right-leg" />
            </div>
        </div>
    </div>
</WindowBase>

<style>
    :root {
        --hangman-bg: rgba(243, 156, 18, 1);
    }

    .game {
        display: flex;
        flex-direction: column;
        height: inherit;
        background: var(--hangman-bg);
        padding: 5px;
    }

    .hangman {
        display: flex;
        justify-content: center;
        height: fit-content;
    }

    .hangman-environment {
        display: flex;
        flex-direction: column;
        width: fit-content;
        height: fit-content;
        position: relative;
        margin-top: 20px;
    }

    .hangman-environment .top-board {
        background: black;
        width: inherit;
        height: 10px;
        width: 120px;
        position: relative;
    }

    .hangman-environment .hanging-board {
        background: black;
        width: inherit;
        height: 50px;
        width: 10px;
        position: absolute;
        left: 115px;
    }

    .hangman-environment .pole {
        background: black;
        height: 250px;
        width: 10px;
    }

    .hangman-environment .bottom-board {
        background: black;
        width: inherit;
        height: 10px;
        width: 220px;
    }

    .hangman-person {
        display: flex;
        justify-content: center;
        width: fit-content;
        height: fit-content;
        position: absolute;
        top: 115px;
        left: 307px;
    }

    .hangman-person .head {
        background: black;
        position: absolute;
        width: 55px;
        height: 55px;
        border-radius: 50%;
    }

    .hangman-person .body {
        position: absolute;
        background: black;
        height: 125px;
        width: 12px;
    }

    .hangman-person .left-arm {
        background: black;
        position: absolute;
        width: 10px;
        height: 60px;
        top: 55px;
        right: 10px;
        transform: rotate(30deg);
    }

    .hangman-person .right-arm {
        background: black;
        position: absolute;
        width: 10px;
        height: 60px;
        top: 55px;
        left: 10px;
        transform: rotate(-30deg);
    }

    .hangman-person .left-leg {
        background: black;
        position: absolute;
        width: 10px;
        height: 90px;
        top: 105px;
        right: 16px;
        transform: rotate(30deg);
    }

    .hangman-person .right-leg {
        background: black;
        position: absolute;
        width: 10px;
        height: 90px;
        top: 105px;
        left: 16px;
        transform: rotate(-30deg);
    }

    /*
    .hangman-person .left-arm {
        background: black;
        position: absolute;
        width: 10px;
        height: 60px;
        top: 0px;
        left: 390px;
        transform: rotate(30deg);
    }
    /*
    .hangman-person .right-arm {
        background: black;
        position: absolute;
        width: 10px;
        height: 60px;
        top: 135px;
        right: 170px;
        transform: rotate(-30deg);
    }

    .hangman-person .left-leg {
        background: black;
        position: absolute;
        width: 10px;
        height: 85px;
        top: 190px;
        right: 163px;
        transform: rotate(-30deg);
    }

    .hangman-person .right-leg {
        background: black;
        position: absolute;
        width: 10px;
        height: 85px;
        top: 190px;
        right: 205px;
        transform: rotate(30deg);
    }

    /*
    .hangman-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: fit-content;
        height: fit-content
        top: 55px;
        right: 128px;
        background: red;
    }

    .hangman-body .head {
        background: black;
        width: 55px;
        height: 55px;
        border-radius: 50%;
    }

    .hangman-body .body {
        position: relative;
        background: black;
        width: 10px;
        height: 100px;
    }

    .hangman-body .left-arm {
        position: relative;
        top: -95px;
        right: 15px;
        background: black;
        width: 10px;
        height: 60px;
        transform: rotate(30deg);
    }

    .hangman-body .right-arm {
        position: relative;
        top: -155px;
        right: -15px;
        background: black;
        width: 10px;
        height: 60px;
        transform: rotate(-30deg);
    }

    .hangman-body .left-leg {
        position: relative;
        top: -140px;
        right: 20px;
        background: black;
        width: 10px;
        height: 80px;
        transform: rotate(30deg);
    }

    .hangman-body .right-leg {
        position: relative;
        top: -220px;
        right: -20px;
        background: black;
        width: 10px;
        height: 80px;
        transform: rotate(-30deg);
    }
    */

    .letter-choices {
        display: grid;
        grid-template-columns: repeat(5, auto);
        grid-gap: 10px 12px;
        justify-content: center;
    }

    .letter-choices .letter {
        border-bottom: 2px solid black;
        width: 40px;
        height: 40px;
    }
</style>
