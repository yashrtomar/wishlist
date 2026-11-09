import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { WishlistItemData } from "../../types";
import ActionMenu from "./ActionsMenu";

type WishlistListItemProps = {
    metadata: WishlistItemData;
    domainHint: string;
    handlePress: () => void;
    onDelete: () => void;
};

const WishlistListItem = ({
    metadata,
    domainHint,
    handlePress,
    onDelete,
}: WishlistListItemProps) => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => [
                    styles.card,
                    styles.cardFlexHorizontal,
                    pressed && styles.pressed,
                ]}
            >
                {metadata?.imageUrl ? (
                    <Image
                        source={{ uri: metadata.imageUrl }}
                        style={styles.thumbnailList}
                        resizeMode="cover"
                    />
                ) : (
                    <View
                        style={[
                            styles.thumbnailList,
                            styles.placeholderContainer,
                        ]}
                    >
                        <Text style={styles.placeholderText}>🎁</Text>
                    </View>
                )}

                <View style={styles.infoList}>
                    <Text style={styles.title} numberOfLines={1}>
                        {metadata?.title || "Untitled Listing"}
                    </Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {metadata?.description ||
                            "Tap to view item listing details..."}
                    </Text>
                    <Text style={styles.domainHint} numberOfLines={1}>
                        {domainHint}
                    </Text>
                </View>

                {/* 3-Dots Action Trigger Button */}
                <Pressable
                    style={({ pressed }) => [
                        styles.menuButton,
                        pressed && styles.menuButtonPressed,
                    ]}
                    onPress={() => setMenuVisible(true)}
                >
                    <Text style={styles.menuButtonText}>⋮</Text>
                </Pressable>
            </Pressable>

            <ActionMenu
                isVisible={menuVisible}
                onClose={() => setMenuVisible(false)}
                itemTitle={metadata?.title || "Wishlist Item"}
                onDelete={onDelete}
            />
        </>
    );
};

export default WishlistListItem;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1E1E1E",
        borderRadius: 14,
        marginVertical: 6,
        overflow: "hidden",
        width: "100%",
    },
    cardFlexHorizontal: { flexDirection: "row", alignItems: "center" },
    pressed: { opacity: 0.95 },
    thumbnailList: {
        width: 90,
        height: 90,
        backgroundColor: "#151515",
        borderRadius: 8,
        margin: 8,
    },
    placeholderContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252525",
    },
    placeholderText: { fontSize: 20 },
    infoList: { paddingVertical: 12, flex: 1, justifyContent: "center" },
    title: {
        fontSize: 14,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: "#A0A0A0",
        lineHeight: 16,
        marginBottom: 6,
    },
    domainHint: {
        fontSize: 10,
        fontWeight: "600",
        color: "#008080",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    menuButton: {
        paddingHorizontal: 16,
        height: 106,
        justifyContent: "center",
        alignItems: "center",
    },
    menuButtonPressed: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
    menuButtonText: { color: "#888888", fontSize: 20, fontWeight: "bold" },
});
