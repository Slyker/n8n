import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import pkg from './package.json';

const banner = `/*! Package version @n8n/chat-styled-svelte@${pkg.version} */`;

export default defineConfig({
	plugins: [
		svelte({
			compilerOptions: {
				dev: process.env.NODE_ENV !== 'production',
			},
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'N8nChatStyledSvelte',
			fileName: (format) => `chat-styled-svelte.${format}.js`,
		},
		rollupOptions: {
			external: ['svelte', 'svelte/store', '@n8n/chat-headless-svelte'],
			output: {
				exports: 'named',
				banner,
				globals: {
					svelte: 'Svelte',
					'svelte/store': 'SvelteStore',
					'@n8n/chat-headless-svelte': 'N8nChatHeadlessSvelte',
				},
			},
		},
		cssCodeSplit: false,
	},
	test: {
		globals: true,
		environment: 'jsdom',
	},
});
