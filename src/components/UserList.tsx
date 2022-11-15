import React, {useContext, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchUsers} from "../store/reducers/ActionCreators";
import {usersAPI} from "../services/UserServies";
import MyModal from "./UI/MyModal/MyModal";
import CompanyForm from "./UI/CompanyForm";
import {IUser} from "../models/IUser";
import UserItem from "./UserItem";
import UserForm from "./UI/UserForm";
import {useGlobalContext} from "../context";

const UserList = () => {
    const {selectedValues} = useGlobalContext();
    const [limit, setLimit] = useState(50);
    const [modal, setModal] = useState(false);
    const [isCheckedUser, setIsCheckedUser] = useState<any>([])
    const [isCheckedObj, setIsCheckedObj] = useState<any>([])
    //const {users, isLoading, error} = useAppSelector(state => state.userReducer)
    const {data: users, error, isLoading, refetch} = usersAPI.useFetchAllUsersQuery(limit)
    const [updateUser, {}] = usersAPI.useUpdateUserMutation()
    const [deleteUser, {}] = usersAPI.useDeleteUserMutation()

    const handleRemove = (user: IUser) => {
        deleteUser(user)
    }

    const handleUpdate = (user: IUser) => {
        updateUser(user)
    }

    const deleteSelected = (selectedCompanies: any) => {
        setIsCheckedObj([...isCheckedObj, selectedCompanies])
    }

    const deleteAlL = () => {
        isCheckedObj.map((i: any) =>
            deleteUser(i)
        )
    }

    const selectedItems = (items: any) => {
        setIsCheckedUser([...isCheckedUser, items]);
    }

    return (
        <div className="user__list">
            <button className={"myBtn"} style={{marginRight: 10}} onClick={() => setModal(true)}>Добавить сотрудника</button>
            <button className={"delBtn"} onClick={deleteAlL}>Удалить выбранное</button>
            <MyModal visible={modal} setVisible={setModal}>
                <UserForm/>
            </MyModal>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка при загрузке</h1>}
            <table className="company">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Должность</th>
                    <th>Id Компании</th>
                </tr>
                </thead>

                    <tbody>
                    {users && users.map(user => {
                        return selectedValues.map(id => {
                            if (Number(id) === user.companyId) {
                                return <UserItem
                                    key={user.id}
                                    remove={handleRemove}
                                    update={handleUpdate}
                                    user={user}
                                    deleteEl={deleteSelected}
                                    select={isCheckedUser}
                                    setSelected={selectedItems}
                                />
                            } else {
                                <td>Пользователи не найдены</td>
                            }
                            })
                    })}
                    </tbody>

            </table>
        </div>
    );
};

export default UserList;