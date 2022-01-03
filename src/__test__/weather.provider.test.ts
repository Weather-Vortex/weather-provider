import { validProtocols, WeatherProvider } from '../index';

const rightCreatedProviderName = 'Weather Provider';
const exampleHost = 'example.com';
const exampleTokenKey = 'tok';
const exampleTokenValue = 'val';

/**
 * Check if you have installed a specific version of node.
 * @param desiredVersion {string} given desired node version. You can use for example '14'. Doesn't support minor or patch at the moment.
 * @returns {boolean} true if given node version is supported, false otherwise.
 */
const runOnSpecificNodeVersion: (desiredVersion: string) => boolean = (
  desiredVersion,
) => {
  const nodeVersion = process.versions.node.match(/^(\d+)\.\d+\.\d+$/);
  return nodeVersion?.length == 2 && nodeVersion[1] == desiredVersion;
};

const providerConstructionByProtocol = (protocol: string) => {
  const url = protocol.concat('//', exampleHost);
  return () => new WeatherProvider(url, exampleTokenKey, exampleTokenValue);
};

describe('Test creating providers', () => {
  const fakeProtocols = ['ftp', 'ssh'];
  fakeProtocols.forEach((fakeProtocol) => {
    const constructor = providerConstructionByProtocol(fakeProtocol);
    test(`Fail creating a provider with '${fakeProtocol}', a fake protocols`, () => {
      if (runOnSpecificNodeVersion('14')) {
        expect(constructor).toThrow(TypeError('Invalid URL: aaa'));
      } else {
        expect(constructor).toThrow(TypeError('Invalid URL'));
      }
    });
  });

  for (const protocol of validProtocols.values()) {
    const constructor = providerConstructionByProtocol(protocol);
    test(`Create a provider with '${String(protocol)}' protocol`, () => {
      const provider = constructor();
      expect(provider.name).toBe(rightCreatedProviderName);
      expect(provider.tokenKey).toBe(exampleTokenKey);
      expect(provider.tokenValue).toBe(exampleTokenValue);
    });
  }
});

describe('Test formatting urls', () => {
  const provider = new WeatherProvider('http://example.com', exampleTokenKey, exampleTokenValue);
  const examplePaths = ['a', 'forecast', 'forecast/city'];
  examplePaths.forEach(examplePath => {
    test(`Check right search params for example path ${examplePath}`, () => {
      const url = provider.formatUrl(examplePath);
      expect(url.searchParams).toBeInstanceOf(URLSearchParams);
      expect(url.searchParams.get(exampleTokenKey)).toBe(exampleTokenValue);
      const regex = RegExp(`^\/${examplePath}$`);
      console.info("B", regex, regex.test(url.pathname));
      expect(regex.test(url.pathname)).toBeTruthy();
    });
  })
});
