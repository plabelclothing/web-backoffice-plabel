import dotenv from 'dotenv';

dotenv.config({path: __dirname + '/config/.env.' + process.env.NODE_ENV});

export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: ''},
			{name: 'format-detection', content: 'telephone=no'}
		],
		link: [
			{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
		]
	},

	// Customize the progress-bar color
	loading: {
		color: '#191716'
	},

	axios: {
		baseURL: process.env.API_HOST,
	},

	router: {
		middleware: 'auth'
	},

	server: {
		port: process.env.SERVER_PORT,
		host: process.env.SERVER_HOST,
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		// Load a Node.js module directly (here it's a Sass file)
		'bulma',
		// SCSS file in the project
		'~/assets/scss/main.scss',
		'~/assets/scss/animate.min.css'
	],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		{src: '~/plugins/ApiBase.js'},
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/buefy
		'nuxt-buefy',
		'@nuxtjs/axios',
		'cookie-universal-nuxt',
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	}
}
