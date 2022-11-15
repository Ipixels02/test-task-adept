import React, {useState} from 'react';
import {companiesAPI} from "../../services/CompanyServies";
import {ICompany} from "../../models/ICompany";

const CompanyForm = () => {
    const [company, setCompany] = useState({title:'', address: ''})
    const [createCompany, {}] = companiesAPI.useCreateCompanyMutation()

    const handleCreate = async () => {
        await createCompany(company as ICompany)
    }

    return (
        <form>
            <input
                className={"myInput"}
                value={company.title}
                onChange={(e:any) => setCompany({...company,title: e.target.value})}
                type={"text"}
                placeholder={"Название компании"}/>
            <input
                className={"myInput"}
                value={company.address}
                onChange={(e:any) => setCompany({...company,address: e.target.value})}
                type={"text"}
                placeholder={"Адресс компании"}/>
            <button className={"myBtn"} onClick={handleCreate} >Создать компанию</button>
        </form>
    );
};

export default CompanyForm;