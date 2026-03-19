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
				'Bible Verse Block',
				'bible-verse-block'
			) }
				<TextareaControl 
					label="Content"
					value={attributes.text}
					name="content"
					className='content'
					onChange={(newtext) => setAttributes({ text: newtext })}
				/>
				<section class="chapter-verse-reference">
					<TextControl
						label="Book"
						value={attributes.book}
						name="book"
						onChange={(newtext) => setAttributes({ book: newtext })}
					/>
				<TextControl
					label="Chapter"
					value={attributes.chapter}
					name="chapter"
					className="chapter"
					onChange={(val) => setAttributes({ chapter: val !== '' ? Number(val) : undefined })}
				/>
				<TextControl
					label="Verse"
					value={attributes.verse}
					name="verse"
					className="verse"
					onChange={(val) => setAttributes({ verse: val })}
				/>
					<TextControl
						label="Version"
						value={attributes.version}
						name="version"
						onChange={(newtext) => setAttributes({ version: newtext })}
					/>
				</section>
		</div>
	);
}
