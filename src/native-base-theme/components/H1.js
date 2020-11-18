// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
	const h1Theme = {
		color: variables.textColor,
		fontSize: variables.fontSizeH1,
		lineHeight: variables.lineHeightH1,
		'.bold': {
			fontWeight: 'bold'
		},
		'.inverse': {
			color: variables.inverseTextColor
		}
	};

	return h1Theme;
};
