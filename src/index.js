/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Deprecated versions of the block for migration from old save() output.
 */
const deprecated = [
	{
		attributes: {
			book: { type: 'string' },
			chapter: { type: 'number' },
			text: { type: 'string', default: '' },
			verse: { type: 'number' },
			endVerse: { type: 'number' },
			version: { type: 'string', default: 'WEB' },
		},
		migrate( attributes ) {
			const { verse, endVerse, ...rest } = attributes;
			const verseStr = endVerse ? `${ verse }-${ endVerse }` : String( verse ?? '' );
			return { ...rest, verse: verseStr };
		},
		save( props ) {
			const { attributes } = props;
			const { book, chapter, verse, endVerse, version, text } = attributes;
			return (
				<div { ...useBlockProps.save() }>
					<blockquote>
						{text}
						<footer>
							<cite>
								{book} {chapter}:{verse}
								{endVerse ? `-${endVerse}` : ''} ({version})
							</cite>
						</footer>
					</blockquote>
				</div>
			);
		},
	},
	{
		attributes: {
			book: { type: 'string' },
			chapter: { type: 'number' },
			text: { type: 'string', default: '' },
			verse: { type: 'number' },
			endVerse: { type: 'number', default: null },
			version: { type: 'string', default: 'WEB' },
		},
		migrate( attributes ) {
			const { verse, endVerse, ...rest } = attributes;
			const verseStr = endVerse ? `${ verse }-${ endVerse }` : String( verse ?? '' );
			return { ...rest, verse: verseStr };
		},
		save( props ) {
			const { attributes } = props;
			const { book, chapter, verse, endVerse, version, text } = attributes;
			return (
				<div { ...useBlockProps.save() }>
					<blockquote>
						{text}
						<footer>
							<cite>{book} {chapter}:{verse}{endVerse != '' ? endVerse : ''} ({attributes.version})</cite>
						</footer>
					</blockquote>
				</div>
			);
		},
	},
];

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,

	deprecated,
} );
