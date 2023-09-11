<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import WebPagePortfolio from '../components/WebPagePortfolio.svelte';

    //
    // BruteExpose
    //

    var program: ComputerProgram = ProgramFilter.Find('bruteexpose')!;
</script>

<WindowBase {program} isWebSite={false} showTitle={true} width={400} height={500}>
    <div>hello this is a test o.</div>
</WindowBase>
