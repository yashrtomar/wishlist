import { Linking } from "react-native";
import { WishlistItemData } from "../../types";
import WishlistListItem from "./WishlistListItem";
import WishlistGridItem from "./wishlistGridItem";

type WishlistItemProps = {
    itemData: WishlistItemData;
    isGrid: boolean;
    onDelete: (id: string) => void;
};

const WishlistItem = ({ itemData, isGrid, onDelete }: WishlistItemProps) => {
    const handlePress = () => {
        Linking.openURL(itemData.url).catch((err) =>
            console.error("Couldn't open URL", err),
        );
    };

    const handleDelete = () => {
        onDelete(itemData.id);
    };

    const domainHint = itemData.url
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
        .split("/")[0];

    return isGrid ? (
        <WishlistGridItem
            metadata={itemData}
            domainHint={domainHint}
            handlePress={handlePress}
            onDelete={handleDelete}
        />
    ) : (
        <WishlistListItem
            metadata={itemData}
            domainHint={domainHint}
            handlePress={handlePress}
            onDelete={handleDelete}
        />
    );
};

export default WishlistItem;
