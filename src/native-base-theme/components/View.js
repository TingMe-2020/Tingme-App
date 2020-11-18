// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
	const viewTheme = {
		'.padder': {
			padding: variables.contentPadding
		},
		'.center': {
			justifyContent: 'center',
			alignItems: 'center'
		},
		'.fullWidth': {
			width: '100%'
		},
		'.grow': {
			flexGrow: 1
		},
		'.halfWidth': {
			width: '50%'
		},
		'.horizontal': {
			flexDirection: 'row'
		},
		'.wrap': {
			flexWrap: 'wrap'
		},
		'.between': {
			justifyContent: 'space-between'
		},
		'.formPadder': {
			paddingBottom: variables.spacingUnit4,
			'NativeBase.Text': {
				paddingBottom: variables.spacingUnit
			}
		},
		'.inputBox': {
			height: variables.inputHeightBase,
			borderWidth: variables.borderWidth * 2,
			borderColor: variables.inputBorderColor,
			justifyContent: 'center',
			paddingLeft: 5,
			paddingRight: 5,
			marginLeft: 2
		},
		'.inputOverlay': {
			position: 'absolute',
			backgroundColor: 'transparent',
			height: variables.inputHeightBase,
			width: '100%'
		},
		'.card': {
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 1.5,
			elevation: 3
		},
		'.screenContent': {
			paddingLeft: variables.spacingUnit4,
			paddingRight: variables.spacingUnit4,
			width: '100%'
		},
		'.unreadCount': {
			width: 25,
			height: 25,
			borderRadius: 12.5,
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 15,
			backgroundColor: variables.brandDanger,
			'NativeBase.Text': {
				fontSize: 12,
				color: '#fff',
				fontWeight: 'bold'
			}
		}
	};

	return viewTheme;
};
