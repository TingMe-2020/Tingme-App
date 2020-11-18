// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    '.note': {
      color: variables.textColorNote,
      fontSize: variables.noteFontSize
    },
    '.center': {
      textAlign: 'center'
    },
    '.error': {
      color: variables.brandDanger,
      fontSize: variables.noteFontSize
    },
    '.inverse': {
      color: variables.inverseTextColor
    },
    '.bold': {
      fontWeight: 'bold'
    },
    '.italic': {
      fontStyle: 'italic'
    },
    '.info': {
      color: variables.brandInfo
    }
  };

  return textTheme;
};
