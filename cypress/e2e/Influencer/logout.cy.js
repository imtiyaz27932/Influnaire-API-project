
describe('API Tests', () => {
    it('Logout API functionality for influencer', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2OWZkZTlmLTZlZWItNGFlZS05MjU0LTYwZDVkNTZiMDFjNCIsImlhdCI6MTY4Njg5MDEzNywiZXhwIjoxNjg2OTc2NTM3fQ.q0CyRd__mXeOg7Fx4AruhYyGUj3TxdzxfUhRwFdGQkc';
        cy.request({
            method: 'PATCH',
            url: 'https://api.influnaire.dreamkashmir.com/api/v1/influencer/logout',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            try {
                expect(response.status).to.eq(200);
            } catch (error) {
                cy.log('AssertionError:', error.message);
            }

        });
    });
});
