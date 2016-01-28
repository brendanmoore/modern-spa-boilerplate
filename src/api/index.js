import express from "express";
const api = express();

api.get("/", (req, res) => {
    res.send("API Running!")
})

api.post("/login", (req, res) => {
    const { user, pass } = req.body;
    if (user === "test@example.com" && pass === "password1") {
        res.send({
            firstName: "Albert",
            lastName: "Einstien"
        });
    } else {
        res.status(401).send({
            error: "User/Password combination not correct"
        });
    }
})

//Catch everything else and make an API like response.
api.get("*", (req, res) => {
    res.status(404).send({
        error: "Not Found!",
        code: 404
    });
});

export default api;
