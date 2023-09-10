<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import WebPagePortfolio from '../components/WebPagePortfolio.svelte';

    //
    // Internet Explorer
    //

    var program: ComputerProgram = ProgramFilter.Find('ie9')!;
</script>

<WindowBase {program} isWebSite={true} showTitle={false}>
    <div id={program.GetWebPage().string()} class="win7-program__explorer__webpage">asasdasdds</div>
</WindowBase>
