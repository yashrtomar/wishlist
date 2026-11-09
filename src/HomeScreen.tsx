import AsyncStorage from "@react-native-async-storage/async-storage";
import { LayoutGrid, List } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fab from "./components/Fab";
import InputModal from "./components/InputModal";
import WishlistItem from "./components/wishlistItems/WishlistItem";
import { WishlistItemData } from "./types";

const STORAGE_KEY = "@user_offline_wishlist";

const HomeScreen = () => {
    // Array state converted to hold full offline objects
    const [wishlist, setWishlist] = useState<WishlistItemData[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isGridView, setIsGridView] = useState(false);

    // 1. Initial mounting cycle pulls from local device flash storage
    useEffect(() => {
        const loadOfflineData = async () => {
            try {
                const savedData = await AsyncStorage.getItem(STORAGE_KEY);
                if (savedData !== null) {
                    setWishlist(JSON.parse(savedData));
                }
            } catch (error) {
                console.error(
                    "Failed to load wishlist from flash storage:",
                    error,
                );
            }
        };
        loadOfflineData();
    }, []);

    // 2. State interceptor function ensuring all state mutations write to disk
    const handleUpdateWishlist = (
        updateFn: React.SetStateAction<WishlistItemData[]>,
    ) => {
        setWishlist((prevWishlist) => {
            const nextList =
                typeof updateFn === "function"
                    ? updateFn(prevWishlist)
                    : updateFn;
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextList)).catch(
                (err) => console.error("Failed to save wishlist package:", err),
            );
            return nextList;
        });
    };

    const handleDeleteItem = (idToDelete: string) => {
        handleUpdateWishlist((prevWishlist) =>
            prevWishlist.filter((item) => item.id !== idToDelete),
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Wishlist</Text>
                {wishlist.length > 0 && (
                    <Pressable
                        style={styles.toggleButton}
                        onPress={() => setIsGridView(!isGridView)}
                    >
                        {isGridView ? (
                            <List size={20} color="#008080" />
                        ) : (
                            <LayoutGrid size={20} color="#008080" />
                        )}
                    </Pressable>
                )}
            </View>

            <View style={styles.container}>
                {wishlist.length === 0 ? (
                    <View style={styles.emptyCenter}>
                        <Text style={styles.textWhite}>
                            Your wishlist will show up here.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        key={isGridView ? "grid" : "list"}
                        data={wishlist}
                        numColumns={isGridView ? 2 : 1}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        columnWrapperStyle={
                            isGridView ? styles.gridRow : undefined
                        }
                        renderItem={({ item }) => (
                            // Pass down the pre-loaded item object to completely strip card loading spinners
                            <WishlistItem
                                itemData={item}
                                isGrid={isGridView}
                                onDelete={handleDeleteItem}
                            />
                        )}
                    />
                )}
            </View>

            <Fab setIsModalVisible={setIsModalVisible} />

            <InputModal
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                setWishlist={handleUpdateWishlist}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#121212",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: "#1E1E1E",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    toggleButton: {
        padding: 20,
    },
    toggleText: {
        color: "#008080",
        fontSize: 12,
        fontWeight: "700",
    },
    container: {
        flex: 1,
    },
    emptyCenter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textWhite: {
        color: "#ffffff",
        fontSize: 16,
    },
    listContent: {
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
    gridRow: {
        justifyContent: "space-between",
    },
});
