import { newE2EPage } from '@stencil/core/testing';

describe('pwc-leaflet-entity-selector', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pwc-leaflet-entity-selector></pwc-leaflet-entity-selector>');

    const element = await page.find('pwc-leaflet-entity-selector');
    expect(element).toHaveClass('hydrated');
  });
});
