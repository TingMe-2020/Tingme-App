import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import theme from 'tingme/native-base-theme/variables/commonColor';
import { View, Icon } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
	bgGradient: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default ({ children, size = 50, shadowWidth = 3, onPress, style, btnStyle }) => {
	return (
		<LinearGradient
			colors={[theme.primaryColorStartAlpha1, theme.primaryColorEndAlpha1]}
			style={[
				styles.bgGradient,
				{
					width: size + shadowWidth * 2,
					height: size + shadowWidth * 2,
					borderRadius: (size + shadowWidth * 2) / 2,
					...style
				}
			]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}>
			<TouchableOpacity onPress={onPress}>
				<View
					style={[
						styles.button,
						{
							width: size,
							height: size,
							borderRadius: size / 2,
							...btnStyle
						}
					]}>
					{children}
				</View>
			</TouchableOpacity>
		</LinearGradient>
	);
};
