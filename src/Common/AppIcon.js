import React from 'react';
import Icon from '../Assets/icon.svg';

export default function AppIcon(props) {
    return (
        <img src={Icon} width={props.width} alt="App icon" />
    );
}