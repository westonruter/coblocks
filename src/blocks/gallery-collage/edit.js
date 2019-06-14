/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import { title, icon } from './'
import Inspector from './inspector';
import Controls from './controls';
import GalleryImage from '../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import GalleryDropZone from '../../components/block-gallery/gallery-dropzone';
import GalleryUploader from '../../components/block-gallery/gallery-uploader';
import { GalleryClasses } from '../../components/block-gallery/shared';
import { BackgroundClasses, BackgroundStyles, BackgroundVideo } from '../../components/background';
import * as helper from './../../utils/helper';

/**
 * This block can recieve both image and video files.
 */
export const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ];

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { withNotices, Spinner } = wp.components;
const { withColors, withFontSizes, MediaUpload, MediaPlaceholder } = wp.editor;
const { isBlobURL } = wp.blob;

class GalleryCollageEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onMove = this.onMove.bind( this );
		this.onMoveForward = this.onMoveForward.bind( this );
		this.onMoveBackward = this.onMoveBackward.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );

		this.onSelectImages = this.onSelectImages.bind( this );

		this.state = {
			selectedImage: null,
		};
	}

	componentDidMount() {
		// This block does not support caption style.
		this.props.setAttributes( {
			captionStyle: undefined,
		} );
	}

	componentDidUpdate( prevProps ) {
		// Deselect images when deselecting the block
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
				captionSelected: false,
			} );
		}
	}

	onSelectImages( images ) {
		this.props.setAttributes( {
			images: images.map( ( image ) => helper.pickRelevantMediaFiles( image ) ),
		} );
	}

	onSelectImage( index ) {
		return () => {
			if ( this.state.selectedImage !== index ) {
				this.setState( {
					selectedImage: index,
				} );
			}
		};
	}

	onMove( oldIndex, newIndex ) {
		const images = [ ...this.props.attributes.images ];
		images.splice( newIndex, 1, this.props.attributes.images[ oldIndex ] );
		images.splice( oldIndex, 1, this.props.attributes.images[ newIndex ] );
		this.setState( { selectedImage: newIndex } );
		this.props.setAttributes( { images } );
	}

	onMoveForward( oldIndex ) {
		return () => {
			if ( oldIndex === this.props.attributes.images.length - 1 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex + 1 );
		};
	}

	onMoveBackward( oldIndex ) {
		return () => {
			if ( oldIndex === 0 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex - 1 );
		};
	}

	onRemoveImage( index ) {
		return () => {
			const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
			this.setState( { selectedImage: null } );
			this.props.setAttributes( {
				images,
			} );
		};
	}

	setImageAttributes( index, attributes ) {
		const { attributes: { images }, setAttributes } = this.props;
		if ( ! images[ index ] ) {
			return;
		}
		setAttributes( {
			images: [
				...images.slice( 0, index ),
				{
					...images[ index ],
					...attributes,
				},
				...images.slice( index + 1 ),
			],
		} );
	}

	render() {
		const {
			attributes,
			backgroundColor,
			captionColor,
			className,
			fontSize,
			isSelected,
			noticeOperations,
			noticeUI,
			setAttributes,
		} = this.props;

		const {
			align,
			captions,
			fullwidth,
			gutter,
			gutterMobile,
			images,
			linkTo,
			shadow,
			backgroundImg,
		} = attributes;

		const hasImages = !! images.length;

		// const innerClasses = classnames(
		// 	...GalleryClasses( attributes ),
		// 	...BackgroundClasses( attributes ), {
		// 		'has-fullwidth-images': fullwidth,
		// 		[ `align${ align }` ] : align,
		// 		[ `has-margin` ] : gutter > 0,
		// 		[ `has-margin-bottom-${ gutter }` ] : gutter > 0,
		// 		[ `has-margin-bottom-mobile-${ gutterMobile }` ] : gutterMobile > 0,
		// 	}
		// );

		// const innerStyles = {
		// 	...BackgroundStyles( attributes ),
		// 	backgroundColor: backgroundColor.color,
		// 	color: captionColor.color,
		// };

		if ( ! hasImages ) {
			return (
				<div className={ className }>
					<div className="coblocks-gallery">
						<div className="coblocks-gallery__row coblocks-gallery__row--top">
							<MediaPlaceholder
								addToGallery={ hasImages }
								isAppender={ hasImages }
								className={ className }
								dropZoneUIOnly={ hasImages && ! isSelected }
								multiple
								gallery
								onSelect={ this.onSelectImages }
								accept="image/*"
								allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
								value={ images.map( ( img ) => img.id ) }
								onError={ noticeOperations.createErrorNotice }
								notices={ hasImages ? undefined : noticeUI }
								>
							</MediaPlaceholder>
							<MediaPlaceholder
								onSelect={ this.onSelectImages }
								accept="image/*"
								allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
								value={ images.map( ( img ) => img.id ) }
								>
							</MediaPlaceholder>
						</div>

						<div className="coblocks-gallery__row coblocks-gallery__row--bottom">
							<MediaPlaceholder
								onSelect={ this.onSelectImages }
								accept="image/*"
								allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
								value={ images.map( ( img ) => img.id ) }
								>
							</MediaPlaceholder>
							<MediaPlaceholder
								onSelect={ this.onSelectImages }
								accept="image/*"
								allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
								value={ images.map( ( img ) => img.id ) }
								>
							</MediaPlaceholder>
							<MediaPlaceholder
								onSelect={ this.onSelectImages }
								accept="image/*"
								allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
								value={ images.map( ( img ) => img.id ) }
								>
							</MediaPlaceholder>
						</div>
					</div>
				</div>
			);
		}

		return (
			<Fragment>
				{ isSelected &&
					<Controls
						{ ...this.props }
					/>
				}
				{ isSelected &&
					<Inspector
						{ ...this.props }
					/>
				}
				{ noticeUI }
				<div className={ className }>
					<div className="coblocks-gallery">
						<div className="coblocks-gallery__row coblocks-gallery__row--top">

							{ images.slice( 0, 2 ).map( ( img, index ) => {
								// translators: %1$d is the order number of the image, %2$d is the total number of images
								const ariaLabel = __( sprintf( 'image %1$d of %2$d in gallery', ( index + 1 ), images.length ) );

								const renderImage = (
									<div className="coblocks-gallery--itemss" key={ img.id || img.url } onClick={ this.onItemClick }>
										<GalleryImage
											url={ img.url }
											alt={ img.alt }
											id={ img.id }
											isSelected={ isSelected && this.state.selectedImage === index }
											onRemove={ this.onRemoveImage( index ) }
											onSelect={ this.onSelectImage( index ) }
											setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
											caption={ img.caption }
											aria-label={ ariaLabel }
											supportsCaption={ false }

											supportsMoving={ false }
											// isFirstItem={ index === 0 }
											// isLastItem={ ( index + 1 ) === images.length }
											// isSelected={ isSelected && this.state.selectedImage === index }
											// onMoveBackward={ this.onMoveBackward( index ) }
											// onMoveForward={ this.onMoveForward( index ) }
										/>
									</div>
								);

								const renderPlaceholder = (
									<MediaPlaceholder
										// onSelect={ onSelectMedia }
										accept="image/*"
										allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
										>
									</MediaPlaceholder>
								);



								// if (index >= 0 && 2 <= end) {
								// 	return renderImage;
								// }


								if ( index === 0 && img.url ) {
									return renderImage;
								} else {
									return renderPlaceholder;
								}

								if ( index === 1 && img.url ) {
									return renderImage;
								} else {
									return renderPlaceholder;
								}





								//console.log( 'top' + img.url );

							} ) }

						</div>

						<div className="coblocks-gallery__row coblocks-gallery__row--bottom">

							{ images.slice( 2, 5 ).map( ( img, index ) => {
								// translators: %1$d is the order number of the image, %2$d is the total number of images
								const ariaLabel = __( sprintf( 'image %1$d of %2$d in gallery', ( index + 3 ), images.length ) );

								const renderImage = (
									<div className="coblocks-gallery--item" key={ img.id || img.url } onClick={ this.onItemClick }>
										<GalleryImage
											url={ img.url }
											alt={ img.alt }
											id={ img.id }
											isSelected={ isSelected && this.state.selectedImage === index + 2  }
											onRemove={ this.onRemoveImage( index + 2 ) }
											onSelect={ this.onSelectImage( index + 2 ) }
											setAttributes={ ( attrs ) => this.setImageAttributes( index + 2, attrs ) }
											caption={ img.caption }
											aria-label={ ariaLabel }
											supportsCaption={ false }
											supportsMoving={ false }
											// isFirstItem={ index === 0 }
											// isLastItem={ ( index + 1 ) === images.length }
											// isSelected={ isSelected && this.state.selectedImage === index }
											// onMoveBackward={ this.onMoveBackward( index ) }
											// onMoveForward={ this.onMoveForward( index ) }

										/>
									</div>
								);

								const renderPlaceholder = (
									<MediaPlaceholder
										// onSelect={ onSelectMedia }
										accept="image/*"
										allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
										>
									</MediaPlaceholder>
								);

								// return renderImage;

								// console.log( 'bottom' + index );

								// return renderImage;

								// console.log(images);

								if ( index === 0 && img.url ) {
									return renderImage;
								} else {
									return renderPlaceholder;
								}

							} ) }

						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withColors( { backgroundColor : 'background-color', captionColor : 'color' } ),
	withFontSizes( 'fontSize' ),
	withNotices,
] )( GalleryCollageEdit );
