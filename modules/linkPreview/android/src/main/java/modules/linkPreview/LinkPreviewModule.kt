package modules.linkPreview

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import kotlinx.coroutines.*
import org.jsoup.Jsoup

public class LinkPreviewModule : Module() {
  public override fun definition() = ModuleDefinition {
    Name("LinkPreviewModule")

    // Expo handles the background execution thread natively for AsyncFunction
    AsyncFunction("fetchPreview") { urlString: String ->
      try {
        val document = Jsoup.connect(urlString)
          .userAgent("Mozilla/5.0 (Linux; Android 13; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36")
          .timeout(6000)
          .get()

        val title = document.select("meta[property=og:title]").attr("content")
          .ifEmpty { document.title() }
        
        val description = document.select("meta[property=og:description]").attr("content")
          .ifEmpty { document.select("meta[name=description]").attr("content") }
          
        val imageUrl = document.select("meta[property=og:image]").attr("content")

        // Directly return the map. Expo converts this into a JS Promise automatically.
        mapOf(
          "title" to title,
          "description" to description,
          "imageUrl" to imageUrl
        )
      } catch (e: Exception) {
        // Throw an exception directly. Expo catches it and rejects the JS promise.
        throw Exception("FETCH_FAILED: ${e.localizedMessage}")
      }
    }
  }
}

