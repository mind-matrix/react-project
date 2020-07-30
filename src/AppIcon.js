import React from 'react';
import Icon from './icon.svg';

export default function AppIcon(props) {
    return (
        <img src={Icon} width={props.width} alt="App icon" />
    );
}