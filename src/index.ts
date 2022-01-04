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
 * Weather Forecast Class returned by providers.
 */
export class WeatherForecast {
  readonly clouds: number;
  readonly rain: number;
  readonly snow: number;
  readonly temperature: number;
  readonly minimumTemperature: number;
  readonly maximumTemperature: number;
  readonly pressure: number;
  readonly humidity: number;
  readonly time: Date;
  readonly weatherIcon: string;
  readonly weatherDescription: string;

  /**
   * Creates a new forecast object. It's immutable.
   * @param clouds Clouds level; higher values means more clouds.
   * @param rain Rain level; higher values means more intensity.
   * @param snow Snow level; higher values means higher intensity.
   * @param temperature Temperature value.
   * @param minimumTemperature Minimum temperature.
   * @param maximumTemperature Maximum temperature.
   * @param pressure Pressure value.
   * @param humidity Humidity percentage.
   * @param time Time of the forecast.
   * @param weatherIcon Weather Icon String.
   * @param weatherDescription Weather Icon Description.
   */
  constructor(
    clouds: number,
    rain: number,
    snow: number,
    temperature: number,
    minimumTemperature: number,
    maximumTemperature: number,
    pressure: number,
    humidity: number,
    time: Date,
    weatherIcon: string,
    weatherDescription: string,
  ) {
    this.clouds = clouds;
    this.rain = rain;
    this.snow = snow;
    this.temperature = temperature;
    this.minimumTemperature = minimumTemperature;
    this.maximumTemperature = maximumTemperature;
    this.pressure = pressure;
    this.humidity = humidity;
    this.time = time;
    this.weatherIcon = weatherIcon;
    this.weatherDescription = weatherDescription;
  }
}

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
    console.log(dataUrl);
    return new WeatherForecast(1, 1, 1, 1, 1, 1, 1, 1, new Date(), '1', '1');
  };
}
