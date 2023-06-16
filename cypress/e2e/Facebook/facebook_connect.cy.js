describe('Facebook Connect API', () => {
    it('should log in with Facebook and validate the response', () => {
      const accessToken = 'EAAEPZAy7f3lIBAE81R5T9uEey9gpZCjhIB7kUdmLc9PL6o6jpzZCY2aZCnMwey2piGa9uD1Ja15ZAVItJZCD6OZC5xGZBagwR1nZAEvlBbZAW1RkBpWjP9kz25pmcr92S2lDA1WmKeVpQ9sxgwniuOJiW3doPneAQLq7Uf1eUKZBXri9ybUHpXSNLeaPSl0oQKUZAGa064g6LjELUAZDZD';
  
      cy.request({
        method: 'POST',
        url: 'https://api.influnaire.dreamkashmir.com/api/v1/auth/facebook/connect',
        body: {
          accessToken: accessToken,
          userType: 'influencer',
        },
      }).then((response) => {
        // Validate the response
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Success');
        // Add more assertions as needed
      });
    });
  });
  