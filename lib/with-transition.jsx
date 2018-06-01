import React from 'react';
import { Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// import 'semantic-ui-css/components/transition.min.css';

const DURATION = 0;
const CLOSE_TIME = 0;

export default function withTransitions(Component) {
    class SemanticTransition extends React.Component {
        static propTypes = {
            toastId: PropTypes.number.isRequired,
            animation: PropTypes.string.isRequired,
            duration: PropTypes.number,
            closeTime: PropTypes.number
        };

        static defaultProps = {
            duration: DURATION,
            closeTime: CLOSE_TIME
        };

        state = {
            visible: false,
            duration: this.props.duration,
            closeTime: this.props.closeTime
        };

        componentDidMount() {
            // schedule auto closing of toast
            if (this.props.closeTime && this.props.closeTime > 0) {
                this.timerId = setTimeout(this.onClose, this.props.closeTime);
            }

            // start animation as soon as toast is mounted in the dom
            this.setState({ visible: true });
        }

        onClose = () => {
            // trigger new animation when toast is dismissed
            this.setState(
                {
                    visible: !this.state.visible,
                    animation: this.props.animation,
                    duration: this.state.duration
                },
                () => {
                    setTimeout(() => {
                        if (this.timerId) {
                            clearTimeout(this.timerId);
                        }
                    }, this.state.closeTime);
                }
            );
        };

        render() {
            const { duration, visible, animation } = this.state;
            const styles = {
                marginBottom: '1em'
            };

            return (
                <Transition animation={animation} duration={duration} visible={visible}>
                    <div style={styles} role="presentation">
                        <Component {...this.props} />
                    </div>
                </Transition>
            );
        }
    }

    return SemanticTransition;
}
