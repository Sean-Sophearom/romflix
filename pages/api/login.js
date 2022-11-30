// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import crypto from "crypto";

export default function handler(req, res) {
  if (req.method === "POST") {
    res.status(201).json({
      username: req.body.username || "John Doe",
      status: "success",
      token: crypto.randomUUID(),
    });
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
