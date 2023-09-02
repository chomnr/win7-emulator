<script>
    import { onMount } from 'svelte';
    import DesktopGrid from './Components/DesktopGrid.svelte';
	import StartMenu from './Components/StartMenu.svelte';
	import TaskBar from './Components/TaskBar.svelte';
	import { TogglableStartMenu, CurrentTime, CurrentDate } from './stores';
    import Explorer from './Programs/Explorer.svelte';

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
<Explorer></Explorer>
{#if $TogglableStartMenu}
<StartMenu></StartMenu>
{/if}
<TaskBar></TaskBar>
