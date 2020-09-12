import React from 'react'
import { buildClassName } from '../Util'
import css from './Col.module.styl'

interface Props {
	size?: 1|2|3|4|5|6|7|8|9|10|11|12
	offset?: 1|2|3|4|5|6|7|8|9|10|11
	children?: React.ReactNode
	className?: string
	nogrow?: boolean

	// Tablet related
	tabletSize?: 1|2|3|4|5|6|7|8
	tabletoffset?: 1|2|3|4|5|6|7
	tabletGrow?: boolean


	// Mobile related
	mobileSize?: 1|2|3|4
	mobileoffset?: 1|2|3
	mobileGrow?: boolean
}

export default class Col extends React.Component<Props> {

	public render = () => (
		<div className={buildClassName(
			css.col,

			// Normal
			[css[`col-${this.props.size}`], this.props.size],
			[css[`offset-${this.props.offset}`], this.props.offset],

			// Tablet
			[css[`col-tablet-${this.props.tabletSize}`], this.props.tabletSize],
			[css[`offset-tablet-${this.props.tabletoffset}`], this.props.tabletoffset],

			// Mobile
			[css[`col-mobile-${this.props.mobileSize}`], this.props.mobileSize],
			[css[`offset-mobile-${this.props.mobileoffset}`], this.props.mobileoffset],
			[css.nogrow, this.props.nogrow],
			[css.mobileGrow, this.props.mobileGrow],
			this.props.className
		)}>
			{this.props.children}
		</div>
	)

}
