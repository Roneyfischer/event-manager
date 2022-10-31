import express from "express";
import app from "./src/0.config/server/app.js"
import errorHandling from "./src/2.service/errorHandling/errorHandling.js"

try {
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on ${process.env.SERVER_PORT}`)
})

} catch(error) {errorHandling(error)}
