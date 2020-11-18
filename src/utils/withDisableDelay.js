import React from 'react';

const withDisableDelay = (
  delay = 5000,
  mapDisabledToProps = disabled => ({ disabled })
) => Component =>
  class extends React.Component {
    state = {
      disabled: false
    };

    render() {
      const { disabled } = this.state;
      const { onPress, ...restProps } = this.props;
      return (
        <Component
          {...mapDisabledToProps(disabled)}
          {...restProps}
          onPress={() => {
            this.setState({ disabled: true });
            setTimeout(() => this.setState({ disabled: false }), delay);
            !disabled && onPress && onPress();
          }}
        />
      );
    }
  };

export default withDisableDelay;
