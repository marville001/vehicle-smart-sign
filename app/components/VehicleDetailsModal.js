import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import { colors } from '../constants/theme';

const deviceHeight = Dimensions.get("window").height;

const VehicleDetailsModal = ({ visible, hideModal, selected }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                dismissable={false}
                contentContainerStyle={styles.modal}
            >
                <MaterialIcons
                    onPress={hideModal}
                    name="cancel"
                    size={24}
                    color="black"
                />
                <View style={[styles.detCont, { marginTop: 15 }]}>
                    <Text style={styles.det}>Plate</Text>
                    <Text style={styles.det2}>{selected.plate}</Text>
                </View>
                <View style={styles.detCont}>
                    <Text style={styles.det}>Model</Text>
                    <Text style={styles.det2}>{selected.model}</Text>
                </View>
                <View style={styles.detCont}>
                    <Text style={styles.det}>Make</Text>
                    <Text style={styles.det2}>{selected.make}</Text>
                </View>
                <View style={styles.detCont}>
                    <Text style={styles.det}>Color</Text>
                    <Text style={styles.det2}>{selected.color}</Text>
                </View>
                <View style={styles.detCont}>
                    <Text style={styles.det}>Driver Name</Text>
                    <Text style={styles.det2}>{selected.driverName}</Text>
                </View>
                <View style={styles.detCont}>
                    <Text style={styles.det}>Driver ID</Text>
                    <Text style={styles.det2}>{selected.driverID}</Text>
                </View>
                <View style={styles.detCont}>
                    <Text style={styles.det}>Type</Text>
                    <Text style={styles.det2}>{selected.type}</Text>
                </View>
            </Modal>
        </Portal>
    )
}


const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#fff",
        minHeight: deviceHeight / 1.5,
        margin: 20,
        padding: 10,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    detCont: {
        flexDirection: "row",
        marginVertical: 5
    },
    det: {
        marginRight: 20,
        fontSize: 18
    }, 
    det2: {
        fontSize: 18,
        color: colors.secondary,
        fontWeight: "bold"
    }
});

export default VehicleDetailsModal
