import React, {FC} from 'react';
import {IUser} from "../models/IUser";

interface UserItemProps {
    user: IUser;
    remove: (user: IUser) => void;
    update: (user: IUser) => void;
    deleteEl: any;
    select: any;
    setSelected: any;
}

const UserItem:FC<UserItemProps> = ({user, remove, update,deleteEl, select, setSelected}) => {

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(user)
    }

    const handleUpdate = (event: React.MouseEvent) => {
        const firstName = prompt('Введите имя') || "";
        const lastName = prompt('Введите фамилию') || "";
        const position = prompt('Введите позицию сотрудника') || "";
        //const companyId = prompt('Введите id компании') || 1;
        update({...user, firstName, lastName,position})
    }

    const handleClick = (event: any) => {
        const {value, checked} = event.target;
        if (checked) {
            setSelected(value)
            deleteEl(user)
        } else {
            setSelected(select.filter((e:any) => e! === value))
        }

    }

    return (
        <tr className={"company_item"}>
            <td><input type={"checkbox"} value={user.id} onChange={handleClick}/></td>
            <td>{user.id}.</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.position}</td>
            <td style={{textAlign: "center"}}>{user.companyId}</td>
            <td className={"cmpny_btns"}>
                <button className={"myBtn"} onClick={handleUpdate}>Edit</button>
                <button className={"myBtn"} onClick={handleRemove}>Delete</button>
            </td>
        </tr>
    );
};

export default UserItem;