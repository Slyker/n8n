import config from '@n8n/eslint-config/base';

export default [
	...config,
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
];
