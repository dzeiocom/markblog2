import React from 'react'
import renderer from 'react-test-renderer'
import HelloWorld from '../../src/client/components/HelloWorld'

/**
 * Example Test
 *
 * on first run it will generate a .snap file and after will compare result with it
 */

it('render a h1', () => {
	const tree = renderer.create((<HelloWorld>Test</HelloWorld>)).toJSON()
	expect(tree).toMatchSnapshot()
})
