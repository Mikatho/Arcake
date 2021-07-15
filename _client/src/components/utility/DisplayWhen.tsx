import * as React from 'react';
import { Component } from 'react';
import { Container } from 'reactstrap';

interface IProps {
    visible: boolean;
}

export class DisplayWhen extends Component<IProps, {}> {
    public render(): React.ReactElement {
        if (this.props.visible) {
            return (
                <>
                    {this.props.children}
                </>
            );
        } else return <></>;
    }
}
