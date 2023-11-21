import { Component } from 'react';
import styles from './ErrorButton.module.scss';

interface ErrorButtonProps {}
interface ErrorButtonState {
  hasError: boolean;
}

class ErrorButton extends Component<ErrorButtonProps, ErrorButtonState> {
  constructor(props: ErrorButtonProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  handleErrorButtonClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('You clicked on the throw error button!');
    }

    return (
      <button className={styles.button} onClick={this.handleErrorButtonClick}>
        Throw an error
      </button>
    );
  }
}

export default ErrorButton;
