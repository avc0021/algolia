/** Default value for events channel between autocomplete and instantsearch */
export const QUERY_UPDATE_EVT = 'QUERY_UPDATE_EVT';

/**
 * Gets query paramters from URL
 * @returns Returns query from the url
 */
export function getQueryParam(param = 'q') {
  return new URL(window.location).searchParams.get(param);
}

/**
 * Prints a friendly dollar cents quantity.
 * @param {number} quantity - The quantity to be printed.
 */
// export function printFriendlyDollarCents(quantity) {
//   return quantity.toFixed(2);
// }

/**
 * Finds a collection item from an array of collections based on the sourceId.
 *
 * @param {Array} collections - The array of collections.
 * @param {string} sourceId - The sourceId to search for.
 * @returns {Object|undefined} The found collection item, or undefined if not found.
 */
export function getCollection(collections, sourceId) {
  if (collections.length) {
    return collections.find(collectionItem => {
      return collectionItem.source.sourceId === sourceId
    });
  }
  return null;
}

/**
 * Updates the value of a query param in the URL
 */
export function updateUrlParameter(key, value) {
  // Get the current URL search params
  let searchParams = new URLSearchParams(window.location.search);

  // Update or add the parameter
  searchParams.set(key, value);

  // Build the new URL with the updated search params
  let newUrl = window.location.origin + window.location.pathname + '?' + searchParams.toString();

  // Replace the current URL with the new URL
  window.history.replaceState({ path: newUrl }, '', newUrl);
}