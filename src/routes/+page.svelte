<script>
    import { onMount } from 'svelte'; 
	import { TogglableStartMenu, CurrentTime, CurrentDate, ActiveWindows } from './stores';
    import DesktopGrid from './components/DesktopGrid.svelte';
    import StartMenu from './components/StartMenu.svelte';
    import TaskBar from './components/TaskBar.svelte';
    import InternetExplorer from './programs/InternetExplorer.svelte';
    import { ProgramFilter, ProgramHelper } from '../programs';

	onMount(() => {
		const timeUpdater = setInterval(() => {
			var date = new Date();
			CurrentTime.set(date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).replace(/^0(?=\d)/, ''))
			CurrentDate.set(date.toLocaleDateString());
		}, 1000);

		return () => {
			clearInterval(timeUpdater)
		}
		
	})
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
</svelte:head>

<DesktopGrid></DesktopGrid>
<InternetExplorer></InternetExplorer>
<!--
{#if ProgramHelper.IsWindowActive(ProgramFilter.GetPrograms()[0])}
	<InternetExplorer></InternetExplorer>
{/if}
-->
{#if $TogglableStartMenu}
<StartMenu></StartMenu>
{/if}
<TaskBar></TaskBar>
