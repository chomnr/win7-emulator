<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<div class="win7-taskbar win7-taskbar--aero">
	<div class="win7-taskbar__content win7-taskbar__content--use-flex">
		<div class="win7-taskbar__group win7-taskbar__group--use-remaining-space taskbar__group--horizontal-padding">
			<div class="win7-taskbar__program win7-taskbar__program--startmenu">60000</div>
		</div>
		<div class="win7-taskbar__group win7-taskbar__group--far-right win7-taskbar__group--small-gap win7-taskbar__group--align-programs taskbar__group--horizontal-padding">
			<div class="win7-taskbar__program win7-taskbar__program--list-programs font-xs"></div>
			<div class="win7-taskbar__program win7-taskbar__program--connection"></div>
			<div class="win7-taskbar__program win7-taskbar__program--network-audio-3"></div>
		</div>
	</div>
</div>
