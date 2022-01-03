import { validProtocols, WeatherProvider } from '../index';

const rightCreatedProviderName = 'Weather Provider';

const construction = () => new WeatherProvider('aaa', 'tok', 'val');
test('Fail creating a provider without a well formed URL', () => {
  expect(construction).toThrow(TypeError('Invalid URL'));
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
