import React from 'react'
import NextLink from 'next/link'
import { ExternalLink } from 'react-feather'

import css from './Link.module.styl'

interface Props {
	href: string
	as?: string
	children?: React.ReactNode
	className?: string
}

export default class Link extends React.Component<Props> {

	public render() {
		if (
			this.props.href.includes('://') ||
			this.props.href.startsWith('//')
		) {
			// external link
			return (
				<a
					className={this.props.className}
					href={this.props.href}
					rel="noreferrer nofollow"
					target="_blank"
				>
					{this.props.children}<ExternalLink size={16} className={css.icon} />
				</a>
			)
		}
		return (
			<NextLink href={this.props.href} as={this.props.as}>
				<a className={this.props.className}>{this.props.children}</a>
			</NextLink>
		)
	}

}
