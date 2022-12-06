describe('DogApp Navigation', () => {
  beforeAll(async () => {
    await device.launchApp({ permissions: { camera: 'YES', photos: 'YES' } });
  });

  it('permissions have been accepted', async () => {
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('can navigate between all screens', async () => {
    await expect(element(by.id('welcome_screen'))).toExist();
    await element(by.id('skip_login')).tap()
    await expect(element(by.id('dashboard_screen'))).toExist();
    await element(by.id('upload_screen_button')).atIndex(1).tap()
    await expect(element(by.id('upload_screen'))).toExist();
    await element(by.id('profile_screen_button')).atIndex(1).tap()
    await expect(element(by.id('profile_screen'))).toExist();
    await element(by.id('dashboard_screen_button')).atIndex(1).tap()
    await expect(element(by.id('dashboard_screen'))).toExist();
    await element(by.id('logout_button')).tap()
    await expect(element(by.id('welcome_screen'))).toExist();
  });
});
