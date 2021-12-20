import { Btn } from "../Utilities/Btn";
import './MultiSelector.css'

interface IMultiSelector {
    displayName: string
    selected: IMultiSelectorModel[],
    nonSelected: IMultiSelectorModel[],
    onChange(selected: IMultiSelectorModel[], nonSelected: IMultiSelectorModel[]): void
}

export default interface IMultiSelectorModel {
    key: number,
    value: string
}

export const MultiSelector = (props: IMultiSelector) => {
    const select = (item: IMultiSelectorModel) => {
        const selected = [...props.selected, item];
        const nonSelected = props.nonSelected.filter(e => e !== item);
        props.onChange(selected, nonSelected);
    }
    const deSelect = (item: IMultiSelectorModel) => {
        const nonSelected = [...props.nonSelected, item];
        const selected = props.selected.filter(e => e !== item);
        props.onChange(selected, nonSelected);
    }
    const selectAll = () => {
        const selected = [...props.selected, ...props.nonSelected];
        const nonSelected: IMultiSelectorModel[] = [];
        props.onChange(selected, nonSelected);
    }
    const deSelectAll = () => {
        const nonSelected = [...props.nonSelected, ...props.selected];
        const selected: IMultiSelectorModel[] = [];
        props.onChange(selected, nonSelected);
    }
    return (
        <>
            <label className="mx-2">{props.displayName}</label>
            <div className="multi-selector">
                <ul>
                    {props.nonSelected.map(item =>
                        <li key={item.key} onClick={() => select(item)}>{item.value}</li>
                    )}
                </ul>
                <div className="multi-selector-btn">
                    <Btn bgColor="btn btn-secondary mb-3" onClick={selectAll}>{">>"}</Btn>
                    <Btn bgColor="btn btn-secondary" onClick={deSelectAll}>{"<<"}</Btn>
                </div>
                <ul>
                    {props.selected.map(item =>
                        <li key={item.key} onClick={() => deSelect(item)}>{item.value}</li>
                    )}
                </ul>
            </div>
        </>

    );
}