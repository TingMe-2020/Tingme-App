import React, { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { H3, Text, Button, View, Icon, Card, CardItem, Body } from 'native-base';

import GradientCard from 'tingme/components/GradientCard';
import CircularButton from 'tingme/components/CircularButton';

import theme from 'tingme/native-base-theme/variables/commonColor';

const statusText = {
	SENT: 'tingSuccess',
	RECEIVED: 'tingReceived',
	ACCEPTED: 'tingAccepted',
	BLOCKED: 'userBlocked'
};

const styles = StyleSheet.create({
	buttonsWrapper: {
		flexDirection: 'row',
		marginTop: 10
	},
	icon: {
		fontSize: 40,
		color: 'white'
	}
});

export default ({
	t,
	requestStatus,
	style,
	isWaiting,
	targetId,
	onCancelRequest,
	onAcceptRequest,
	onDeclineRequest,
	onUnblockUser
}) => {
	if (!requestStatus || requestStatus === 'NONE') {
		return null;
	}
	return (
		<Card style={style}>
			<Body style={{ marginTop: 20, marginBottom: 20 }}>
				<Text>{t(`common:${statusText[requestStatus]}`)}</Text>
				<View style={styles.buttonsWrapper}>
					{requestStatus === 'SENT' && (
						<Button
							light
							onPress={() => onCancelRequest(targetId)}
							disabled={isWaiting}
							style={{
								width: 120,
								justifyContent: 'center',
								borderRadius: 40
							}}>
							<Text style={{ color: theme.brandPrimary }}>{t('common:cancel')}</Text>
						</Button>
					)}
					{requestStatus === 'RECEIVED' && (
						<Fragment>
							<Button
								light
								onPress={() => onAcceptRequest(targetId)}
								disabled={isWaiting}
								style={{
									backgroundColor: theme.brandPrimary,
									width: 120,
									justifyContent: 'center',
									borderRadius: 40,
									marginRight: 10
								}}>
								<Text inverse>{t('common:accept')}</Text>
							</Button>
							<Button
								light
								onPress={() => onDeclineRequest(targetId)}
								disabled={isWaiting}
								style={{ width: 120, justifyContent: 'center', borderRadius: 40 }}>
								<Text style={{ color: theme.brandPrimary }}>{t('common:decline')}</Text>
							</Button>
						</Fragment>
					)}
					{requestStatus === 'BLOCKED' && (
						<Button
							light
							style={{
								width: 120,
								justifyContent: 'center',
								borderRadius: 40
							}}
							onPress={() => onUnblockUser(targetId)}
							disabled={isWaiting}>
							<Text style={{ color: theme.brandPrimary }}>{t('common:unblock')}</Text>
						</Button>
					)}
				</View>
			</Body>
		</Card>
	);
};
