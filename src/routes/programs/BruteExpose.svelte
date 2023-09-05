<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import WebPagePortfolio from '../components/WebPagePortfolio.svelte';
    import { ActiveWindows } from '../stores';

    //
    // BruteExpose
    //

    var program: ComputerProgram = ProgramFilter.Find('be_app')!;
</script>

<WindowBase {program} isWebSite={false} showTitle={true} width={400} height={500}>
    <div>hello this is a test o.</div>
</WindowBase>
