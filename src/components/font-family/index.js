/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import googleFonts from './fonts';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { withInstanceId } = wp.compose;
const { BaseControl, SelectControl, NavigableMenu, Button, Dropdown, Dashicon } = wp.components;

/**
 * FontFamilyPicker Component
 */
function FontFamilyPicker( { label, value, help, instanceId, onChange, className, ...props } ){
	const id = `inspector-coblocks-font-family-${ instanceId }`;
	const fonts = [
		{ value: '', label: __( 'Default' ) },
		{ value: 'Arial', label: 'Arial' },
		{ value: 'Helvetica', label: 'Helvetica' },
		{ value: 'Times New Roman', label: 'Times New Roman' },
		{ value: 'Georgia', label: 'Georgia' },
	];

	//Add Google Fonts
	Object.keys( googleFonts ).map( ( k, v ) => {
		fonts.push(
			{ value: k, label: k }
		);
	});

	const onChangeValue = ( event ) => {
		var meta 		= wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		var ba 	 		= '';
		var googleFonts_attr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';
		var link 		= document.createElement('link');
	    link.rel 		= 'stylesheet';

		if( typeof meta !== 'undefined' && typeof meta._coblocks_attr !== 'undefined' ){
			ba =  meta._coblocks_attr;
		}

		if( ba.length > 0 ){

			//Load fonts on the header
			if( ! ba.includes( event.target.value ) ){
			    link.href 		= 'https://fonts.googleapis.com/css?family=' + event.target.value.replace(/ /g, '+') + googleFonts_attr;
			    document.head.appendChild( link );
			}

			ba = ba.replace( ','+ event.target.value , '' );
			ba = ba + ',' + event.target.value;


		}else{
			link.href 		= 'https://fonts.googleapis.com/css?family=' + event.target.value.replace(/ /g, '+') + googleFonts_attr;
			document.head.appendChild( link );

			ba = event.target.value;
		}

		//Save values to metadata
		wp.data.dispatch( 'core/editor' ).editPost({
			meta: {
				_coblocks_attr: ba,
			}
		});

		onChange( event.target.value );
	};

	const utilitySizes = [
			{
				name: __( 'None' ),
				size: 0,
				slug: 'no',
			},
			{
				name: __( 'Small' ),
				size: 14,
				slug: 'small',
			},
			{
				name: __( 'Medium' ),
				size: 24,
				slug: 'medium',
			},
			{
				name: __( 'Large' ),
				size: 34,
				slug: 'large',
			},{
				name: __( 'Huge' ),
				size: 60,
				slug: 'huge',
			},
		];


	return(
		<BaseControl label={ label } id={ id } help={ help } className={ className }>
			<select
				id={ id }
				className="components-select-control__input components-select-control__input--coblocks-fontfamily"
				onChange={ onChangeValue }
				aria-describedby={ !! help ? `${ id }__help` : undefined }
				{ ...props }
			>
				{ fonts.map( ( option, index ) =>
					<option
						key={ `${ option.label }-${ option.value }-${ index }` }
						value={ option.value }
						selected={ value == option.value ? 'selected' : '' }
					>
						{ option.label }
					</option>
				) }
			</select>

			<div className="components-font-size-picker__buttons">
				<Dropdown
					className="components-font-size-picker__dropdown"
					contentClassName="components-font-family-picker__dropdown-content components-coblocks-dimensions-control__dropdown-content"
					position="bottom"
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							className="components-font-size-picker__selector"
							isLarge
							onClick={ onToggle }
							aria-expanded={ isOpen }
							aria-label={ __( 'Custom Size' ) }
						>

						</Button>
					) }
					renderContent={ () => (
						<NavigableMenu>
							{ fonts.map( ( option, index ) =>
								<Button
									key={ `${ option.label }-${ option.value }-${ index }` }
									onClick={ () => this.onChangeSize( slug, size ) }
									role="menuitem"
								>
									<span className="components-font-size-picker__dropdown-text-size">
										{ option.label }
									</span>
								</Button>
							) }
						</NavigableMenu>
					) }
				/>
			</div>

		</BaseControl>
	);
}

export default withInstanceId( FontFamilyPicker );