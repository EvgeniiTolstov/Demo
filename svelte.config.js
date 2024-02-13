//import adapter from "@sveltejs/adapter-vercel";
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter({
		  // default options are shown
		  out: 'build',
		  precompress: false,
		  envPrefix: 'CONF_',
		  polyfill: true
		}),
		csrf: {
			checkOrigin: false,
		  }
	  }
};

export default config;

