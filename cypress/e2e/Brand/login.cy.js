describe('API Tests', () => {
    it('Brand Login API functionality with valid email', () => {
        cy.fixture('Brand/login').then((data) => {
            const requestBody = data.Validcredentials;
            console.log('requestBody: ', requestBody);

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/brand/email/login",
                body: requestBody,
                failOnStatusCode: false
            })
                .then((response) => {
                    try {
                        cy.log("response: ", response);
                        // const userDetails = `ID: ${response.body.data.user.id}, Email: ${response.body.data.user.email}, User Type: ${response.body.data.user.userType}, First Name: ${response.body.data.user.profile.firstName}, Last Name: ${response.body.data.user.profile.lastName}, Phone Number: ${response.body.data.user.profile.phoneNumber}, Is Profile Completed: ${response.body.data.isProfileCompleted}`;
                        // cy.log("User Details:", userDetails);
                        expect(response.body.status).to.eq(200);
                       // expect(response.body.data.user.profile.firstName).to.eq('Imtiyaz');
                        expect(response.body.message).to.eq('Success');
                        expect(response.body.data.user.status).to.equal('lead')
                        expect(response.body.data.user.userType).to.equal('brand')
                        expect(response.body.data.user.profile.phoneNumber).to.equal('+19887988907')
                        expect(response.body.data.user.profile.jobTitle).to.equal('Software Engineer')
                    } catch (error) {
                        cy.log('AssertionError:', error.message);
                    }
                });
        });
    });


    it('Brand API with invalid email format', () => {
        cy.fixture('Influencer/login').then((data) => {
            const requestBody = data.Invalidcredentials;
            console.log('requestBody: ', requestBody);

            cy.request({
                method: 'POST',
                url: "https://api.influnaire.dreamkashmir.com/api/v1/brand/email/login",
                body: requestBody,
                failOnStatusCode: false
            })
                .then((response) => {
                    cy.log("response: ", response);
                    expect(response.status).to.eq(400);
                    expect(response.body.errors.email).to.eq('invalid credentials');
                });
        });
    });
});
