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

        GetAlphabet(): string[] {
            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').sort();
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
                console.log('hmmm');
                this.AddAttempt();
            }
        }

        GetTheirAnswer(): string {
            return this.answer;
        }

        GetAttempts(): number {
            return this.currentAttempts;
        }

        AddAttempt() {
            this.currentAttempts += 1;
        }
    }

    var words = ['csharp', 'javascript', 'programmer', 'software', 'postgres', 'react', 'redis'];

    var game: HangmanGame = new HangmanGame();
    var player: HangmanPlayer = new HangmanPlayer(game);
</script>

<WindowBase {program} isWebSite={false} showTitle={true} width={600} height={500}>
    <div class="game">
        <div class="controls">
            <button>RESET</button>
        </div>
        <div class="word-choices" style="grid-template-columns: repeat({game.GetAnswer().length}, auto);">
            {#each { length: game.GetAnswer().length } as _, i}
                <div class="word" />
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
                {#if player.GetAttempts() >= 1}
                    <div class="head" />
                {/if}

                {#if player.GetAttempts() >= 2}
                    <div class="body" />
                {/if}

                {#if player.GetAttempts() >= 3}
                    <div class="left-arm" />
                {/if}

                {#if player.GetAttempts() >= 4}
                    <div class="right-arm" />
                {/if}

                {#if player.GetAttempts() >= 5}
                    <div class="left-leg" />
                {/if}

                {#if player.GetAttempts() >= 6}
                    <div class="right-leg" />
                {/if}
                <!-- <div class="head" /> -->
                <!--
                <div class="head" />
                <div class="body" />
                <div class="left-arm" />
                <div class="right-arm" />
                <div class="left-leg" />
                <div class="right-leg" />
                <-->
            </div>
        </div>
        <div class="letter-choices">
            {#each { length: game.GetAlphabet().length } as _, i}
                <div class="letter" data-value={game.GetAlphabet()[i]}>{game.GetAlphabet()[i]}</div>
            {/each}
        </div>
    </div>
</WindowBase>

<style>
    :root {
        --hangman-bg: #f1c40f;
    }

    .game {
        display: flex;
        flex-direction: column;
        height: inherit;
        padding: 5px;
    }

    .controls {
        display: flex;
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
        top: 140px;
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

    .word-choices {
        display: grid;
        grid-template-columns: repeat(5, auto);
        grid-gap: 10px 12px;
        justify-content: center;
    }

    .word-choices .word {
        border-bottom: 2px solid black;
        width: 40px;
        height: 40px;
    }

    .letter-choices {
        display: inline-grid;
        grid-template-columns: repeat(9, 1fr);
        justify-items: center;
        grid-gap: 3px;
        margin-top: 30px;
    }

    .letter-choices .letter {
        font-size: 1.5rem;
    }

    .letter-choices .letter:hover {
        cursor: pointer;
        opacity: 0.5;
    }
</style>
