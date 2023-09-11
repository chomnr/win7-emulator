<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';

    //
    // Hangman
    //

    var program: ComputerProgram = ProgramFilter.Find('hangman')!;
</script>

<WindowBase {program} isWebSite={false} showTitle={true} width={600} height={500}>
    <div class="hangman">
        <div class="hangman-environment">
            <div class="top-board" />
            <div class="hanging-board" />
            <div class="pole" />
            <div class="bottom-board" />
        </div>
        <div class="hangman-body">
            <div class="head" />
            <div class="body" />
            <div class="left-arm" />
            <div class="right-arm" />
            <div class="left-leg" />
            <div class="right-leg" />
        </div>
    </div>
    <div class="letter-choices" />
</WindowBase>

<style>
    :root {
        --hangman-bg: rgba(243, 156, 18, 1);
    }

    .hangman {
        display: flex;
        align-items: center;
        background: var(--hangman-bg);
        height: inherit;
        padding: 5px;
    }

    .hangman-environment {
        display: flex;
        flex-direction: column;
        width: fit-content;
        height: fit-content;
        position: relative;
        top: -80px;
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

    .hangman-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: fit-content;
        top: 25px;
        right: 128px;
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

    .letter-choices {
        color: red;
    }
</style>
