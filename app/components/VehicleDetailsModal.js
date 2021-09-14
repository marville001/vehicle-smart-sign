import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { useList } from 'react-firebase-hooks/database';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import { db } from '../../firebase';
import { colors } from '../constants/theme';

const deviceHeight = Dimensions.get("window").height;

const VehicleDetailsModal = ({ visible, hideModal, selected }) => {

    const [snapshots, loading, error] = useList(db.ref("SignedVehicles"));
    const [status, setStatus] = useState(null)
    const [id, setId] = useState(null)

    const vehicles = [];
    snapshots.forEach((v) => {
        const { plate, color, make, model, driverName, driverID, type, status } = v.val();
        vehicles.push({ plate, color, make, model, driverName, driverID, type, status, id: v.key });
    });



    const handleSignout = () => {
        try {
            const vehicleRef = db.ref('SignedVehicles/' + id);
            vehicleRef.update({ 'status': 'out' })
            Alert.alert("Success", "Signed out successfully")
            hideModal()
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        const filteredVehicles = vehicles.filter((v) =>
            v.plate === (selected?.plate.toLowerCase())
        );

        setStatus(filteredVehicles[0]?.status)
        setId(filteredVehicles[0]?.id)
    }, [selected])

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
                {status != null && status === "in" &&
                    <View style={styles.detCont}>
                        <Text style={styles.det}>Status</Text>
                        <Text style={styles.det2}>{status}</Text>
                    </View>}
                {status === "in" &&
                    <TouchableOpacity
                        onPress={handleSignout}
                        style={styles.loginBtn}
                    >
                        <Text style={styles.loginText}>Sign Out Vehicle</Text>
                    </TouchableOpacity>}
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
        marginVertical: 5,
    },
    det: {
        marginRight: 20,
        fontSize: 18
    },
    det2: {
        fontSize: 18,
        color: colors.secondary,
        fontWeight: "bold",
        justifyContent: "flex-end"
    },
    loginBtn: {
        backgroundColor: colors.accent,
        width: "80%",
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    loginText: {
        color: "white",
        fontSize: 20
    },
});

export default VehicleDetailsModal
