import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/react-semantic-alert.css';

import SemanticToast from './semantic-toast';
import { store } from './toast';

/* eslint-disable no-useless-computed-key */
const animations = {
    ['top-right']: 'fly left',
    ['top-center']: 'fly down',
    ['top-left']: 'fly right',
    ['bottom-right']: 'fly left',
    ['bottom-center']: 'fly up',
    ['bottom-left']: 'fly right'
};

const DURATION = 0;
const CLOSE_TIME = 0;

class SemanticToastContainer extends Component {
    static propTypes = {
        position: PropTypes.oneOf([
            'top-right',
            'top-center',
            'bottom-right',
            'bottom-center',
            'bottom-left'
        ]),
        duration: PropTypes.number,
        closeTime: PropTypes.number,
        animation: PropTypes.string
    };

    static defaultProps = {
        position: 'bottom-left',
        duration: DURATION,
        closeTime: CLOSE_TIME,
        animation: null
    };

    state = {
        toasts: []
    };

    componentDidMount() {
        store.subscribe(this.updateToasts);
    }

    componentWillUnmount() {
        store.unsubscribe(this.updateToasts);
    }

    updateToasts = () => {
        this.setState({
            toasts: store.data
        });
    };

    render() {
        const { position, duration, closeTime } = this.props;
        const animation = this.props.animation || animations[position];

        return (
            <div className={`ui-alerts ${position}`}>
                {this.state.toasts.map(toast => {
                    const {
                        id,
                        type = null,
                        title = '',
                        description = '',
                        icon = null,
                        time
                    } = toast;
                    return (
                        <SemanticToast
                            key={id}
                            toastId={id}
                            type={type}
                            title={title}
                            description={description}
                            icon={icon}
                            animation={animation}
                            time={time}
                            duration={duration}
                            closeTime={closeTime}
                        />
                    );
                })}
            </div>
        );
    }
}

export default SemanticToastContainer;
