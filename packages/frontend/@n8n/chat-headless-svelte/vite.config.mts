import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import pkg from './package.json';

const banner = `/*! Package version @n8n/chat-headless-svelte@${pkg.version} */`;

export default defineConfig({
	plugins: [
		svelte({
			compilerOptions: {
				// Enable runtime checks in development
				dev: process.env.NODE_ENV !== 'production',
			},
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'N8nChatHeadlessSvelte',
			fileName: (format) => `chat-headless-svelte.${format}.js`,
		},
		rollupOptions: {
			external: ['svelte', 'svelte/store'],
			output: {
				exports: 'named',
				banner,
				globals: {
					svelte: 'Svelte',
					'svelte/store': 'SvelteStore',
				},
			},
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
	},
});
