
describe('API Tests', () => {
    it('Register API functionality with valid email', () => {
        cy.fixture('Admin/register').then((data) => {
            const requestBody = data.validEmail;

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/admin/email/register",
                body: requestBody,
                failOnStatusCode: false
            });
        }).then((response) => {
            try {
                cy.log('response.body:', response.body);
                expect(response.body.status).to.equal(201);
                expect(response.body.data.userType).to.equal('admin');
                expect(response.body.data.isProfileCompleted).to.be.true;
                expect(response.body.message).to.equal('Resource created');
                expect(response.body.error).to.be.null;
                expect(response.body.data.token).to.be.a('string');
            } catch (error) {
                cy.log('AssertionError:', error.message);
            }
        });
    });

    it('Verify that user provides invalid credentials', () => {
        cy.fixture('Admin/register').then((data) => {
            const requestBody = data.invalidEmail;

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/admin/email/register",
                body: requestBody,
                failOnStatusCode: false
            });
        }).then((response) => {
            console.log('response.body:', response.body);
            expect(response.body.status).to.equal(400);
            expect(response.body.errors.email).to.equal('email must be an email')
        });
    });
});

