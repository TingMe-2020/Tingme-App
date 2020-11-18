import React from 'react';

import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { H1, View, Text, Icon } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';

import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
	bgGradient: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

class ScanningButton extends React.Component {
	state = {
		scanAnimation: new Animated.Value(0.7),
		fadeAnimation: new Animated.Value(1)
	};

	componentDidMount() {
		Animated.loop(
			Animated.timing(this.state.scanAnimation, {
				toValue: 1.3,
				duration: 1500
			})
			// Animated.sequence([
			// 	Animated.timing(this.state.scanAnimation, {
			// 		toValue: 1.05,
			// 		duration: 800
			// 	}),
			// 	Animated.timing(this.state.scanAnimation, {
			// 		toValue: 0.75,
			// 		duration: 400
			// 	})
			// ])
		).start();
		Animated.loop(
			Animated.timing(this.state.fadeAnimation, {
				toValue: 0,
				duration: 1000,
				delay: 500
			})
		).start();
	}

	render() {
		const { size, shadowWidth } = this.props;
		// const animatedSize = this.state.scanAnimation.interpolate({
		// 	inputRange: [0, 1],
		// 	outputRange: [0, size + shadowWidth * 2]
		// });

		return (
			<View center style={{ position: 'relative' }}>
				<Animated.View
					style={{
						width: size + shadowWidth * 2,
						height: size + shadowWidth * 2,
						borderRadius: (size + shadowWidth * 2) / 2,
						opacity: this.state.fadeAnimation,
						transform: [{ scale: this.state.scanAnimation }],
						overflow: 'hidden'
					}}>
					<LinearGradient
						colors={[theme.primaryColorEndAlpha2, theme.primaryColorStartAlpha2]}
						style={[
							styles.bgGradient,
							{
								width: size + shadowWidth * 2,
								height: size + shadowWidth * 2,
								borderRadius: (size + shadowWidth * 2) / 2
							}
						]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}></LinearGradient>
				</Animated.View>
				<View
					style={[
						styles.button,
						{
							backgroundColor: 'white',
							position: 'absolute',
							top: shadowWidth,
							left: shadowWidth,
							width: size,
							height: size,
							borderRadius: size / 2
						}
					]}>
					<Icon name="ios-pause" />
				</View>
			</View>
		);
	}
}

export default ({ onStartScan, onStopScan, size = 100, shadowWidth = 20, isScanning }) => {
	if (isScanning) {
		return (
			<TouchableOpacity onPress={() => onStopScan && onStopScan()} activeOpacity={0.9}>
				<ScanningButton size={size} shadowWidth={shadowWidth} />
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity onPress={() => onStartScan && onStartScan()} activeOpacity={0.9}>
			<LinearGradient
				colors={[theme.primaryColorEndAlpha1, theme.primaryColorStartAlpha1]}
				style={[
					styles.bgGradient,
					{
						width: size + shadowWidth * 2,
						height: size + shadowWidth * 2,
						borderRadius: (size + shadowWidth * 2) / 2
					}
				]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}>
				<LinearGradient
					colors={[theme.primaryColorEnd, theme.primaryColorStart]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={[
						styles.bgGradient,
						styles.button,
						{
							width: size,
							height: size,
							borderRadius: size / 2
						}
					]}>
					<Text inverse bold>
						Scan
					</Text>
				</LinearGradient>
			</LinearGradient>
		</TouchableOpacity>
	);
};
