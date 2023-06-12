

describe('API Tests', () => {
    it('Influencer verify OTP API functionality', () => {
        cy.fixture('Influencer/verifyotp').then((data) => {
            const requestBody = data;
            console.log('requestBody: ', requestBody);

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/influencer/verify-otp",
                body: requestBody,
                failOnStatusCode: false
            })
                .then((response) => {
                    cy.log("requestBody: ", requestBody)
                    cy.log("response: ", response);
                    expect(response.body.status).to.eq(404)
                    expect(response.body.message).to.eq('user not found')
                    expect(response.body.error).to.eq('NOT FOUND')
                    expect(response.body.data).to.be.null

                });
        });
    });
})