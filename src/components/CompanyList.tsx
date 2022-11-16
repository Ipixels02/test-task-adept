import React, {useContext, useEffect, useMemo, useState} from 'react';
import {companiesAPI} from "../services/CompanyServies";
import {ICompany} from "../models/ICompany";
import CompanyItem from "./CompanyItem";
import MyModal from "./UI/MyModal/MyModal";
import CompanyForm from "./UI/CompanyForm";
import {useGlobalContext} from "../context";


const CompanyList = () => {
    const {selectedValues, setSelectedValues} = useGlobalContext();
    const [modal, setModal] = useState(false);
    const pages = 5;
    const [page, setPage] = useState(1);
    const [isChecked, setIsChecked] = useState<any>([])
    const [isCheckedObj, setIsCheckedObj] = useState<any>([])
    //const [editCompanyId, setEditCompanyId] = useState(null);
    const {data: companies, error, isLoading, isFetching} = companiesAPI.useFetchAllCompaniesQuery(page)
    const [updateCompany, {}] = companiesAPI.useUpdateCompanyMutation()
    const [deleteCompany, {}] = companiesAPI.useDeleteCompanyMutation()

    const handleRemove = (company: ICompany) => {
        deleteCompany(company)
    }

    const handleUpdate = (company: ICompany) => {
        updateCompany(company)
    }

    const deleteSelected = (selectedCompanies: any) => {
        setIsCheckedObj([...isCheckedObj, selectedCompanies])
    }

    const deleteAlL = () => {
        isCheckedObj.map((i: any) =>
            deleteCompany(i)
        )
    }

    useEffect(()=> {
        setSelectedValues(isChecked)
    },[isChecked])


    const selectedItems = (items: any) => {
        setIsChecked([...isChecked, items]);
    }


    return (
        <div className="company__list">
            <button className={"myBtn"} style={{marginRight: 10}} onClick={() => setModal(true)}>Добавить новую
                компанию
            </button>
            <button className={"delBtn"} onClick={deleteAlL}>Удалить выбранное</button>
            <MyModal visible={modal} setVisible={setModal}>
                <CompanyForm/>
            </MyModal>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка при загрузке</h1>}
            <table className="company">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Название компании</th>
                    <th>Адресс</th>
                    <th>Кол-во сотрудников</th>
                </tr>
                </thead>
                <tbody>
                {companies && companies.map(company =>
                    <CompanyItem
                        key={company.id}
                        company={company}
                        remove={handleRemove}
                        update={handleUpdate}
                        deleteEl={deleteSelected}
                        select={isChecked}
                        setSelected={selectedItems}
                    />
                )}
                </tbody>
            </table>
            <div style={{display: "flex"}}>
                <button
                    style={{marginRight: 10, height: 30, width: 60}}
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                >
                    prev
                </button>
                <button
                    style={{height: 30, width: 60}}
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === pages}
                >
                    next
                </button>
                <div>{`${page} / ${pages}`}</div>
            </div>
        </div>
    );
};

export default CompanyList;