import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import Geocoder from "react-native-geocoding";

function useLocation() {

    const [location, setLocation] = useState()
    const [loading, setLoading] = useState(true)
    let latitude, longitude
    useEffect(() => {
        setLoading(true)
        Geolocation.getCurrentPosition(
            position => {
                latitude = position.coords.latitude,
                    longitude = position.coords.longitude
                Geocoder.from(latitude, longitude).then(json => {
                    var addressComponent = json.results[0].address_components;
                    setLocation(getCountry(addressComponent))
                    setLoading(false)
                })
                    .catch(error => {
                        console.warn(error)
                        setLoading(false)
                    }
                    );
            },
            error => {
                setLoading(false)
                , Alert.alert(error.message)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

    }, [])

    return {location,loading}
}

function getCountry(addrComponents) {
    for (var i = 0; i < addrComponents.length; i++) {
        if (addrComponents[i].types[0] == "country") {
            return addrComponents[i].long_name;
        }
        if (addrComponents[i].types.length == 2) {
            if (addrComponents[i].types[0] == "political") {
                return addrComponents[i].short_name;
            }
        }
    }
    return false;
}
export default useLocation