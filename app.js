const express = require("express")
const app = express()
const PORT = 4000
const fs = require("fs")
const path = require("path")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {

  const data = {
    name: "Alex",
    age: 17,
  }

  res.render("home", { data })
})

// query string
app.get("/profile", (req, res) => {
  
  const {
    name,
    gender
  } = req.query

  res.render("profile", { data: {
    name,
    gender
  }})
})

app.get("/shirts", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, "/data/shirts.json"))

  const dataParsed = JSON.parse(data)

  res.render("shirts", { data: dataParsed})

})

app.get("/add-shirt", (req, res) => {
  res.render("add-shirt")
})

app.post("/add-new-shirt", (req, res) => {

  const {
    id_shirt,
    merk_shirt
  } = req.body

  const data = fs.readFileSync(path.join(__dirname, "/data/shirts.json"))

  const dataParsed = JSON.parse(data)

  dataParsed.push({
    id: id_shirt,
    merk: merk_shirt
  })

  fs.writeFileSync(path.join(__dirname, "/data/shirts.json"), JSON.stringify(dataParsed, null, 2))

  res.redirect("/shirts")

})

app.listen(PORT, () => {
  console.log("This app running port: ", PORT);
})