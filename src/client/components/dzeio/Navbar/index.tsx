import React from 'react'
import Link from 'next/link'
import Row from '../Row'
import Col from '../Col'
import Button from '../Button'
import Image from '../Image'


import { buildClassName } from '../Util'
import css from './Navbar.module.styl'

interface Props {
	links: Array<{href: string, txt: string}>
}

export default class Navbar extends React.Component<Props> {

	public render = () => (
		<nav className={buildClassName(css.navbar)}>
			<Row>
				<Col size={3} mobileSize={4}>
					<Row nomargin align="center">
						<Link href="/">
							<a aria-label="Homepage">
								<Image
									alt="Logo"
									src="/assets/logo.svg"
									max={{ height: 70-16 }}
								/>
							</a>
						</Link>
					</Row>
				</Col>
				<Col>
					<Row nomargin justify="flex-end" align="center">
						<>
							{this.props.links.map((el, index) => (
								<Button key={index} nomargintop href={el.href}>{el.txt}</Button>
							))}
						</>
					</Row>
				</Col>
			</Row>
		</nav>
	)

}
