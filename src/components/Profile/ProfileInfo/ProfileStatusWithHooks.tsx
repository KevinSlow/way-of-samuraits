import React, {ChangeEvent, useEffect, useState} from "react";


type ProfileStatusWithHooksType = {
    status: string,
    updateStatus: (status: string) => void
}


const ProfileStatusWithHooks = (props: ProfileStatusWithHooksType) => {

    const [editMode,setEditMode] = useState(false)
    const [status,setStatus] = useState(props.status)

    useEffect(() => {
      setStatus(props.status);
    },[props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
        props.updateStatus(status)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode} >{props.status|| "No Status"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange}
                       autoFocus={true}
                       onBlur={deactivateEditMode}
                       value={status}/>
            </div>
            }
        </div>
    );

}

export default ProfileStatusWithHooks;