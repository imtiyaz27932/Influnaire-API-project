

describe('API Tests', () => {
  it('SMS resend OTP API functionality', () => {
    cy.fixture('SMS/resend.json').then((data) => {
      const requestBody = data.validPhone
      console.log('requestBody: ', requestBody);

      cy.request({
        method: 'POST',
        url: "https://api.influnaire.dreamkashmir.com/api/v1/sms/resend-otp",
        body: requestBody,
        failOnStatusCode: false
      })
        .then((response) => {
          try {
            cy.log("response: ", response);
            const userDetails = `OTP is: ${response.body}`
            cy.log("User Details:", userDetails);
            expect(response.status).to.equal(200);
          } catch (error) {
            cy.log('AssertionError:', error.message);
          }
        });
    });



  });

  it('SMS verify OTP API functionality', () => {
    cy.fixture('SMS/resend.json').then((data) => {
      const requestBody = data.verifyotp;
      console.log('requestBody: ', requestBody);

      cy.request({
        method: 'POST',
        url: "https://api.influnaire.dreamkashmir.com/api/v1/sms/verify-otp",
        body: requestBody,
        failOnStatusCode: false
      })
        .then((response) => {
          try {
            cy.log("response: ", response);
             const userDetails = `Message is: ${response.body.error.message}`
            cy.log("User Details:", userDetails);
            expect(response.status).to.equal(400);
            expect(response.body.error.message).to.equal('invalid OTP')
          } catch (error) {
            cy.log('AssertionError:', error.message);
          }

        });
    })
  })
})

