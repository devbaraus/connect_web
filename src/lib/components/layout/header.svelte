<script lang="ts">
	const links = [
		{
			name: 'Busca',
			href: '/busca'
		},
		{
			name: 'Playground',
			href: '/playground'
		},
	];
</script>

<header>
	<nav
		class="fixed z-20 w-full overflow-hidden rounded-b-lg border-x border-b border-[--ui-light-border-color] bg-white/80 backdrop-blur dark:border-[--ui-dark-border-color] dark:bg-gray-950/75 dark:shadow-md dark:shadow-gray-950/10"
	>
		<div class="m-auto max-w-6xl px-6 2xl:px-0">
			<div class="flex flex-wrap items-center justify-between py-2 sm:py-4">
				<div class="flex w-full items-center justify-between lg:w-auto">
					<a href="/" class="font-semibold uppercase" aria-label="connect logo">connect</a>
					<div class="flex lg:hidden">
						<button
							aria-label="humburger"
							id="menu"
							class="bordeer-gray-950/30 relative size-9 rounded-full border transition duration-300 active:scale-95 dark:border-white/20"
						>
							<div
								aria-hidden="true"
								id="line1"
								class="m-auto h-[1.5px] w-4 rounded bg-gray-900 transition duration-300 dark:bg-gray-300"
							></div>
							<div
								aria-hidden="true"
								id="line2"
								class="m-auto mt-1.5 h-[1.5px] w-4 rounded bg-gray-900 transition duration-300 dark:bg-gray-300"
							></div>
						</button>
					</div>
				</div>
				<div
					class="h-0 w-full flex-wrap items-center justify-end space-y-8 md:flex-nowrap lg:flex lg:h-fit lg:w-fit lg:space-y-0"
				>
					<div class="mt-6 text-gray-600 md:-ml-4 lg:mt-0 lg:pr-4 dark:text-gray-300">
						<ul class="space-y-6 text-base tracking-wide lg:flex lg:space-y-0 lg:text-sm">
							{#each links as link (link.href)}
								<li>
									<a
										href={link.href}
										class="block transition hover:text-primary-600 md:px-4 dark:hover:text-primary-400"
									>
										<span>{link.name}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>
