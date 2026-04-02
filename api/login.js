export default async function handler(req, res) {
  let body = "";

  // Read raw request body
  await new Promise((resolve) => {
    req.on("data", chunk => {
      body += chunk;
    });
    req.on("end", resolve);
  });

  try {
    const parsed = JSON.parse(body || "{}");

    const username = parsed.username;
    const password = parsed.password;

    console.log("LOGIN DATA:", username, password);

    if (username === "admin" && password === "1234") {
      return res.status(200).json({ success: true });
    }

    return res.status(200).json({ success: false });

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ success: false });
  }
}