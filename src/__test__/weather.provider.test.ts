import { validProtocols, WeatherProvider } from '../index';

const rightCreatedProviderName = 'Weather Provider';

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

const construction = () => new WeatherProvider('aaa', 'tok', 'val');
test('Fail creating a provider without a well formed URL', () => {
  const nodeVersion = process.versions.node.match(/^(\d+)\.\d+\.\d+$/);
  console.info(process.versions.node, nodeVersion);
  if (runOnSpecificNodeVersion('14')) {
    expect(construction).toThrow(TypeError('Invalid URL: aaa'));
  } else {
    expect(construction).toThrow(TypeError('Invalid URL'));
  }
});

test('Create a provider with a well formed URL', () => {
  const provider = new WeatherProvider('http://example.com', 'tok', 'val');
  expect(provider.name).toBe(rightCreatedProviderName);
});

for (const protocol of validProtocols.values()) {
  test(`Create a provider with ${String(protocol)} protocol`, () => {
    const urlString = `${String(protocol)}//example.com`;
    const provider = new WeatherProvider(urlString, 'tok', 'val');
    expect(provider.name).toBe(rightCreatedProviderName);
  });
}
