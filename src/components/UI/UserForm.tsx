import React, {useState} from 'react';
import {IUser} from "../../models/IUser";
import {usersAPI} from "../../services/UserServies";

const UserForm = () => {
    const [user, setUser] = useState({firstName:'', lastName: '', position: '', companyId: 1})
    const [createUser, {}] = usersAPI.useCreateUserMutation()

    const handleCreate = async () => {
        await createUser(user as IUser)
    }
    return (
        <form>
            <input
                className={"myInput"}
                value={user.firstName}
                onChange={(e:any) => setUser({...user,firstName: e.target.value})}
                type={"text"}
                placeholder={"Имя"}/>
            <input
                className={"myInput"}
                value={user.lastName}
                onChange={(e:any) => setUser({...user,lastName: e.target.value})}
                type={"text"}
                placeholder={"Фамилия"}/>
            <input
                className={"myInput"}
                value={user.position}
                onChange={(e:any) => setUser({...user,position: e.target.value})}
                type={"text"}
                placeholder={"Должность"}/>
            <input
                className={"myInput"}
                value={user.companyId}
                onChange={(e:any) => setUser({...user,companyId: e.target.value})}
                type={"text"}
                placeholder={"Id компании"}/>
            <button className={"myBtn"} onClick={handleCreate} >Создать сотрудника</button>
        </form>
    );
};

export default UserForm;