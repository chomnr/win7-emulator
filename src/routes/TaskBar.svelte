<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<div class="win7-taskbar win7-taskbar__content win7-taskbar--aero">
	dsadssd
</div>

<style>
	:root {
		--taskbar-height: 40px;

		/* Addition to the Aero theme */
		--aero-border-top-color: rgba(36, 60, 81, 1);
		--aero-border-top-bottom-color: rgba(153, 193, 224, 1)
	}

	.win7-taskbar {
		position: fixed;
		bottom: 0;
		width: inherit;
	}

	.win7-taskbar--aero {
		background: var(--aero-background);
		border-top: 1px solid var(--aero-border-top-color);
		box-shadow: inset 0px 6.5px 1px -6px  var(--aero-border-top-bottom-color);
		backdrop-filter: blur(5px);
	}

	.win7-taskbar__content {
		height: var(--taskbar-height);
	}
</style>
