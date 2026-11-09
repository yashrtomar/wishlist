import ExpoModulesCore
import LinkPresentation

public class LinkPreviewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("LinkPreviewModule")

    AsyncFunction("fetchPreview") { (urlString: String, promise: Promise) in
      guard let url = URL(string: urlString) else {
        promise.reject("INVALID_URL", "Invalid URL string provided.")
        return
      }

      // Explicitly tell the provider to run on a background queue safely
      let provider = LPMetadataProvider()
      
      provider.startFetchingMetadata(for: url) { metadata, error in
        if let error = error {
          promise.reject("FETCH_FAILED", error.localizedDescription)
          return
        }
        
        guard let metadata = metadata else {
          promise.reject("NO_METADATA", "Could not fetch metadata.")
          return
        }

        let result: [String: Any] = [
          "title": metadata.title ?? "",
          "description": "",
          "imageUrl": metadata.url?.absoluteString ?? ""
        ]
        
        // Always pass resolution parameters securely back to Expo core
        promise.resolve(result)
      }
    }
  }
}
