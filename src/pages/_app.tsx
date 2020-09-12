import App from 'next/app'
import React from 'react'
import { DefaultSeo } from 'next-seo'

import config from '../../clientConfig.json'

import '@styl/index.styl'

export default class CApp extends App {

	public render() {
		const { Component, pageProps } = this.props

		return (
			<>
				<DefaultSeo
					{...config.seo}
				/>
				<Component {...pageProps} />
			</>
		)
	}

}
