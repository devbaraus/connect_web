<script>
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	import '../app.pcss';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				refetchOnWindowFocus: false,
			}
		}
	});
</script>

<svelte:head>
	<title>Connect - Conectando Instituições e Pesquisadores</title>
	<meta
		name="description"
		content="Connect é a plataforma que facilita a colaboração entre instituições de pesquisa e pesquisadores no Brasil. Conecte-se, colabore e inove com o Connect."
	/>
	<meta
		name="keywords"
		content="Connect, instituições de pesquisa, pesquisadores, colaboração acadêmica e rede de pesquisa"
	/>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<Header />
	<div class="container mx-auto my-20 px-4">
		<slot />
	</div>
	<Footer />
</QueryClientProvider>
