<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MenuIcon } from 'lucide-svelte';
	import SearchBar from './SearchBar.svelte';

	const links = [
		{
			name: 'Produções Bibliográficas',
			href: '/producao-bibliografica'
		},
		{
			name: 'Formações Acadêmicas',
			href: '/formacao-academica'
		}
		// {
		// 	name: 'Busca',
		// 	href: '/busca'
		// }
	];
</script>

<!-- ========== { HEADER }==========  -->
<header
	class="fixed left-0 right-0 top-0 z-40 border-b-[1px] border-b-neutral-600 bg-foreground text-background"
>
	<nav class="container mx-auto flex h-20 items-center justify-between gap-4 px-4 py-4 2xl:px-0">
		<!-- <div class="flex justify-between"> -->
		<div class="flex items-center gap-4">
			<div class="font-aquire text-4xl capitalize">CONNECT</div>
			<menu class="hidden h-full items-center gap-6 bg-transparent text-center text-sm lg:flex">
				{#each links as link (link.href)}
					<li class="hover:text-accent">
						<a href={link.href}>{link.name}</a>
					</li>
				{/each}
			</menu>
		</div>
		<!-- <div class="flex flex-row items-center py-4 lg:py-0">
						<div class="relative text-gray-900 hover:text-black block lg:hidden">
							<button type="button" class="menu-mobile block py-3 px-6 border-b-2 border-transparent">
								<span class="sr-only">Mobile menu</span>
								<svg class="open h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
								</svg>

								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close bi bi-x-lg h-8 w-8" viewBox="0 0 16 16">
									<path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
									<path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
								</svg>
							</button>
						</div>
					</div> -->
		<!-- </div> -->

		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="lg:hidden">
				<MenuIcon class="h-8 w-8" />
				<span class="sr-only">Toggle Menu</span>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-3/4 space-y-2">
				<div class="px-1">
					<SearchBar class="w-full text-foreground" />
				</div>
				{#each links as link (link.href)}
					<DropdownMenu.Item>
						<a href={link.href}>{link.name}</a>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<!-- nav menu -->

		<SearchBar class="hidden w-4/12 text-foreground lg:flex" />
	</nav>
</header>
<!-- end header -->
