/// <reference types="react" />
import * as React from 'react';
export declare class ClickOutside extends React.Component<{
    except?: HTMLElement;
    onClickOutside: (e) => void;
}, void> {
    wrapper: HTMLElement;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handle: (e: any) => void;
    render(): JSX.Element;
}
