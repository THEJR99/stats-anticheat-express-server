const app = require('express')();
const PORT = 8080;

app.listen(PORT, () => {
    console.log("Server is up")
})

app.get("/stuff", (req, res) => {
    res.status(200).send({fuck: "FUUUUCK"})
})

app.post("/upload", (req, res) => {
    
})
