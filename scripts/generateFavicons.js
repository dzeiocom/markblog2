

const favicons = require('favicons')
const package = require('../package.json')
const config = require('../scriptsConfig.json').favicons
const fs = require('fs')

if (!config.enabled) {
	return
}

// image source
const source = config.sourceFile

// Output folder
const outFolder = config.assetsOutput

// Typescript React outpout file
// NOTE: add the file to your .gitignore
const tsxOutput = config.tsxOutput

// Configuration
const configuration = config.config
if (configuration.version === 'package.json') {
	configuration.version = package.version
}

console.log('Generating Favicons...')
favicons(source, configuration, (error, response) => {
	if (error) {
		console.log(error)
		return
	}

	console.log('Saving Files')
	let gitignore = ''
	for (const file of response.images) {
		fs.writeFileSync(`${outFolder}/${file.name}`, file.contents)
		gitignore += `${file.name}\n`
	}

	for (const file of response.files) {
		fs.writeFileSync(`${outFolder}/${file.name}`, file.contents)
		gitignore += `${file.name}\n`
	}
	fs.writeFileSync(`${outFolder}/.gitignore`, gitignore)

	if (!tsxOutput) {
		return
	}

	var htmlList = response.html.map((el) => `			${el.replace('>', '/>')}`).join('\n')

	fs.writeFileSync(tsxOutput, `import React from 'react'

export default class Favicons extends React.Component {

	public render = () => (
		<>
${htmlList}
		</>
	)

}
`)
	console.log('Saved!')
})
