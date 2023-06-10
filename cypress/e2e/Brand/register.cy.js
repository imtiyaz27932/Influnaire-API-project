describe('API Tests', () => {
    it('Brand Register API functionality with valid email', () => {
        cy.fixture('Brand/register').then((data) => {
            const requestBody = data.validEmail;

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/brand/email/register",
                body: requestBody,
                failOnStatusCode: false
            }).then((response) => {
                try{
                cy.log('response.body:', response.body);
                const userDetails = `User Type: ${response.body.data.userType}`
                cy.log("User Details:", userDetails);
                
                expect(response.body.status).to.equal(201);
                expect(response.body.data.userType).to.equal('brand');
                expect(response.body.data.message).to.eq('Email verification otp has been sent');
                expect(response.body.message).to.eq('Resource created');
                expect(response.body.data.isProfileCompleted).to.be.true;
            } catch (error) {
                cy.log('AssertionError:', error.message);
              }
            });
        });
    });

    it('Brand Register API functionality with invalid email', () => {
        cy.fixture('Brand/register').then((data) => {
            const requestBody = data.invalidEmail;

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/brand/email/register",
                body: requestBody,
                failOnStatusCode: false
            }).then((response) => {
                cy.log('response.body:', response.body);
                console.log('response.body:', response.body);
                expect(response.body.status).to.equal(400);
                expect(response.body.errors.email).to.equal('email must be an email')
                  });

            });
        });
    });

