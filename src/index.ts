/**
 * Weather Provider.
 * Provide the abstract Weather Provider class to extends for a more specific remote provider.
 *
 * @author Tentoni Daniele <daniele.tentoni.1996@gmail.com>
 * @module weather.provider
 */

/**
 * Curated list of valid protocols to use for common use in weather provider module.
 */
export const validProtocols: Set<string> = new Set<string>(['http:', 'https:']);

/**
 * Check if the URL is valid or not.
 * For a curated list of supported protocols, see validProtocols const.
 * Any other protocol will be rejected at the moment with a TypeError.
 * @param {string | URL } urlString The url to check.
 * @returns {URL} The url checked.
 * @throws {TypeError} Submitted an url with an invalid protocol.
 */
const validateUrl = (urlString: string | URL): URL => {
  const myUrl: URL = new URL(urlString);

  if (!validProtocols.has(myUrl.protocol)) {
    throw new TypeError(`Invalid protocol ${myUrl.protocol}`);
  }

  // Here the URL is valid, return it.
  return myUrl;
};

export class WeatherProvider {
  tokenKey: string;
  tokenValue: string;
  name: string;
  url: URL;

  constructor(url: string | URL, tokenKey: string, tokenValue: string) {
    this.name = 'Weather Provider';
    this.url = validateUrl(url);
    this.tokenKey = tokenKey;
    this.tokenValue = tokenValue;
  }

  formatUrl = (resource: string) => {
    const result = new URL(resource, this.url);
    result.searchParams.set(this.tokenKey, this.tokenValue);
    return result;
  };

  makeRequest = (resource: string) => {
    const dataUrl = this.formatUrl(resource);
    return dataUrl;
  };
}
