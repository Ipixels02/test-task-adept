import React, {useState} from 'react';
import './App.css';
import UserList from "./components/UserList";
import CompanyList from "./components/CompanyList";
import {SelectedComp} from "./context";

function App() {
    const [selectedValues, setSelectedValues] = useState<number[]>([])

    return (
        <div className="App">
            <div style={{display: 'flex'}}>
                <SelectedComp.Provider value={{
                    selectedValues,
                    setSelectedValues
                }}>
                    <UserList/>
                <CompanyList/>
                </SelectedComp.Provider>
            </div>
        </div>
    );
}

export default App;
