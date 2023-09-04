<script lang="ts">
    import { ProgramFilter, type ComputerProgram, ProgramHelper } from "../../programs";
    import WindowBase from "../components/WindowBase.svelte";
    import WebPagePortfolio from "../components/WebPagePortfolio.svelte"
    import { ActiveWindows } from "../stores";
    import { onMount } from "svelte";

    //
    // BruteExpose
    //

    var program: ComputerProgram = ProgramFilter.Find("cmd")!;

    class ConsoleCommand {
        name: string;

        constructor(name: string) {
            this.name = name;
        }
    }

    onMount(() => {

    })
</script>

<WindowBase program={program} isWebSite={false} showTitle={true} title="C:\Windows\system32\cmd.exe" openOnVisit={false} width={700} height={800}>
    <div class="program_cmd">
        <div>Microsoft Windows [Version 6.1.7601]</div>
        <div>Copyright (c) 2009 Microsoft Corporation. All rights reserved.</div>
        <div>&nbsp;</div>
        <div>C:\Users\zeljko> <input class="program_cmd__input"/></div>
        <div id="command_results"></div>
    </div>
</WindowBase>


<style>

    :root {
        --win7-cmd-background: black;
        --win7-cmd-color: lightgray;

        --win7-cmd-font-family: monospace;
        --win7-cmd-font-size: 0.9rem;
    }

    .program_cmd {
        display: flex;
        flex-direction: column;
        font-family: var(--win7-cmd-font-family);
        background: var(--win7-cmd-background);
        color: var(--win7-cmd-color);
        font-size: var(--win7-cmd-font-size);
        user-select: text;
        height: 400px;
    }

    .program_cmd *::selection {
        background: rgba(211, 211, 211, 0.5);
    }

    .program_cmd__input {
        background: transparent;
        position: relative;
        right: 7px;
        border: none;
        outline: none;
        color: var(---win7-cmd-color)
    }

    .program_cmd__input::selection {
        background: rgba(211, 211, 211, 0.5);
    }

</style>