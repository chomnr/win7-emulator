<script lang="ts">
    import { ProgramFilter, type ComputerProgram, ProgramHelper } from "../../programs";
    import WindowBase from "../components/WindowBase.svelte";
    import WebPagePortfolio from "../components/WebPagePortfolio.svelte"
    import { ActiveWindows } from "../stores";

    //
    // Internet Explorer
    //

    var program: ComputerProgram = ProgramFilter.Find("ie9")!;
    
</script>

<WindowBase program={program} isWebSite={true} showTitle={false} openOnVisit={true}>
    <div id={program.GetWebPage().string()} class="win7-program__explorer__webpage">
        hmmm
    </div>
</WindowBase>

