<script>
    import DesktopGrid from './components/DesktopGrid.svelte';
	import StartMenu from './components/StartMenu.svelte';
	import TaskBar from './components/TaskBar.svelte';
	import { TogglableStartMenu } from './stores';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
</svelte:head>


<DesktopGrid></DesktopGrid>
{#if $TogglableStartMenu}
<StartMenu></StartMenu>
{/if}
<TaskBar></TaskBar>
