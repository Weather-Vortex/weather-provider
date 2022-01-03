import { validProtocols, WeatherProvider } from '../index';

const rightCreatedProviderName = 'Weather Provider';
const exampleHost = 'example.com';

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
  return () => new WeatherProvider(url, 'tok', 'val');
};

test('Test creating providers', () => {
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
    });
  }
});
