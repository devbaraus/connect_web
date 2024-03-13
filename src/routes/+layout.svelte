<script>
	import '../app.css';
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';
</script>

<Header />
<main class="overflow-hidden">
	<slot />
</main>
<Footer />
