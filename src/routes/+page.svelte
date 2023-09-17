<script lang="ts">
    import {
        TogglableStartMenu,
        CurrentTime,
        CurrentDate,
        TaskManager,
        type IProgramManager,
        CommandManager,
    } from './stores';
    import DesktopGrid from './components/DesktopGrid.svelte';
    import StartMenu from './components/StartMenu.svelte';
    import TaskBar from './components/TaskBar.svelte';
    import InternetExplorer from './programs/InternetExplorer.svelte';
    import Cmd from './programs/Cmd.svelte';
    import { onMount } from 'svelte';
    import Resume from './programs/Resume.svelte';
    import BruteExpose from './programs/BruteExpose.svelte';
    import Hangman from './programs/Hangman.svelte';
    import { commands } from '../commands';

    CommandManager.subscribe((e) => {
        console.log(e.execution);
    });
    onMount(() => {
        // Register all commands
        for (let i = 0; i < commands.length; i++) {
            CommandManager.RegisterCommand(commands[i]);
            console.log("[CommandManager] Registered '" + commands[i].GetCommand() + "' command.");
        }

        // Time tracker
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
    <meta name="description" content="Windows 7 Emulator" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="preload" as="image" href="https://d2hqjspxd4b0fs.cloudfront.net/win7/orb-pressed.png" />
    <link rel="preload" as="image" href="https://d2hqjspxd4b0fs.cloudfront.net/win7/orb-default.png" />
    <link rel="preload" as="image" href="https://d2hqjspxd4b0fs.cloudfront.net/win7/desktop.jpg" />
</svelte:head>

<DesktopGrid />
<InternetExplorer />
<Cmd />
<Resume />
<Hangman />
<BruteExpose />
<!--<Cmd />-->
{#if $TogglableStartMenu}
    <StartMenu />
{/if}
<TaskBar />
