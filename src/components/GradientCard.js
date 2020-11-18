import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Dimensions } from 'react-native';

import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
	background: {
		alignItems: 'center',
		borderRadius: theme.borderRadiusMedium,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3
	}
});

export default ({ children, style }) => {
	return (
		<LinearGradient
			colors={[theme.primaryColorStart, theme.primaryColorEnd]}
			style={[styles.background, style]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}>
			{children}
		</LinearGradient>
	);
};
