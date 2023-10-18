const expect = require('chai').expect;

class LoginPage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            emailInput: '[data-bind = "value: email"]',
            passwordInput: '[data-bind = "value: password"]',
            loginButton: 'button#loginBtn',
            errorMessage: 'div.noty_body',
        };
    }

    async navigateTo() {
        await this.page.goto('https://marketplace.mitigram.com/Account/Login');
    }

    async login(email, password) {
        const { emailInput, passwordInput, loginButton } = this.selectors;
        await this.page.type(emailInput, email);
        await this.page.type(passwordInput, password);
        await this.page.click(loginButton);
    }

    async getErrorMessage() {
        const { errorMessage } = this.selectors;
        await this.page.waitForSelector(errorMessage)
        let element = await this.page.$(errorMessage)
        let errorText = await this.page.evaluate(el => el.textContent, element)
        return errorText;
    }

    async loginAndVerifyNavigation(email, password, expectedUrl) {
        this.login(email, password);
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
        expect(this.page.url()).to.equal(expectedUrl)

    }
}

module.exports = LoginPage;