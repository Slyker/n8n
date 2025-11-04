import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import sveltePlugin from 'eslint-plugin-svelte';

export default [
	js.configs.recommended,
	{
		files: ['**/*.ts', '**/*.svelte'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				extraFileExtensions: ['.svelte'],
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
		},
	},
	...sveltePlugin.configs['flat/recommended'],
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
];
