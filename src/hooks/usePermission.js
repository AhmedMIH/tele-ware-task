import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import { API_KEY } from '@env'
import Geocoder from "react-native-geocoding";
import { check, requestNotifications, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from "react-native";

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