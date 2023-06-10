
describe('API Tests', () => {   
    it('Login API functionality', () => {
        cy.fixture('Admin/login').then((data) => {
            const requestBody = data;
            console.log('requestBody: ', requestBody);

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/admin/email/login",
                body: requestBody
            })
                .then((response) => {
                    console.log("response: ", response);
                    expect(response.status).to.eq(200);
                    expect(response.body.data.user.email).to.eq(requestBody.email);
                    expect(response.body.data.user).has.property('email', requestBody.email)
                });
        });
    })
})