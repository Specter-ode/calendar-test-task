import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			babel: {
				plugins: ['@emotion/babel-plugin'],
			},
		}),
		svgr({
			include: '**/*.svg',
			svgrOptions: {
				ref: true,
				titleProp: true,
				exportType: 'named',
			},
		}),
		,
		tsconfigPaths(),
	],
});
