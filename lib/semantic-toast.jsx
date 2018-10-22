import React from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';

import withTransition from './with-transition';

const icons = type => {
    switch (type) {
        case 'info':
            return 'announcement';
        case 'success':
            return 'checkmark';
        case 'error':
            return 'remove';
        case 'warning':
            return 'warning circle';
        default:
            return false;
    }
};

function SemanticToast(props) {
    const { type, title, description } = props;
    const icon = props.icon || icons(props.type);

    return (
        <Message
            info={type === 'info'}
            success={type === 'success'}
            error={type === 'error'}
            warning={type === 'warning'}
            icon={typeof icon === 'string'}
        >
            {icon && <Icon name={icon} />}
            <Message.Content>
                {title && <Message.Header>{title}</Message.Header>}
                {description}
            </Message.Content>
        </Message>
    );
}

SemanticToast.propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'error', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired
};

export default withTransition(SemanticToast);
