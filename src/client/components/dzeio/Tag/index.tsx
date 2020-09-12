import React from 'react'

import { ColorType } from '../interfaces'
import { buildClassName } from '../Util'
import Link from '../Link'

import css from './Tag.module.styl'

interface Props {
	text: string
	color?: ColorType
	href: string
	as?: string
	outline?: boolean
}

export default class Tag extends React.Component<Props> {

	public render = () => (
		<Link
			href={this.props.href}
			as={this.props.as}
			className={buildClassName(
				css.tag,
				[css[this.props.color as string], this.props.color],
				[css.outline, this.props.outline]
			)}
		>
			{this.props.text}
		</Link>
	)

}
