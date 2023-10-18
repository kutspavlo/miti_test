const puppeteer = require('puppeteer');
const CareersPage = require('../pages/careersPage');
const expect = require('chai').expect;

describe('Careers Functionality', () => {
  let browser;
  let page;
  let careerPage;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    careerPage = new CareersPage(page);
  });

  after(async () => {
    await browser.close();
  });

  it('filter test', async () => {
    await careerPage.navigateTo();
    await careerPage.applyDataFilterAndVerifyVisibility();
    await careerPage.applyEngineeringFilterAndVerifyVisibility();
    await careerPage.applyLegalFilterAndVerifyVisibility();
    await careerPage.applyProductFilterAndVerifyVisibility();
    await careerPage.applyEngineeringFilterAndVerifyVisibility();
    await careerPage.applyAllFilterAndVerifyVisibility();
  });

  it('position details - learn more', async () => {
    await careerPage.navigateTo();
    await careerPage.clickOnFirstPositionLearnMoreButtonAndVerifyNavigation();
  });

  it('position details - apply or position', async () => {
    await careerPage.navigateTo();
    await careerPage.clickOnFirstPositionApplyButtonAndVerifyNavigation();
  });

});
