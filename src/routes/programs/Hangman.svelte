<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';

    //
    // Hangman
    //

    var program: ComputerProgram = ProgramFilter.Find('hangman')!;

    enum GAME_STATUS {
        PROGRESS = 1,
        LOST = 2,
        WON = 3,
    }

    class HangmanGame {
        private MaxTries: number;
        private CurrentWord: string;
        public GameStatus: GAME_STATUS;

        constructor() {
            this.MaxTries = 6;
            this.CurrentWord = this.GetRandomWord();
            this.GameStatus = GAME_STATUS.PROGRESS;
        }

        IsCorrectAnswer(answer: string): Boolean {
            if (this.CurrentWord.toUpperCase().includes(answer.toUpperCase())) {
                return true;
            }
            return false;
        }

        SetMaxTries(maxTries: number) {
            this.MaxTries = maxTries;
        }

        GetAnswer(): string {
            return this.CurrentWord;
        }

        GetAlphabet(): string[] {
            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').sort();
        }

        GetMaxTries(): number {
            return this.MaxTries;
        }

        Reset(): this {
            this.CurrentWord = this.GetRandomWord();
            this.GameStatus = GAME_STATUS.PROGRESS;
            return this;
        }

        private GetRandomWord(): string {
            return words.map((x) => x.toUpperCase())[~~(words.length * Math.random())];
        }
    }

    class HangmanPlayer {
        private game: HangmanGame;
        public currentAttempts: number;
        private usedAttempts: string[];

        constructor(game: HangmanGame) {
            this.game = game;
            this.currentAttempts = 0;
            this.usedAttempts = [];
        }

        GetGame(): HangmanGame {
            return this.game;
        }

        UseAttempt(attemptLetter: string) {
            if (this.currentAttempts < this.game.GetMaxTries()) {
                if (this.CheckForUsage(attemptLetter)) {
                    return;
                }
                this.usedAttempts.push(attemptLetter);
                if (!this.game.IsCorrectAnswer(attemptLetter)) {
                    this.AddAttempt();
                    if (this.GetAttempts() == this.game.GetMaxTries()) {
                        game.GameStatus = GAME_STATUS.LOST;
                        return;
                    }
                } else {
                    console.log(this.game.GetAnswer());
                    console.log(this.GetCorrectChoices().join(''));
                    if (this.game.GetAnswer() == this.GetCorrectChoices().join('')) {
                        game.GameStatus = GAME_STATUS.WON;
                        console.log('YOU HAVE WON!');
                    }
                }
            }
        }

        GetAttempts(): number {
            return this.currentAttempts;
        }

        CheckForUsage(attemptLetter: string): Boolean {
            return this.usedAttempts.includes(attemptLetter);
        }

        GetCorrectChoices(): string[] {
            return this.usedAttempts.filter((x) => game.IsCorrectAnswer(x));
        }

        AddAttempt() {
            this.currentAttempts += 1;
        }

        ResetGame() {
            this.game = this.game.Reset();
            this.usedAttempts = [];
            this.currentAttempts = 0;
        }
    }

    var words = ['csharp', 'javascript', 'programmer', 'software', 'postgres', 'react', 'redis'];

    var game: HangmanGame = new HangmanGame();
    var player: HangmanPlayer = new HangmanPlayer(game);
</script>

<WindowBase {program} isWebSite={false} showTitle={true} width={600} height={500}>
    <div class="game">
        {#if game.GameStatus == GAME_STATUS.PROGRESS}
            <div class="controls">
                <button
                    on:click={() => {
                        player.ResetGame();
                        player.currentAttempts = player.currentAttempts;
                    }}>RESET</button
                >
                <br />
                <div>Attempts Left: {game.GetMaxTries() - player.GetAttempts()}</div>
            </div>
            <div class="word-choices" style="grid-template-columns: repeat({game.GetAnswer().length}, auto);">
                {#each { length: game.GetAnswer().length } as _, i}
                    {#if player.GetCorrectChoices().includes(game.GetAnswer()[i])}
                        <div class="word">{game.GetAnswer()[i]}</div>
                    {:else}
                        <div class="word" />
                    {/if}
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
                </div>
            </div>
            <div class="letter-choices">
                {#each { length: game.GetAlphabet().length } as _, i}
                    {#if player.CheckForUsage(game.GetAlphabet()[i])}
                        <button
                            class="letter"
                            on:click={() => {
                                player.UseAttempt(game.GetAlphabet()[i].toUpperCase());
                                player.currentAttempts = player.currentAttempts;
                            }}
                            disabled>{game.GetAlphabet()[i]}</button
                        >
                    {:else}
                        <button
                            class="letter"
                            on:click={() => {
                                player.UseAttempt(game.GetAlphabet()[i].toUpperCase());
                                player.currentAttempts = player.currentAttempts;
                            }}>{game.GetAlphabet()[i]}</button
                        >
                    {/if}
                {/each}
            </div>
        {/if}

        {#if game.GameStatus == GAME_STATUS.WON}
            <div class="status">
                <b>YOU HAVE WON!</b>
                <br />
                <button
                    on:click={() => {
                        player.ResetGame();
                        player.currentAttempts = player.currentAttempts;
                    }}>START A NEW GAME</button
                >
            </div>
        {/if}
        {#if game.GameStatus == GAME_STATUS.LOST}
            <div class="status">
                <b>YOU HAVE LOST!</b>
                <b style="font-size: 1.5rem;">THE WORD WAS: {game.GetAnswer()}</b>
                <button
                    on:click={() => {
                        player.ResetGame();
                        player.currentAttempts = player.currentAttempts;
                    }}>START A NEW GAME</button
                >
            </div>
        {/if}
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

    .game .status {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        height: inherit;
        gap: 5px;
    }

    .controls {
        display: flex;
        align-items: center;
        gap: 5px;
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
        display: flex;
        grid-gap: 10px 12px;
        justify-content: center;
    }

    .word-choices .word {
        font-size: 2rem;
        font-weight: bold;
        border-bottom: 2px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }

    .letter-choices {
        display: inline-grid;
        grid-template-columns: repeat(7, 1fr);
        justify-items: center;
        grid-gap: 3px;
        margin-top: 30px;
    }

    .letter-choices .letter {
        font-size: 1rem;
    }

    .letter-choices .letter:hover {
        cursor: pointer;
        opacity: 0.5;
    }
</style>
