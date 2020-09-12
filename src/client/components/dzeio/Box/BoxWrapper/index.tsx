import React from 'react'

import css from './BoxWrapper.module.styl'
import { buildClassName } from '@cp/dzeio/Util'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	outline?: boolean
	className?: string
}

export default class BoxWrapper extends React.Component<Props> {

	public render = () => (
		<div {...this.props}
			className={buildClassName(
				css.box,
				this.props.className,
				[css.outline, this.props.outline]
			)}
		>
			{this.props.children}
		</div>
	)

}

/*
Wrapper extends div

Body
noPadding?: boolean
*/
