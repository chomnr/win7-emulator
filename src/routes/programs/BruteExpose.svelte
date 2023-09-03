<script lang="ts">
    import { ProgramFilter, type ComputerProgram, ProgramHelper } from "../../programs";
    import WindowBase from "../components/WindowBase.svelte";
    import WebPagePortfolio from "../components/WebPagePortfolio.svelte"
    import { ActiveWindows } from "../stores";

    //
    // BruteExpose
    //

    var program: ComputerProgram = ProgramFilter.Find("be_app")!;
    console.log(program);
</script>

<WindowBase program={program} isWebSite={false} showTitle={true} openOnVisit={false}>
    <div>hello this is a test o.</div>
</WindowBase>
