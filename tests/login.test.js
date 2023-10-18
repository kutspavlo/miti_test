const puppeteer = require('puppeteer');
const LoginPage = require('../pages/loginPage');
const expect = require('chai').expect;

describe('Login Functionality', () => {
  let browser;
  let page;
  let loginPage;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
  });

  after(async () => {
    await browser.close();
  });

  it('should display error for not provided password', async () => {
    await loginPage.navigateTo();
    await loginPage.login('test@test.com', '');
    var errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.include('Password is required');
  });

  it('should display error for not provided email', async () => {
    await loginPage.navigateTo();
    await loginPage.login('', '123456');
    var errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.include('Email is required');
    expect(errorMessage).to.include('The Email field is not a valid e-mail address.');
  });

  it('should display error for not valid email', async () => {
    await loginPage.navigateTo();
    await loginPage.login('foooo', '123456');
    var errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.include('The Email field is not a valid e-mail address.');
  });

  it('should display error for incorrect credentials', async () => {
    await loginPage.navigateTo();
    await loginPage.login('test@test.com', '123456');
    var errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.include('Invalid login attempt.');
  });

  it('should successfuly login with valid credentials', async () => {
    await loginPage.navigateTo();
    await loginPage.loginAndVerifyNavigation('test@test.com', '123456', 'https://marketplace.mitigram.com/home');
    //since I have no valid creds, this test made on assumption that after sucessfull login user should be redicrected on abstract /home page
   
  });

});
