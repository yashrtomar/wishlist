import React, { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { fetchLinkPreview } from "../../modules/linkPreview";
import { WishlistItemData } from "../types";

type InputModalProps = {
    isModalVisible: boolean;
    setIsModalVisible: (visible: boolean) => void;
    setWishlist: (update: React.SetStateAction<WishlistItemData[]>) => void;
};

const InputModal = ({
    isModalVisible,
    setIsModalVisible,
    setWishlist,
}: InputModalProps) => {
    const [inputValue, setInputValue] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const cleanUrl = (input: string): string => {
        const match = input.match(/https?:\/\/\S+/i);
        return match ? match[0] : input;
    };

    const handleClose = () => {
        setInputValue("");
        setIsFetching(false);
        setIsModalVisible(false);
    };

    const handleSave = async () => {
        if (!inputValue.trim() || isFetching) return;

        const extractedUrl = cleanUrl(inputValue).trim();
        setIsFetching(true);

        let title = "Untitled Listing";
        let description = "Tap to view details...";
        let imageUrl = "";

        try {
            // Run web link metadata parser once prior to storage insertion
            const metadata = await fetchLinkPreview(extractedUrl);
            if (metadata) {
                title = metadata.title || title;
                description = metadata.description || description;
                imageUrl = metadata.imageUrl || imageUrl;
            }
        } catch (error) {
            console.error("Background data fetch parsing dropped:", error);
        }

        const newRecord: WishlistItemData = {
            id: Date.now().toString(),
            url: extractedUrl,
            title,
            description,
            imageUrl,
        };

        setWishlist((prevWishlist) => [...prevWishlist, newRecord]);

        setIsFetching(false);
        setInputValue("");
        setIsModalVisible(false);
    };

    return (
        <Modal animationType="fade" visible={isModalVisible} transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.title}>Add Item Link</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Paste the URL here..."
                            placeholderTextColor="#666666"
                            value={inputValue}
                            onChangeText={setInputValue}
                            editable={!isFetching}
                            autoFocus={true}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={handleClose}
                            disabled={isFetching}
                            style={({ pressed }) => [
                                styles.button,
                                styles.cancelButton,
                                pressed && styles.buttonPressed,
                            ]}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            onPress={handleSave}
                            disabled={isFetching}
                            style={({ pressed }) => [
                                styles.button,
                                styles.saveButton,
                                pressed && styles.buttonPressed,
                                isFetching && styles.buttonDisabled,
                            ]}
                        >
                            {isFetching ? (
                                <ActivityIndicator
                                    size="small"
                                    color="#FFFFFF"
                                />
                            ) : (
                                <Text style={styles.saveButtonText}>Save</Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default InputModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    content: {
        width: "85%",
        borderRadius: 24,
        backgroundColor: "#1E1E1E",
        padding: 24,
        borderWidth: 1,
        borderColor: "#2D2D2D",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 16,
        letterSpacing: 0.3,
    },
    inputContainer: {
        marginBottom: 24,
    },
    textInput: {
        width: "100%",
        backgroundColor: "#2A2A2A",
        color: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#3D3D3D",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        minWidth: 90,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonDisabled: {
        backgroundColor: "#004D4D",
    },
    cancelButton: {
        backgroundColor: "transparent",
    },
    cancelButtonText: {
        color: "#A0A0A0",
        fontSize: 15,
        fontWeight: "600",
    },
    saveButton: {
        backgroundColor: "#008080",
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },
});
