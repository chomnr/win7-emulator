<script lang="ts">
    import { TogglableStartMenu, CurrentTime, CurrentDate, TaskManager } from './stores';
    import DesktopGrid from './components/DesktopGrid.svelte';
    import StartMenu from './components/StartMenu.svelte';
    import TaskBar from './components/TaskBar.svelte';
    import InternetExplorer from './programs/InternetExplorer.svelte';
    import Cmd from './programs/Cmd.svelte';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    // Adjust Visuals.
    // we have it here because we dont want to make a ton of subscribers.
    TaskManager.subscribe((event) => {
        console.log(event);
        if (event.last == undefined && event.using == undefined && event.processes.length == 0) {
            return;
        }
    });

    onMount(() => {
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
