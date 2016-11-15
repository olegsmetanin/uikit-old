/// <reference types="react" />
import * as React from 'react';
import { ILookup } from './ILookup';
export interface ILookupProps {
    value: ILookup;
    onChange: (value: ILookup) => void;
    isLoading: boolean;
    count: number;
    data: ILookup[];
    onSearch: (filter: any, page?: number) => void;
}
export interface ILookupState {
    text: string;
    searchOpened: boolean;
    page: number;
}
export declare class Lookup extends React.Component<ILookupProps, ILookupState> {
    constructor(props: any, context: any);
    toggleSearch: () => void;
    onChangeText: (e: any) => void;
    onMore: () => void;
    onChange: (value: ILookup) => void;
    render(): JSX.Element;
}
export default Lookup;
