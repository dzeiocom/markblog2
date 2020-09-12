import React from 'react'
import { Check } from 'react-feather'
import { buildClassName } from '../Util'

import { ColorType } from '../interfaces'
import css from './Checkbox.module.styl'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label?: string
	id: string
	type?: undefined
	radio?: boolean
	switch?: boolean
	color?: ColorType
}

export default class Checkbox extends React.Component<Props> {


	public render() {
		const props: Props = Object.assign({}, this.props)
		delete props.label
		delete props.type
		delete props.color
		delete props.switch
		delete props.radio

		const realType = this.props.radio ? 'radio' : 'checkbox'

		return (
			<label htmlFor={this.props.id} className={buildClassName(
				[css.label],
				[css.radio, realType === 'radio'],
				[css.switch, this.props.switch],
				[css[this.props.color as string], this.props.color]
			)}>
				<input {...props}
					type={realType}
				/>
				<span>
					{realType === 'checkbox' && ! this.props.switch && (
						<Check strokeWidth={4} size={16}/>
					)}
				</span>
				{this.props.label}
			</label>
		)
	}

}
