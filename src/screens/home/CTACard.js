import React from 'react';
import { StyleSheet } from 'react-native';

import GradientCard from 'tingme/components/GradientCard';
import { H1, View } from 'native-base';

import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
	gradientCardContent: {
		paddingLeft: theme.spacingUnit4,
		paddingRight: theme.spacingUnit4,
		paddingTop: theme.spacingUnit * 12,
		paddingBottom: theme.spacingUnit * 12,
		justifyContent: 'center',
		alignItems: 'center'
	},
	gradientCard: {
		marginTop: theme.spacingUnit2,
		marginBottom: theme.spacingUnit6
	}
});

export default ({ t }) => {
	return (
		<GradientCard style={styles.gradientCard}>
			<View style={styles.gradientCardContent}>
				<H1 bold inverse>
					{t('ctaRow1')}
				</H1>
				<H1 bold inverse>
					{t('ctaRow2')}
				</H1>
				<H1 bold inverse>
					{t('ctaRow3')}
				</H1>
			</View>
		</GradientCard>
	);
};
