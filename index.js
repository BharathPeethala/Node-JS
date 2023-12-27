import express from "express";

let app = new express();

app.get("/", (req, res) => {
	res.json({
		status: 200,
		response_message: "Server is available",
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
