/**
 * This program generate a simple sitmap.xml file
 * for static exports
**/

const config = require('../scriptsConfig.json').sitemap
const glob = require('glob')
const fs = require('fs/promises')
const { SitemapStream , streamToPromise } = require('sitemap')
const { Readable } = require( 'stream' )

if (!config.enabled) {
	return
}
console.log('Generating Sitemap...')

const stream = new SitemapStream(config.config)

;(async () => {
	console.log('Fetching files')
	const files = await new Promise((res, rej) => {
		glob('./out/**/*.html', (err, results) => {
			if (err) {
				rej(err)
			}
			res(results.map(el => ({url: el.replace('./out', '').replace('index.html', '')})))
		})
	})
	console.log('Merging with custom routes')
	for (const item of config.customRoutes) {
		const index = files.findIndex((val) => val.url === item.url)
		if (index !== -1) {
			files[index] = item
		} else {
			files.push(item)
		}
	}

	console.log('Pasing to sitemap.xml')
	const res = await streamToPromise(Readable.from(files).pipe(stream))

	console.log('Writing file')
	await fs.writeFile(config.outputPath, res)

	process.exit(0)
})()
