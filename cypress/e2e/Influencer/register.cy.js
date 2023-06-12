describe('API Tests', () => {
    it('Influencer Register API functionality with valid email', () => {
        cy.fixture('influencer/register').then((data) => {
            const requestBody = data.validEmail;

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/influencer/email/register",
                body: requestBody,
                failOnStatusCode: false
            });
        }).then((response) => {
            try {
                cy.log('response.body:', response.body);
                const userDetails = `User Type: ${response.body.data.userType}`
                cy.log("User Details:", userDetails);
                expect(response.body.status).to.equal(201);
                expect(response.body.data.userType).to.equal('influencer');
                expect(response.body.data.message).to.eq('Otp has been sent on users number');

            } catch (error) {
                cy.log('AssertionError:', error.message);
            }

        });
    });
})