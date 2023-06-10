describe('API Tests', () => {
    it('Influencer Login API functionality', () => {
      cy.fixture('Influencer/login').then((data) => {
        const requestBody = data.Validcredentials;
        console.log('requestBody: ', requestBody);
  
        cy.request({
          method: 'POST',
          url: "https://api.influnaire.dreamkashmir.com/api/v1/influencer/email/login",
          body: requestBody,
          failOnStatusCode: false
        })
        .then((response) => {
          cy.log("response: ", response);
          const userDetails = `ID: ${response.body.data.user.id}, Email: ${response.body.data.user.email}, User Type: ${response.body.data.user.userType}, First Name: ${response.body.data.user.profile.firstName}, Last Name: ${response.body.data.user.profile.lastName}, Phone Number: ${response.body.data.user.profile.phoneNumber}, Is Profile Completed: ${response.body.data.isProfileCompleted}`;
          cy.log("User Details:", userDetails);
          expect(response.status).to.eq(200);
          expect(response.body.data.user.email).to.eq(requestBody.email);
          expect(response.body.data.user.userType).to.eq('influencer');
          expect(response.body.data.user.profile.firstName).to.eq('John');
          expect(response.body.message).to.eq('Success');
          expect(response.body.data.user).to.have.property('email', requestBody.email);
        });
      });
    });
  
    it('Test API with invalid email format', () => {
      cy.fixture('Influencer/login').then((data) => {
        const requestBody = data.Invalidcredentials;
        console.log('requestBody: ', requestBody);
  
        cy.request({
          method: 'POST',
          url: "https://api.influnaire.dreamkashmir.com/api/v1/influencer/email/login",
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
  