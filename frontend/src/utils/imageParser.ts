/**
 * Converts Cloudinary URLs in HTML content to proper img tags
 * @param htmlContent - The HTML string to process
 * @returns HTML string with Cloudinary URLs converted to img tags
 */
export const convertCloudinaryUrlsToImages = (htmlContent: string): string => {
  // Regex to match Cloudinary URLs
  const cloudinaryRegex =
    /https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9]+\/image\/upload\/[^"\s<>]+/g

  return htmlContent.replace(cloudinaryRegex, match => {
    return `<img src="${match}" alt="Image" style="max-width: 100%; height: auto; margin: 1rem 0;" />`
  })
}

/**
 * Alternative version that also handles URLs that might be wrapped in other elements
 */
export const convertCloudinaryUrlsToImagesAdvanced = (
  htmlContent: string
): string => {
  // More comprehensive regex that handles various contexts
  const cloudinaryRegex =
    /(https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9]+\/image\/upload\/[^"\s<>]+)/g

  return htmlContent.replace(cloudinaryRegex, (match, url) => {
    // Check if the URL is already inside an img tag
    const beforeUrl = htmlContent.substring(0, htmlContent.indexOf(match))
    const afterUrl = htmlContent.substring(
      htmlContent.indexOf(match) + match.length
    )

    // Simple check to avoid double-wrapping images
    if (beforeUrl.includes('<img') && afterUrl.startsWith('"')) {
      return match // Return original if already in img tag
    }

    return `<img src="${url}" alt="Image" style="max-width: 100%; height: auto; margin: 1rem 0;" />`
  })
}
