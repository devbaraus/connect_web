<script>
	import { browser } from '$app/environment'
	import {QueryClient, QueryClientProvider} from '@tanstack/svelte-query'

	import '../app.pcss';
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';


	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	})
</script>

<QueryClientProvider client={queryClient}>
<Header />
<main class="overflow-hidden">
	<slot />
</main>
<Footer />
</QueryClientProvider>
