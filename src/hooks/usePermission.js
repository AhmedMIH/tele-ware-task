import { useEffect, useState } from "react";
import { requestNotifications } from 'react-native-permissions';

function usePermission() {
    const [permissionValue, setPermissionValue] = useState()

    useEffect(() => {
        requestNotifications().then(result =>{
            setPermissionValue(result.status)
            console.log(result.status)
        })
    }, [])

    return permissionValue
}

export default usePermission