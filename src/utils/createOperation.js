import { Alert } from 'react-native';
import i18n from 'tingme/i18n';

export default ({ actions = {}, process = () => {}, ...options }) => payload => async (
  dispatch,
  getState,
  objDeps
) => {
  const execute = async () => {
    const { startAction, successAction, failAction } = actions;

    startAction && dispatch(startAction(payload));
    try {
      const result = await process({ payload, dispatch, getState });
      successAction && dispatch(successAction({ result, params: payload }));

      let onSuccess;
      if (options && options.onSuccess) {
        onSuccess = options.onSuccess;
      }
      onSuccess && onSuccess({ dispatch, getState, params: payload, result, ...objDeps });

      return result;
    } catch (error) {
      console.log(error);

      let onError;
      if (options && options.onError) {
        onError = options.onError;
      }
      onError && onError();

      failAction && dispatch(failAction(error));
    }
  };

  if (options.requireConfirm) {
    Alert.alert(
      options.confirmTitle || i18n.t('common:cofirmDialogTitle'),
      options.confirmMessage || i18n.t('common:confirmDialogMessage'),
      [
        { text: i18n.t('common:cancel'), onPress: () => {}, style: 'cancel' },
        { text: i18n.t('common:ok'), onPress: () => execute() }
      ]
    );
  } else {
    return execute();
  }
};
