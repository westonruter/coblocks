/**
 * Internal dependencies
 */
import BackgroundAttributes from './attributes';
import BackgroundClasses from './classes';
import BackgroundImageToolbarControls from './controls';
import BackgroundImageDropZone from './dropzone';
import BackgroundImageTransforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { SelectControl, RangeControl, ToggleControl, PanelBody, Button, FocalPointPicker } = wp.components;

/**
 * Module constants.
 */
export const ALLOWED_BG_MEDIA_TYPES = [ 'image' ];
export const BLOCKS_WITH_AUTOPADDING = [ 'coblocks/row', 'coblocks/column', 'coblocks/media-card', 'coblocks/features', 'coblocks/feature' ];

/**
 * Export
 */
export {
	BackgroundAttributes,
	BackgroundClasses,
	BackgroundImageToolbarControls,
	BackgroundImageDropZone,
	BackgroundImageTransforms,
};

/**
 * Background Options Component
 */
function BackgroundImagePanel( props, options ) {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		backgroundPosition,
		backgroundRepeat,
		backgroundSize,
		backgroundOverlay,
		hasParallax,
		backgroundImg,
		focalPoint,
	} = attributes;

	const backgroundPositionOptions = [
		{ value: 'top left', label: __( 'Top Left' ) },
		{ value: 'top center', label: __( 'Top Center' ) },
		{ value: 'top right', label: __( 'Top Right' ) },
		{ value: 'center left', label: __( 'Center Left' ) },
		{ value: 'center center', label: __( 'Center Center' ) },
		{ value: 'center right', label: __( 'Center Right' ) },
		{ value: 'bottom left', label: __( 'Bottom Left' ) },
		{ value: 'bottom center', label: __( 'Bottom Center' ) },
		{ value: 'bottom right', label: __( 'Bottom Right' ) },
	];

	const backgroundRepeatOptions = [
		{ value: 'no-repeat', label: __( 'No Repeat' ) },
		{ value: 'repeat', label: __( 'Repeat' ) },
		{ value: 'repeat-x', label: __( 'Repeat Horizontally' ) },
		{ value: 'repeat-y', label: __( 'Repeat Vertically' ) },
	];

	const backgroundSizeOptions = [
		{ value: 'auto', label: __( 'Auto' ) },
		{ value: 'cover', label: __( 'Cover' ) },
		{ value: 'contain', label: __( 'Contain' ) },
	];

	const overlayStyleOptions = [
		{ value: 'dark', label: __( 'Dark' ) },
		{ value: 'gray', label: __( 'Gray' ) },
		{ value: 'light', label: __( 'Light' ) },
		{ value: 'background', label: __( 'Background Color' ) },
	];

	const overlaySelect = () => {
		if ( typeof options !== 'undefined' && typeof options.overlay !== 'undefined' && options.overlay ) {
			return(
				<RangeControl
					label={ __( 'Background Opacity' ) }
					value={ backgroundOverlay }
					onChange={ ( nextBackgroundOverlay ) => setAttributes( {  backgroundOverlay: nextBackgroundOverlay } ) }
					min={ 0 }
					max={ 90 }
					step={ 10 }
				/>
			);
		}
	}

	const onSelectRepeat = ( backgroundRepeat ) => {

		if ( backgroundRepeat === 'no-repeat' ) {
			setAttributes( {
				backgroundRepeat: backgroundRepeat,
				backgroundSize: 'cover',
			} );
		} else {
			setAttributes( {
				backgroundRepeat: backgroundRepeat,
				backgroundSize: 'contain',
				focalPoint: undefined,
			} );
		}
	}

	if ( backgroundImg ) {
		const backgroundSizeDefault = ( typeof options !== 'undefined' && typeof options.backgroundSize !== 'undefined' ) ? options.backgroundSize : 'cover';
		return(
			<Fragment>
				<PanelBody
					title={ ( typeof options !== 'undefined' && typeof options.label !== 'undefined' ) ? options.label : __( 'Background Settings' ) }
					initialOpen={ false }
					className="components-panel__body--coblocks-background-panel"
				>
					<ToggleControl
						label={ __( 'Fixed Background' ) }
						checked={ !! hasParallax }
						onChange={ () => setAttributes( {  hasParallax: ! hasParallax } ) }
					/>
					{ ! hasParallax && FocalPointPicker && backgroundRepeat !== 'repeat' && (
						<FocalPointPicker
							label={ __( 'Focal Point' ) }
							url={ backgroundImg }
							value={ focalPoint }
							onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
							className="components-focal-point-picker--coblocks"
						/>
					) }
					{ overlaySelect() }

					<SelectControl
						label={ __( 'Repeat' ) }
						className="components-background-display-select--coblocks"
						value={ backgroundRepeat ? backgroundRepeat : 'no-repeat' }
						options={ backgroundRepeatOptions }
						onChange={ ( nextbackgroundRepeat ) => onSelectRepeat( nextbackgroundRepeat ) }
					/>

					{ ! FocalPointPicker && (
						<SelectControl
							label={ __( 'Position' ) }
							value={ backgroundPosition ? backgroundPosition : 'center center' }
							options={ backgroundPositionOptions }
							onChange={ ( nextbackgroundPosition ) => setAttributes( { backgroundPosition: nextbackgroundPosition } ) }
						/>
					) }

					{ backgroundRepeat == 'no-repeat' && (
						<SelectControl
							label={ __( 'Display' ) }
							value={ backgroundSize ? backgroundSize : backgroundSizeDefault }
							options={ backgroundSizeOptions }
							onChange={ ( nextbackgroundSize ) => setAttributes( { backgroundSize: nextbackgroundSize } ) }
						/>
					) }

					<Button
						className="components-button--coblocks-remove-background-image"
						type="button"
						isDefault
						label={ __( 'Remove background Image' ) }
						onClick={ () => {
							setAttributes( {
								backgroundImg: '',
								backgroundOverlay: 0,
								backgroundRepeat: 'no-repeat',
								backgroundPosition: '',
								backgroundSize: 'cover',
								hasParallax: false,
							} );

							// Remove padding when background image is removed.
							if ( BLOCKS_WITH_AUTOPADDING.includes( props.name ) ){
								if( attributes.paddingSize ){
									setAttributes( { paddingSize: 'no' } );
								}
							}
						} }
					>
						{ __( 'Remove Image' ) }
					</Button>
				</PanelBody>
			</Fragment>
		);
	}
}

export default BackgroundImagePanel;