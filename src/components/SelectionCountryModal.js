

import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { normalizeFontSize, perfectHeight, perfectWidth } from '../utilities/commonFunctions'
import colors from '../utilities/colors'
import Row from './layout/Row'

export default function SelectionCountryModal({ isVisible, toggleModal, data, onSelect }) {
    const [filteredCountryList, setFilteredCountryList] = useState([])
    const [dateArray, setDateArray] = useState([])
    const [paginationEndNumber, setPaginationEndNumber] = useState(10)
    const [search, setSearch] = useState(false)

    useEffect(() => {
        setFilteredCountryList(Object.values(data).slice(0, paginationEndNumber))
        setDateArray(Object.values(data))
    }, [data])

    const closeModal = () => {
        setFilteredCountryList(data)
        toggleModal()
    }
    const _next = () => {
        if (!search) {
            setPaginationEndNumber(paginationEndNumber + 10)
            setFilteredCountryList(Object.values(data).slice(0, paginationEndNumber))
        }
    }

    const _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 12 }} onPress={() => { onSelect(item), closeModal() }} >
                <Row justifyContent='flex-start'>
                    <View style={{ borderColor: colors.mainColor, borderWidth: 2, width: perfectWidth(20), height: perfectHeight(20), borderRadius: 20 }} />
                    <Text style={{ textAlignVertical: 'center', marginLeft: 16, paddingTop: 6, fontSize: normalizeFontSize(18), fontWeight: '600', textAlign: 'center', color: 'black' }}>{item}</Text>
                </Row>
            </TouchableOpacity>
        )
    }

    const filterItem = (value) => {
        let filteredArray = dateArray.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        setFilteredCountryList(filteredArray)
    }


    return (
        <Modal
            style={styles.modal}
            visible={isVisible}
            onRequestClose={closeModal}
            transparent={true}
            animationType={'fade'}
        >
            <TouchableOpacity activeOpacity={1} onPress={() => { closeModal() }} style={{ backgroundColor: 'rgba( 0, 0, 0, 0.2 )', flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <TouchableWithoutFeedback >
                    <View style={{ backgroundColor: 'white', width: '100%', height: '70%', borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'center', paddingTop: perfectHeight(8) }}>
                        <View style={{ width: perfectWidth(35), borderColor: '#E0E0E0', borderWidth: 1 }} />
                        <View style={{ width: '100%', marginBottom: 6, alignItems: 'center' }}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={{width:"50%",textAlign: 'center', textAlignVertical: 'center', color: colors.textSearchColor, fontSize: normalizeFontSize(20), fontWeight: '600' }}
                                onChangeText={(value) => {
                                    if (value.length > 0) { setSearch(true) }
                                    else setSearch(false)
                                    filterItem(value)
                                }}
                                placeholder="Search Country" />
                        </View>
                        <View style={{ width: "90%", borderColor: "#E0E0E0", borderWidth: 1 }} />
                        <FlatList style={{ width: "100%" }}
                            showsVerticalScrollIndicator={false}
                            initialNumToRender={10}
                            onEndReachedThreshold={0.7}
                            onEndReached={_next}
                            keyExtractor={item => item}
                            data={filteredCountryList}
                            renderItem={_renderItem}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal >
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
    },
})
