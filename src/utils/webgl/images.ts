/** Image helper functions */

/** Image source object */
export interface ImageSource {
  media?: string, // Image media query
  srcSet: string, // Image src string
  type: string, // Image type
}

/** Webp image features */
export enum WebpFeature {
  LOSSY = "lossy",
  LOSSLESS = "lossless",
  ALPHA = "alpha",
  ANIMATION = "animation"
}

/** 
 * Checks whether a webp feature is supported. 
 * Adapted from: https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_for_webp
*/
export function check_webp_feature(
  feature: WebpFeature,
): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    var kTestImages = {
      lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
      lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
      alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
      animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };

    var img = document.createElement("img")

    img.onload = function() {
      var result = (img.width > 0) && (img.height > 0);
      resolve(result)
    };

    img.onerror = function() {
      reject()
    };

    img.src = "data:image/webp;base64," + kTestImages[feature];
  })
}

/** Get the appropriate image source provided a source string and an optional image source array */
export async function get_image_src(src: string, src_set?: ImageSource[]): Promise<string> {
  if (src_set === undefined || src_set.length <= 0) {
    return src
  }

  // Check if browser supports relevant webp features
  let supports_webp = await (async (): Promise<Boolean> => {
    try {
      let supports_lossless = await check_webp_feature(WebpFeature.LOSSLESS)
      let supports_lossy = await check_webp_feature(WebpFeature.LOSSY)
      let supports_alpha = await check_webp_feature(WebpFeature.ALPHA)

      return (supports_lossless && supports_lossy && supports_alpha)
    } catch (_) {
      return false
    }
  })()

  // Split png and webp sources into seperate arrays
  let png_set = src_set.filter(({ type }) => type === "image/png")
  let webp_set = src_set.filter(({ type }) => type === "image/webp")

  // Tests if an ImageSource matches a media query
  let match_src = (img_src: ImageSource): Boolean => {
    if (img_src.media === undefined) return true
    return window.matchMedia(img_src.media).matches
  }


  if ((!supports_webp || webp_set.length <= 0) && png_set.length > 0) {
    // Use png srcSet
    let result = png_set.find(match_src)
    if (result !== undefined) return result.srcSet

  } else if (supports_webp && webp_set.length > 0) {
    // Use webp srcSet
    let result = webp_set.find(match_src)
    if (result !== undefined) return result.srcSet
  }

  // Use src if no image sources match
  return src
}
