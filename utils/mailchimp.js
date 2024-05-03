async function registerUserToMailchimp(email, name) {
  try {
    const response = await fetch("/api/mailchimp", {
      method: "POST",
      body: JSON.stringify({ email, name }),
    });
    const data = await response.json();
    console.log("response : ", data);
  } catch (err) {
    console.log("response : ", err.message);
  }
}

export default registerUserToMailchimp;
