import {createContext, useContext} from "react";

// export interface ITodo {
//     id: number | null;
// }

export interface IContext {
    selectedValues: number[]
    setSelectedValues:(ar: number[]) => void
}

export const SelectedComp = createContext<IContext | null>(null);

export const useGlobalContext = () => {
    const contextValue = useContext(SelectedComp);

    if (contextValue === null) {
        throw new Error("Context should be provided");
    }

    return contextValue;
}