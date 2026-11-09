import { NativeModule, requireNativeModule } from "expo";

export interface LinkMetadata {
    title: string;
    description: string;
    imageUrl: string;
}

// 1. Declare the type-safe module structure extending the NativeModule core class
declare class LinkPreviewModule extends NativeModule {
    fetchPreview(url: string): Promise<LinkMetadata>;
}

// 2. Load the native module via the C++ JSI runtime directly (No deprecated Proxy!)
const LinkPreviewEngine =
    requireNativeModule<LinkPreviewModule>("LinkPreviewModule");

/**
 * Safely requests link layout details from the native operating system layers.
 * Handles background threading securely.
 */
export async function fetchLinkPreview(url: string): Promise<LinkMetadata> {
    if (!url) {
        throw new Error("Cannot query an empty or invalid URL destination.");
    }
    return await LinkPreviewEngine.fetchPreview(url);
}
