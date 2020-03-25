/**
 *
 * @link https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117
 * @deprecated Currently we are not able to bundle i18n files to single script, using this approach, cdn support not be available thus it is deprecated for now.
 */
function getComponentClosestLanguage(element: HTMLElement): string {
  const closestElement = element.closest("[lang]") as HTMLElement;
  return closestElement ? closestElement.lang : "en";
}

function fetchLocaleStringsForComponent(
  componentName: string,
  locale: string
): Promise<any> {
  return new Promise((resolve, reject): void => {
    fetch(`/i18n/${componentName}.i18n.${locale}.json`).then(result => {
      if (result.ok) resolve(result.json());
      else reject();
    }, reject);
  });
}

export async function getLocaleComponentStrings(
  element: HTMLElement
): Promise<any> {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = getComponentClosestLanguage(element);
  let strings;
  try {
    strings = await fetchLocaleStringsForComponent(
      componentName,
      componentLanguage
    );
  } catch (e) {
    strings = await fetchLocaleStringsForComponent(componentName, "en");
  }
  return strings;
}
