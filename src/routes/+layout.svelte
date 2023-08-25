<script>
	/*import Header from './Header.svelte';*/
	import './styles.css';
	import './win7-os.css'
	import '../../node_modules/modern-normalize/modern-normalize.css';

	/*
	import '../../node_modules/7.css/dist/7.css'
	*/
</script>

<div class="win7-emulator">
	<main class="win7-desktop">
		<div class="win7-desktop__content win7-desktop__content--with-bg win7-taskbar__program--with-startmenu">
			<slot />
		</div>
	</main>
</div>

<!--
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
-->

	<!--<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
-->