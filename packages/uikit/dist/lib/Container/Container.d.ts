/// <reference types="react" />
import * as React from 'react';
/**
 * Screen size types
 * @see {Layout.calculateWidth}
 */
export declare enum ContainerWidth {
    xx = 0,
    xs = 1,
    sm = 2,
    md = 3,
    lg = 4,
}
export interface IContainerProps {
    width: ContainerWidth;
    onChangeWidth: (width: ContainerWidth) => void;
    className?: string;
}
/**
 * Main layout for all pages. Support width tracking
 */
export declare class Container extends React.Component<IContainerProps, void> {
    _container: HTMLDivElement;
    componentDidMount: () => void;
    componentWillUnmount: () => void;
    handleResize: () => void;
    calculateWidth: () => ContainerWidth;
    render(): JSX.Element;
}
