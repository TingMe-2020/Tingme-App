import React from 'react';
import { View, Icon, Text } from 'native-base';
import { StyleSheet, Image } from 'react-native';

import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
	featuresList: {
		marginTop: theme.spacingUnit4
	},
	featureItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: theme.spacingUnit4
	},
	featureItemIcon: {
		width: 80,
		height: 80
	},
	featureContent: {
		flex: 1,
		marginLeft: theme.spacingUnit4
	},
	featureLabel: {
		fontWeight: 'bold',
		color: theme.textColorNote
	}
});

const FeatureItem = ({ icon, label, description }) => {
	return (
		<View style={styles.featureItem}>
			<Image source={icon} style={styles.featureItemIcon} resizeMode="contain" />
			<View style={styles.featureContent}>
				<Text style={styles.featureLabel}>{label}</Text>
				<Text note>{description}</Text>
			</View>
		</View>
	);
};

export default ({ t }) => {
	return (
		<View style={styles.featuresList}>
			<FeatureItem
				icon={require('tingme/asset/feature1icon.png')}
				label={t('feature1Label')}
				description={t('feature1Description')}
			/>
			<FeatureItem
				icon={require('tingme/asset/feature2icon.png')}
				label={t('feature2Label')}
				description={t('feature2Description')}
			/>
			<FeatureItem
				icon={require('tingme/asset/feature3icon.png')}
				label={t('feature3Label')}
				description={t('feature3Description')}
			/>
		</View>
	);
};
