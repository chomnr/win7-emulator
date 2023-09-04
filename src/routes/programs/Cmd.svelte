<script lang="ts">
    import { ProgramFilter, type ComputerProgram, ProgramHelper } from "../../programs";
    import WindowBase from "../components/WindowBase.svelte";
    import WebPagePortfolio from "../components/WebPagePortfolio.svelte"
    import { ActiveWindows } from "../stores";

    //
    // BruteExpose
    //

    var program: ComputerProgram = ProgramFilter.Find("cmd")!;

</script>

<WindowBase program={program} isWebSite={false} showTitle={true} title="C:\Windows\system32\cmd.exe" openOnVisit={false} width={700} height={800}>
    <div class="program_cmd">
        <div>Microsoft Windows [Version 6.1.7601]</div>
        <div>Copyright (c) 2009 Microsoft Corporation. All rights reserved.</div>
        <div>&nbsp;</div>
        <div>C:\Users\chomnr> fk dis dude...</div>
    </div>
</WindowBase>


<style>
    .program_cmd {
        display: flex;
        flex-direction: column;
        font-family: monospace;

        background: black;

        color: white;

        font-size: 0.9rem;
    }
</style>