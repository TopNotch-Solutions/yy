export const fetchOAuthToken = async () => {
    try {
      const response = await fetch('https://api-gw.mtc.com.na/mdt-km/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic UlA1SEZuOGFLV05NQnRYOVRnSEdkMF9CRGhJYTp1WVBySldSajM2ZTNCQlZqSllWTDV2WE1JMThh`, // Replace with environment variable in production
          token: 'Bearer eyJ4NXQiOiJPVFE1WmpFelpqWTBNV0ZrWlRFek9XRXpaVEV4TW1ReVlUZGlOREl5WVRkall6WTJZakF3TlEiLCJraWQiOiJNRFZrWTJJMVl6RmtNamRqWVRrellqaGtORFE1T1Roa1ltWmlZamxrWWpSbU1tTXhZMkpqWW1RNE1qWTJNV1UwWWpFMk16TTFaVEV3TkRrM1pqVTVaUV9SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiS2xaaVRXZ2hWZmpQdHF6ZkludHVybjFoYkpRYSIsIm5iZiI6MTczMjEwNDM4MSwiYXpwIjoiS2xaaVRXZ2hWZmpQdHF6ZkludHVybjFoYkpRYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9rbS5tdGMuY29tLm5hOjQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTg4OTc4NDM4MSwiaWF0IjoxNzMyMTA0MzgxLCJqdGkiOiJjN2JiM2Q2ZC1lZGUxLTQ0OWUtOWQwYi1mMWMwYWYzZDYyMWUifQ.KvrchhG6cTrLGXOxrF2d73NOQ0ZJ3HjKu7bW9WV3z8uKMGhBokvtjkJFPC9LfpO41k6yVCb68UuYhj67xKFqvx-Hn73jLym9zclrsUbLLjB7eRmWd6zqAMOo8dnu_g7ZFZEX7s1w1IN2ObPEHwZg9jBhnkCrKqT2VS_E04t9wggjekU-n8ulla8raWHdXP3tai0UhZwQYb6F60A4bu45_7qGP1M3gg1ZqMkUHt7fobA3P5GFTfEeyh7Gx472jyDPP5RjXQZHgqehyQJq7Wlekt8b8tDQLL5UhZ2PPRgIOBFgJjYVrdfPLIhDumIcD-a_mEzahs_Dvfc0HVdYi8mdtQ', // Replace with environment variable in production
        },
        body: new URLSearchParams({
          'grant_type': 'client_credentials',
        }).toString(),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching token:', errorData);
        throw new Error(`Failed to fetch token: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(data)
      return data; // Return the fetched token data
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  };
  