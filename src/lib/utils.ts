import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { goto } from '$app/navigation';

export function scrollHightlight(el: Element | null, hex: string = '#FFFF00') {
	if (!el) return;

	el?.scrollIntoView({
		behavior: 'smooth',
		block: 'center'
	});

	el.style.backgroundColor = `${hex}60`;

	setTimeout(() => {
		el.style.backgroundColor = null;
	}, 1500);
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function clamp(x: number, lo: number, hi: number) {
	return x < lo ? lo : x > hi ? hi : x;
}

export function transpose(a: any[][]) {
	if (a.length === 0) return a;

	return Object.keys(a[0]).map(function (c) {
		return a.map(function (r) {
			return r[c];
		});
	});
}

export function addSearchParam(key: string, value: string) {
	const url = new URL(location.href);
	url.searchParams.set(key, value);
	goto(url.toString());
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
