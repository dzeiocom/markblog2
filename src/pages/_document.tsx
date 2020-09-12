import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import Favicons from '@cp/Favicons'

export default class CDocument extends Document {

	public render() {
		return (
			<Html>
				<Head>
					<Favicons />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}

}
