import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { WishlistItemData } from "../../types";
import ActionMenu from "./ActionsMenu";

type WishlistGridItemProps = {
    metadata: WishlistItemData;
    domainHint: string;
    handlePress: () => void;
    onDelete: () => void;
};

const WishlistGridItem = ({
    metadata,
    domainHint,
    handlePress,
    onDelete,
}: WishlistGridItemProps) => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => [
                    styles.card,
                    styles.cardFlexVertical,
                    pressed && styles.pressed,
                ]}
            >
                <View style={styles.imageContainer}>
                    {metadata?.imageUrl ? (
                        <Image
                            source={{ uri: metadata.imageUrl }}
                            style={styles.thumbnailGrid}
                            resizeMode="cover"
                        />
                    ) : (
                        <View
                            style={[
                                styles.thumbnailGrid,
                                styles.placeholderContainer,
                            ]}
                        >
                            <Text style={styles.placeholderText}>🎁</Text>
                        </View>
                    )}

                    {/* Floating Corner Absolute position Menu Dot Anchor */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.floatingMenu,
                            pressed && styles.menuButtonPressed,
                        ]}
                        onPress={() => setMenuVisible(true)}
                    >
                        <Text style={styles.floatingMenuText}>⋮</Text>
                    </Pressable>
                </View>

                <View style={styles.infoGrid}>
                    <Text style={styles.title} numberOfLines={1}>
                        {metadata?.title || "Untitled Listing"}
                    </Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {metadata?.description || "Tap to view details..."}
                    </Text>
                    <Text style={styles.domainHint} numberOfLines={1}>
                        {domainHint}
                    </Text>
                </View>
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

export default WishlistGridItem;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1E1E1E",
        borderRadius: 14,
        marginVertical: 6,
        overflow: "hidden",
        width: "48%",
        marginHorizontal: "1%",
    },
    cardFlexVertical: { flexDirection: "column" },
    pressed: { opacity: 0.95 },
    imageContainer: { position: "relative", width: "100%", height: 110 },
    thumbnailGrid: {
        width: "100%",
        height: "100%",
        backgroundColor: "#151515",
    },
    placeholderContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252525",
    },
    placeholderText: { fontSize: 22 },
    floatingMenu: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "rgba(30, 30, 30, 0.8)",
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    menuButtonPressed: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    floatingMenuText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
        top: -1,
    },
    infoGrid: {
        padding: 12,
        width: "100%",
        minHeight: 85,
        justifyContent: "space-between",
    },
    title: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
    description: {
        fontSize: 11,
        color: "#A0A0A0",
        lineHeight: 15,
        marginVertical: 4,
    },
    domainHint: {
        fontSize: 10,
        fontWeight: "600",
        color: "#008080",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
});
