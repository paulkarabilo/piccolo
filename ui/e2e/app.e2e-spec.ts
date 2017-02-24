import { PiccoloPage } from './app.po';

describe('piccolo App', () => {
  let page: PiccoloPage;

  beforeEach(() => {
    page = new PiccoloPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
