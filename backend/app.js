const express = require ('express')

const app = express ();

app.use(express.json());  // i can read the JSON from the request


const userRoute = require ('./Routes/userRoute')
app.use('/api/user', userRoute)

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on port:", PORT)
})