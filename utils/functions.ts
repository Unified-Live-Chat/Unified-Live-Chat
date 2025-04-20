import { Service, Services } from './constants.ts';

/**
 * Gets the service from the URL
 *
 * @returns {Service | undefined} The service the user is currently on,
 * or undefined if the URL is not on a supported service site.
 */
export function getServiceFromUrl(url: URL): Service | undefined {
  return Object.values(Services).find((service) =>
    url.hostname.includes(service.url.hostname),
  );
}

/**
 * Gets the service name of the current site
 *
 * @returns {Service | undefined} The service the user is currently on,
 * or undefined if the user is not on a supported service site.
 */
export function getService(): Promise<Service | undefined> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const urlStr = tabs[0]?.url ?? '';
      if (urlStr) {
        const serviceResult = getServiceFromUrl(new URL(urlStr));
        resolve(serviceResult);
      } else {
        resolve(undefined);
      }
    });
  });
}
