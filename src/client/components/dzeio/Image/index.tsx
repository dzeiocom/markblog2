import React from 'react'
import { buildClassName } from '../Util'

import css from './Image.module.styl'

export interface ImageProps {
	defaultHeight?: number
	src?: string
	sources?: Array<string>
	deleteOnError?: boolean
	downgradeOnError?: string
	canFullscreen?: boolean
	max?: {
		height?: number|string
		width?: number|string
	}
	width?: number|string
	default?: {
		height?: number|string
		width?: number|string
	}
	alt?: string
	classes?: string
	className?: string
	onClick?: () => void
}

enum images {
	JPEG = 'image/jpeg',
	XICON = 'image/x-icon',
	TIFF = 'image/tiff'
}

const mimeTypes = {
	apng: 'image/apng',
	bmp: 'image/bmp',
	gif: 'image/gif',

	ico: images.XICON,
	cur: images.XICON,

	jpg: images.JPEG,
	jpeg: images.JPEG,
	jfif: images.JPEG,
	pjpeg: images.JPEG,
	pjp: images.JPEG,

	png: 'image/png',
	svg: 'image/svg+xml',

	tif: images.TIFF,
	tiff: images.TIFF,

	webp: 'image/webp'
}

const getMimeType = (img: string) => {
	const arr = img.split('.')
	return mimeTypes[arr[arr.length-1] as 'apng'] || mimeTypes.png
}

type evType<T = HTMLImageElement> = React.SyntheticEvent<T, Event>

export default class Image extends React.Component<ImageProps> {

	private ref: React.RefObject<HTMLImageElement> = React.createRef()
	private plchldr: React.RefObject<HTMLDivElement> = React.createRef()
	private parent: React.RefObject<HTMLDivElement> = React.createRef()
	private pic: React.RefObject<HTMLPictureElement> = React.createRef()

	private wasDowngraded = false
	private cardPos: Array<number> = []
	private cardSize: Array<number> = []

	private isFullscreen = false

	public async componentDidMount() {
		if (this.props.canFullscreen) {
			window.addEventListener('scroll', this.onScroll)
			window.addEventListener('resize', this.onResize)
			this.onScroll()
			this.onResize()
		}
	}

	public async componentDidUpdate() {
		this.pic.current?.classList.remove(css.none)
		if (this.props.canFullscreen) {
			this.onScroll()
			this.onResize()
		}
		if (this.isFullscreen) {
			this.onClick()
		}
	}

	public async componentWillUnmount() {
		if (this.props.canFullscreen) {
			window.removeEventListener('scroll', this.onScroll)
			window.removeEventListener('resize', this.onResize)
		}
	}

	public render() {
		const pic = (
			<picture ref={this.pic} className={this.props.classes}>
				{this.props.sources && this.props.sources.map((el, index) => (
					<source key={index} srcSet={el} type={getMimeType(el)}/>
				))}
				<img
					className={buildClassName([css.image], [this.props.className])}
					ref={this.ref}
					src={this.props.src}
					onClick={this.props.canFullscreen && this.onClick || this.props.onClick}
					onLoad={this.props.default && this.onLoad || undefined}
					onError={this.props.deleteOnError && this.onError || undefined}
					style={{
						width: this.props.default?.width,
						height: this.props.default?.height,
						maxHeight: this.props.max?.height,
						maxWidth: this.props.max?.width
					}}
					alt={this.props.alt}
				/>
			</picture>
		)
		if (this.props.canFullscreen) {
			return (
				<div ref={this.parent}>
					<div ref={this.plchldr} className={css.none}></div>
					{pic}
				</div>
			)
		}
		return pic
	}

	private onScroll = async () => {
		if (!this.ref.current || this.isFullscreen || !this.props.canFullscreen) {
			return
		}

		this.cardPos = [this.ref.current.offsetTop - window.scrollY, this.ref.current.offsetLeft - window.scrollX]
		this.ref.current.style.top = this.cardPos[0] + 'px'
		this.ref.current.style.left = this.cardPos[1] + 'px'
	}

	private onResize = async () => {
		if (!this.ref.current || !this.plchldr.current || !this.props.canFullscreen || this.isFullscreen) {
			return
		}
		let tmp = [this.ref.current.offsetHeight, this.ref.current.offsetWidth]
		if (this.parent.current) {
			tmp = [this.parent.current.offsetHeight, this.ref.current.offsetWidth]
		}
		this.plchldr.current.style.width = `${tmp[1]}px`
		this.plchldr.current.style.height = `${tmp[0]}px`
	}

	private onClick = async () => {
		if (!this.ref.current || !this.props.canFullscreen || !this.plchldr.current) {
			return
		}
		if (this.props.onClick) {
			this.props.onClick()
		}

		const i = this.ref.current
		const c = this.plchldr.current
		const body = document.body
		i.style.top = this.cardPos[0] + 'px'
		i.style.left = this.cardPos[1] + 'px'

		if (this.isFullscreen) {
			i.style.width = this.cardSize[1] + 'px'
			i.style.height = this.cardSize[0] + 'px'
			body.classList.remove(css.hideOverflow)
			i.classList.remove(css.ph2)
			i.classList.add(css.after)

			setTimeout(() => {
				if (i.classList.contains(css.ph2) || i.classList.contains(css.ph1) || this.isFullscreen) {
					return
				}
				const w = this.valToPixel(this.props.width)
				const mh = this.valToPixel(this.props.max?.height)
				const mw = this.valToPixel(this.props.max?.width)
				c.classList.add(css.none)
				i.style.height = ''
				i.style.width = w
				i.style.maxHeight = mh
				i.style.maxWidth = mw
				i.classList.remove(css.after)
			}, 350)
			this.isFullscreen = false
		} else {
			i.classList.add(css.ph1)
			c.classList.remove(css.none)
			i.classList.add(css.ph2)
			i.classList.remove(css.ph1)
			body.classList.add(css.hideOverflow)
			this.isFullscreen = true
		}
	}

	private valToPixel(value: number|string|undefined): string {
		if (typeof value === 'number') {
			return `${value}px`
		}
		if (typeof value === 'undefined') {
			return ''
		}
		return value
	}

	private onLoad = async (ev: evType) => {
		ev.currentTarget.style.height = ''
		ev.currentTarget.style.width = ''
	}

	private onError = async (ev: evType) => {
		this.w('Picture not loaded', ev.currentTarget.src)
		ev.currentTarget.parentElement?.classList.add(css.none)
	}

	private w(...messages: any) {
		console.warn('[ Picture ]', ...messages)
	}

}
