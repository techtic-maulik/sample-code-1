export default async function handler(req, res) {
  const { email, name } = JSON.parse(req.body);
  const apiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
  const listId = process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID;
  const serverPrefix = apiKey.split("-")[1];
  const apiUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        email_address: email,
        merge_fields: {
          FNAME: name,
        },
        status: "subscribed",
      }),
      headers,
    });
    const data = await response.json();
    res.send({ message: "success" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
