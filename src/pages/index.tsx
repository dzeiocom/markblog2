import React from 'react'

import Navbar from '@cp/dzeio/Navbar'
import GradientBackground from '@cp/dzeio/GradientBackground'
import NavbarSpace from '@cp/dzeio/Navbar/NavbarSpace'
import Container from '@cp/dzeio/Container'
import Overflow from '@cp/dzeio/Overflow'
import Row from '@cp/dzeio/Row'
import Col from '@cp/dzeio/Col'
import Input from '@cp/dzeio/Input'
import { BoxWrapper, BoxHeader, BoxBody } from '@cp/dzeio/Box'
import DebugCols from '@cp/dzeio/Col/DebugCols'


export default class Index extends React.Component {

	public render() {
		return (
			<>
				{/* <DebugCols /> */}
				<Navbar links={[]} />
				<GradientBackground color="primary">
					<NavbarSpace />
					<Overflow top />
				</GradientBackground>
				<Row>
					<Col size={9} tabletSize={6} mobileSize={4}>
						<Overflow bottom />
						<Row>
							{[0, 1, 2, 3, 4, 5].map((el, index) => (
								<Col size={4} tabletSize={4} mobileSize={4} key={index}>
									<BoxWrapper outline>
										<BoxHeader title="Post Title" subtitle="Post subtitle" />
										<BoxBody>
											<p>This Article is wonderfull !</p>
										</BoxBody>
									</BoxWrapper>
								</Col>
							))}
						</Row>
					</Col>
					<Col size={3} tabletSize={2} mobileSize={4}>
						<Input type="select" label="Sort">
							<option>Most to less recent post</option>
							<option>less to mort recent post</option>
						</Input>
					</Col>
				</Row>
			</>
		)
	}

}
