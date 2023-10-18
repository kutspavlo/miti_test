const expect = require('chai').expect;

class CareersPage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            allButton: `//a[text() = "All"]`,
            dataButton: `//a[text() = "Data"]`,
            engineeringButton: `//a[text() = "Engineering"]`,
            legalButton: `//a[text() = "Legal"]`,
            productButton: `//a[text() = "Product"]`,
            openPositionsSpan: `//span[text() = "Open positions"]`,
            allPositionsWrapper: `.tm-wrapper`,
            dataPositionsWrapper: `[data-tag="data"]`,
            engineeringPositionsWrapper: `[data-tag="engineering"]`,
            legalPositionsWrapper: `[data-tag="legal"]`,
            productPositionsWrapper: `[data-tag="product"]`,
            positionLinkButton: `//a[contains(@class, 'jl-accordion-title')]`,
            positionLearnMoreButton: `//div[contains(@class, 'tm-content')]//a[text() = 'Learn more']`,
            positionApplyThisPositionButton: `//div[contains(@class, 'tm-content')]//a[text() = 'Apply for this position']`,
            pdfInDOM: `//embed[@type = 'application/pdf']`,
            contactPageHeader: `//h2[text() = 'Contact Mitigram']`


        };
    }

    async navigateTo() {
        await this.page.goto('https://www.mitigram.com/careers');
    }


    async applyDataFilterAndVerifyVisibility() {
        const { dataButton, dataPositionsWrapper, engineeringPositionsWrapper, legalPositionsWrapper,productPositionsWrapper } = this.selectors;
        await this.page.click('xpath/' + dataButton);
        await this.page.waitForSelector(engineeringPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(legalPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(productPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(dataPositionsWrapper, {
            visible: true,
        })
    }

    async applyEngineeringFilterAndVerifyVisibility() {
        const { engineeringButton, dataPositionsWrapper, engineeringPositionsWrapper, legalPositionsWrapper,productPositionsWrapper } = this.selectors;
        await this.page.click('xpath/' + engineeringButton);
        await this.page.waitForSelector(dataPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(legalPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(productPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(engineeringPositionsWrapper, {
            visible: true,
        })
    }

    async applyLegalFilterAndVerifyVisibility() {
        const { legalButton, dataPositionsWrapper, engineeringPositionsWrapper, legalPositionsWrapper,productPositionsWrapper } = this.selectors;
        await this.page.click('xpath/' + legalButton);
        await this.page.waitForSelector(dataPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(engineeringPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(productPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(legalPositionsWrapper, {
            visible: true,
        })
    }

    async applyProductFilterAndVerifyVisibility() {
        const { productButton, dataPositionsWrapper, engineeringPositionsWrapper, legalPositionsWrapper,productPositionsWrapper } = this.selectors;
        await this.page.click('xpath/' + productButton);
        await this.page.waitForSelector(dataPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(engineeringPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(legalPositionsWrapper, {
            visible: false,
        })
        await this.page.waitForSelector(productPositionsWrapper, {
            visible: true,
        })
    }

    async applyAllFilterAndVerifyVisibility() {
        const { allButton, dataPositionsWrapper, engineeringPositionsWrapper, legalPositionsWrapper,productPositionsWrapper } = this.selectors;
        await this.page.click('xpath/' + allButton);
        await this.page.waitForSelector(dataPositionsWrapper, {
            visible: true,
        })
        await this.page.waitForSelector(engineeringPositionsWrapper, {
            visible: true,
        })
        await this.page.waitForSelector(legalPositionsWrapper, {
            visible: true,
        })
        await this.page.waitForSelector(productPositionsWrapper, {
            visible: true,
        })
    }

    async clickOnFirstPositionLearnMoreButtonAndVerifyNavigation() {
        const { positionLinkButton, positionLearnMoreButton, pdfInDOM } = this.selectors;
        await this.page.click('xpath/' + positionLinkButton);
        await this.page.waitForSelector('xpath/' + positionLearnMoreButton, {
            visible: true,
        })
        await this.page.click('xpath/' + positionLearnMoreButton);
        await this.page.waitForSelector('xpath/' + pdfInDOM)
        expect(this.page.url()).to.include('mitigram.com/images/ads');
    }

    async clickOnFirstPositionApplyButtonAndVerifyNavigation() {
        const { positionLinkButton, positionApplyThisPositionButton, contactPageHeader} = this.selectors;
        await this.page.click('xpath/' + positionLinkButton);
        await this.page.waitForSelector('xpath/' + positionApplyThisPositionButton, {
            visible: true,
        })
        await this.page.click('xpath/' + positionApplyThisPositionButton);
        await this.page.waitForSelector('xpath/' + contactPageHeader);
        expect(this.page.url()).to.include('mitigram.com/contact');
    }



}

module.exports = CareersPage;