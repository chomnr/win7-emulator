<script lang="ts">
		import { TogglableStartMenu } from "../stores";

		var whitelist: string[] = ["win7-startmenu__content", "win7-startmenu__group"];

		function toggleStartMenu(){
			if ($TogglableStartMenu == false) {
				TogglableStartMenu.set(true);
			} else {
				TogglableStartMenu.set(false);
			}
		}

		/*Close immediately when click out....*/
</script>

<div class="win7-taskbar win7--aero win7-taskbar--aero--additives">
	<div class="win7-taskbar__content win7-taskbar__content--use-flex">
		<div class="win7-taskbar__group win7-taskbar__group--use-remaining-space taskbar__group--horizontal-padding">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#if $TogglableStartMenu}
				<div role="button" tabindex="0" on:click={toggleStartMenu} id="button_startmenu" class="win7-taskbar__program win7-taskbar__program--startmenu--glow"></div>
				{:else}
				<div role="button" tabindex="0" on:click={toggleStartMenu} id="button_startmenu" class="win7-taskbar__program win7-taskbar__program--startmenu"></div>
			{/if}
		</div>
		<div class="win7-taskbar__group win7-taskbar__group--far-right win7-taskbar__group--small-gap win7-taskbar__group--align-programs taskbar__group--horizontal-padding">
			<div class="win7-taskbar__program win7-taskbar__program--list-programs font-xs"></div>
			<div class="win7-taskbar__program win7-taskbar__program--with-border win7-taskbar__program--hover win7-taskbar__program--connection"></div>
			<div class="win7-taskbar__program win7-taskbar__program--with-border win7-taskbar__program--hover win7-taskbar__program--network-audio-3"></div>
			<div class="win7-taskbar__program win7-taskbar__program--time win7-taskbar__program--fit-content win7-taskbar__program--time--left-padding font-segou_ui font-xs white">
				<div>11:44 AM</div>
				<div>9/22/2018</div>
			</div>
		</div>
	</div>
</div>
