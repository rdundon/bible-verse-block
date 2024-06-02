/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { TextControl, TextareaControl, __experimentalNumberControl } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;
	return (
		<div { ...useBlockProps() }>
			{ __(
				'Bible Verse Block – hello from editor!',
				'bible-verse-block'
			) }
			testing!
				<TextareaControl 
					label="Content"
					value={attributes.text}
					name="content"
					onChange={(newtext) => setAttributes({ text: newtext })}
				/>
				<TextControl
					label="Book"
					value={attributes.book}
					name="book"
					onChange={(newtext) => setAttributes({ book: newtext })}
				/>
				<__experimentalNumberControl
					label="Chapter"
					value={attributes.chapter}
					name="chapter"
					onChange={(newtext) => setAttributes({ chapter: newtext })}
				/>
				<TextControl
					label="Verse"
					value={attributes.verse}
					name="verse"
					onChange={(newtext) => setAttributes({ verse: newtext})}
				/>
				<TextControl
					label="Version"
					value={attributes.version}
					name="version"
					onChange={(newtext) => setAttributes({ version: newtext })}
				/>
		</div>
	);
}
