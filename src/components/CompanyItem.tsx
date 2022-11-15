import React, {FC, useEffect, useState} from 'react';
import {ICompany} from "../models/ICompany";
import MyModal from "./UI/MyModal/MyModal";
import CompanyForm from "./UI/CompanyForm";
import {usersAPI} from "../services/UserServies";
import {companiesAPI} from "../services/CompanyServies";

interface CompanyItemProps {
    company: ICompany;
    remove: (company: ICompany) => void;
    update: (company: ICompany) => void;
    deleteEl: any;
    select: any;
    setSelected: any;
}

const CompanyItem: FC<CompanyItemProps> = ({company, remove, update, deleteEl, select, setSelected}) => {
    const {data: users} = usersAPI.useFetchAllUsersQuery(50)
    const [count, setCount] = useState(0);

    useEffect(()=> {
        setCount(0);
        (users && users.map(user => {
            if (user.companyId === company.id) {
                setCount((count) => count + 1);
            }
        }))
    },[count])


    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(company)
    }

    const handleUpdate = (event: React.MouseEvent) => {
        const title = prompt('Введите название компании') || "";
        const address = prompt('Введите адресс компании') || "";
        update({...company, title, address})
    }

    const handleClick = (event: any) => {
        const {value, checked} = event.target;
        if (checked) {
            setSelected(value)
            deleteEl(company)
        } else {
            setSelected(select.filter((e:any) => e! === value))
        }
    }



    return (
        <tr className={"company_item"}>
            <td><input type={"checkbox"} value={company.id} onChange={handleClick}/></td>
            <td>{company.id}.</td>
            <td>{company.title}</td>
            <td>{company.address}</td>
            <td style={{textAlign: "center"}}>
                {count}
            </td>
            <td className={"cmpny_btns"}>
                <button className={"myBtn"} onClick={handleUpdate}>Edit</button>
                <button className={"myBtn"} onClick={handleRemove}>Delete</button>
            </td>
        </tr>
    );
};

export default CompanyItem;