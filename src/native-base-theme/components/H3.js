// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
	const h3Theme = {
		color: variables.textColor,
		fontSize: variables.fontSizeH3,
		lineHeight: variables.lineHeightH3,
		'.inverse': {
			color: variables.inverseTextColor
		},
		'.bold': {
			fontWeight: 'bold'
		},
		'.note': {
			fontSize: variables.fontSizeBase + 1,
			color: variables.textColorNote
		},
		'.padLeft': {
			paddingLeft: variables.spacingUnit
		},
		'.padLeft2': {
			paddingLeft: variables.spacingUnit*2
		}
	};

	return h3Theme;
};
