// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
  const textAreaTheme = {
    '.underline': {
      borderBottomWidth: variables.borderWidth,
      marginTop: 5,
      borderColor: variables.inputBorderColor
    },
    '.bordered': {
      borderWidth: 1,
      marginTop: 5,
      borderColor: variables.inputBorderColor
    },
    color: variables.textColor,
    paddingLeft: 10,
    paddingRight: 5,
    fontSize: variables.inputFontSize,
    textAlignVertical: 'top'
  };

  return textAreaTheme;
};
