<script lang="ts">
    import { TogglableStartMenu, CurrentTime, CurrentDate, TaskManager } from './stores';
    import DesktopGrid from './components/DesktopGrid.svelte';
    import StartMenu from './components/StartMenu.svelte';
    import TaskBar from './components/TaskBar.svelte';
    import InternetExplorer from './programs/InternetExplorer.svelte';
    import Cmd from './programs/Cmd.svelte';
    import { browser } from '$app/environment';

    /*
    onMount(() => {

        setTimeout(() => {
            TaskManager.setUsing(ProgramFilter.GetPrograms()[0]);
        }, 5000)
        // Manage the
        const timeUpdater = setInterval(() => {
            var date = new Date();
            CurrentTime.set(
                date
                    .toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                    .replace(/^0(?=\d)/, ''),
            );
            CurrentDate.set(date.toLocaleDateString());
        }, 1000);
        return () => {
            clearInterval(timeUpdater);
        };
    });
    */

    // Adjust Visuals.
    TaskManager.subscribe((event) => {
        if (event.processes.length != 0) {
        }
    });
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
</svelte:head>

<DesktopGrid />
<InternetExplorer />
<Cmd />
<!--<Cmd />-->
{#if $TogglableStartMenu}
    <StartMenu />
{/if}
<TaskBar />
