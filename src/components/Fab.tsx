import { Pressable, StyleSheet, Text } from "react-native";

type FabProps = {
    setIsModalVisible: (visible: boolean) => void;
};
const Fab = ({ setIsModalVisible }: FabProps) => {
    return (
        <Pressable
            onPress={() => {
                setIsModalVisible(true);
            }}
            style={styles.fab}
        >
            <Text style={styles.onPrimary}>+</Text>
        </Pressable>
    );
};
export default Fab;
const styles = StyleSheet.create({
    fab: {
        backgroundColor: "#008080",
        borderRadius: "50%",
        height: 60,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 20,
        bottom: 20,
    },
    onPrimary: {
        color: "#ffffff",
        fontSize: 32,
        marginBottom: 4,
    },
});
