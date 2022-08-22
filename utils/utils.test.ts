import { generatePageTitle, convertTitleToSlug } from '.';

describe('generatePageTitle', () => {
  const dummyNavData = [
    {
      title: 'Landscapes',
      contentfulId: '1',
      firstImage: {
        contentfulId: '1',
        title: 'Snowy Lakeside',
        description: 'a photo',
        url: 'url',
      },
      imageTitles: ['Snowy Lakeside', 'Image 2'],
    },
  ];
  it('generates the home page title', () => {
    const generated = generatePageTitle('/');
    const expected = 'Christopher Allen Photography: Home';
    expect(generated).toEqual(expected);
  });

  it('generates the albums nav page title', () => {
    const generated = generatePageTitle('/albums');
    const expected = 'Christopher Allen Photography: Albums';
    expect(generated).toEqual(expected);
  });

  it('dynamically generates an album page title', () => {
    const generated = generatePageTitle(
      '/albums/landscapes',
      '',
      'landscapes',
      dummyNavData,
    );
    const expected = 'Christopher Allen Photography: Landscapes';
    expect(generated).toEqual(expected);
  });

  it('dynamically generates an image page title', () => {
    const generated = generatePageTitle(
      '/albums/landscapes/snowy-lakeside',
      'snowy-lakeside',
      'landscapes',
      dummyNavData,
    );
    const expected = 'Christopher Allen Photography: Snowy Lakeside';
    expect(generated).toEqual(expected);
  });

  it('falls back if an unexpected page path occurs', () => {
    const generated = generatePageTitle('/404');
    const expected = 'Christopher Allen Photography';
    expect(generated).toEqual(expected);
  });
});

describe('convertTitleToSlug', () => {
  it('lowercases a one-word title', () => {
    const title = 'Landscapes';
    const expected = 'landscapes';
    expect(convertTitleToSlug(title)).toEqual(expected);
  });

  it('hyphenates and lowercases a two-word title', () => {
    const title = 'Snowy Lakeside';
    const expected = 'snowy-lakeside';
    expect(convertTitleToSlug(title)).toEqual(expected);
  });

  it('hyphenates and lowercases a long title', () => {
    const title = 'Northbridge Town Photo Gallery';
    const expected = 'northbridge-town-photo-gallery';
    expect(convertTitleToSlug(title)).toEqual(expected);
  });
});
