import express from "express";
const api = express();

api.get("/", (req, res) => {
    res.send("API Running!")
})

api.get("/foo", (req, res) => {
    res.send({
        resp: "Foo!"
    });
})

api.get("/bar", (req, res) => {
    res.send({
        resp: "Bar!"
    });
});

//Catch everything else and make an API like response.
api.get("*", (req, res) => {
    res.status(404).send({
        error: "Not Found!",
        code: 404
    });
});

export default api;
