import { Trash2, X } from "lucide-react-native";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ActionMenuProps = {
    isVisible: boolean;
    onClose: () => void;
    itemTitle: string;
    onDelete: () => void;
};

const ActionMenu = ({
    isVisible,
    onClose,
    itemTitle,
    onDelete,
}: ActionMenuProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            {/* Clickable backdrop overlay to close the modal */}
            <Pressable style={styles.overlay} onPress={onClose}>
                {/* Prevent clicks inside the sheet from closing it */}
                <View
                    style={styles.sheetContainer}
                    onStartShouldSetResponder={() => true}
                >
                    {/* Visual drag handle indicator bar */}
                    <View style={styles.dragHandle} />

                    <View style={styles.header}>
                        <Text style={styles.itemTitle} numberOfLines={1}>
                            {itemTitle}
                        </Text>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <X size={18} color="#666666" />
                        </Pressable>
                    </View>
                    <View style={styles.divider}></View>

                    {/* Future option slots */}
                    {/* <Pressable style={styles.menuItem} onPress={onClose}>
                        <CheckCircle
                            size={20}
                            color="#008080"
                            style={styles.icon}
                        />
                        <Text style={styles.menuItemText}>
                            Mark as Purchased
                        </Text>
                    </Pressable> */}

                    {/* <Pressable style={styles.menuItem} onPress={onClose}>
                        <Share2 size={20} color="#A0A0A0" style={styles.icon} />
                        <Text style={styles.menuItemText}>Share Item Link</Text>
                    </Pressable> */}

                    {/* Critical Deletion Row */}
                    <Pressable
                        style={[styles.menuItem, styles.deleteItem]}
                        onPress={() => {
                            onDelete();
                            onClose();
                        }}
                    >
                        <Trash2 size={20} color="#FF6B6B" style={styles.icon} />
                        <Text style={[styles.menuItemText, styles.deleteText]}>
                            Delete Item
                        </Text>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};

export default ActionMenu;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark tinted background
        justifyContent: "flex-end",
    },
    sheetContainer: {
        backgroundColor: "#1E1E1E",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: "#2D2D2D",
    },
    dragHandle: {
        width: 36,
        height: 4,
        backgroundColor: "#333333",
        borderRadius: 2,
        alignSelf: "center",
        marginTop: 12,
        marginBottom: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#FFFFFF",
        flex: 1,
        marginRight: 12,
    },
    closeButton: {
        padding: 4,
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: "#2D2D2D",
    },
    menuItem: {
        flexDirection: "row", // Added row grouping for horizontal icon spacing balance
        alignItems: "center",
        padding: 20,
        borderRadius: 8,
    },
    icon: {
        marginRight: 12, // Spaces out the vector line assets from adjacent textual headers
    },
    menuItemText: {
        color: "#E0E0E0",
        fontSize: 15,
        fontWeight: "500",
    },
    deleteItem: {
        // marginTop: 8,
        // borderTopWidth: 1,
        // borderColor: "#2D2D2D",
        paddingTop: 16,
    },
    deleteText: {
        color: "#FF6B6B",
        fontWeight: "600",
    },
});
