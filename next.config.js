const stylus = require('@zeit/next-stylus')
const purgeCSS = require('next-purgecss')
const withPlugins = require('next-compose-plugins')
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

module.exports = withPlugins([
		[stylus, {
			cssModules: true,
			cssLoaderOptions: {
				localIdentName: "[hash:base64:6]",
			},
			[PHASE_DEVELOPMENT_SERVER]: {
				cssLoaderOptions: {
					localIdentName: "[path][name]__[local]"
				}
			}
		}],
		// [purgeCSS, {
		// 	purgeCssPaths: [
		// 		'pages/**/*',
		// 		'components/**/*',
		// 		'styl/**/*'
		// 	],
		// 	purgeCSS: {
		// 		content: [
		// 			'components/**/*.tsx',
		// 			'pages/**/*.tsx'
		// 		]
		// 	}
		// }],
	], {
		plugins: [
			["styled-jsx/babel", {
				optimizeForSpeed: true,
				vendorPrefixes: true,
				sourceMaps: true,
				plugins: ["styled-jsx-plugin-stylus"]
			}]
		]
	}
)
