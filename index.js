import express from "express";

let app = new express();

app.get("/", (req, res) => {
	res.json({ status: 200, response_message: "hello world" });
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
	console.log("Server is running on port 80");
});
