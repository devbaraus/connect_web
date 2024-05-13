import type { PesquisadorSearch } from '$lib/types';
import { writable } from 'svelte/store';

export const searchHits = writable<PesquisadorSearch[]>([]);
