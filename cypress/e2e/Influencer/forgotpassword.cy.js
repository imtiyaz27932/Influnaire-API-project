


describe('API Tests', () => {
    it('Influencer Forgot Password  API functionality', () => {
        cy.fixture('Influencer/forgotpassword').then((data) => {
            const requestBody = data.validEmail;
            console.log('requestBody: ', requestBody);

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/influencer/forgot/password",
                body: requestBody,
                failOnStatusCode: false
            })
                .then((response) => {
                    cy.log("requestBody: ", requestBody)
                    cy.log("response: ", response);
                    expect(response.body.status).to.eq(200)
                    expect(response.body.data.message).to.eq('otp has been sent');
                    expect(response.body.message).to.eq('Success')

                });
        });
    });

    it('Test that if the influencer provides invalid email', () => {
        cy.fixture('Influencer/forgotpassword').then((data) => {
            const requestBody = data.invalidEmail;
            console.log('requestBody: ', requestBody);

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/influencer/forgot/password",
                body: requestBody,
                failOnStatusCode: false
            })
                .then((response) => {
                    cy.log("requestBody: ", requestBody)
                    cy.log("response: ", response);
                    expect(response.body.status).to.eq(400)
                    expect(response.body.errors.email).to.eq('email must be an email')
                });
        });
    });
});
