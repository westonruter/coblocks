/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.mediaCard =
<SVG className="dashicon components-coblocks-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<G transform="translate(3 3)"><Path d="m10 0c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2v-14c0-1.1.9-2 2-2zm2 2.5h-3c-1.80029297 0-2.81677246 1.20318604-3 2.4788208v8.1696777c0 1.2033081 1.70123291 2.3515015 2.49108887 2.3515015h3.50891113z"/><Path d="m16 3.5c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-7c0-1.1.9-2 2-2zm0 9v-7h-7v7z" transform="matrix(0 1 -1 0 21.5 -3.5)"/></G>
</SVG>;

icons.mediaCardLeft =
<SVG height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><G transform="translate(2 1)"><Path d="m9 0c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-14c0-1.1.9-2 2-2zm2 2.5h-3c-1.80029297 0-2.81677246 1.20318604-3 2.4788208v8.1696777c0 1.2033081 1.70123291 2.3515015 2.49108887 2.3515015h3.50891113z"/><Path d="m14.5 4c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2zm0 8v-6h-7v6z" transform="matrix(0 1 -1 0 20 -2)"/></G></SVG>

icons.mediaCardRight =
<SVG height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><G transform="matrix(-1 0 0 1 18 1)"><Path d="m9 0c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-14c0-1.1.9-2 2-2zm2 2.5h-3c-1.80029297 0-2.81677246 1.20318604-3 2.4788208v8.1696777c0 1.2033081 1.70123291 2.3515015 2.49108887 2.3515015h3.50891113z"/><Path d="m14.5 4c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2zm0 8v-6h-7v6z" transform="matrix(0 1 -1 0 20 -2)"/></G></SVG>

icons.mediaContainerIcon =
<SVG height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><Path d="m18 2 2 4h-2l-2-4h-3l2 4h-2l-2-4h-1a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-12zm2 12h-10v-9.6l1.8 3.6h8.2z"/><Path d="m14 20h-10v-10h3v-2h-3a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3h-2z"/><Path d="m5 19h8l-1.59-2h-2.17l-.84 1.1-1.4-1.8z"/></SVG>

export default icons;
