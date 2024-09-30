const express = require('express')

const PORT = process.env.PORT || 5000;
const app = express()

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
})

app.listen(PORT, () => { console.log(`server started on port ${PORT}`) })