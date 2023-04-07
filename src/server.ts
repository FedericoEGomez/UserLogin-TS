import app from './index'
require('dotenv').config();

const port =  process.env.PORT || 3000 
app.listen(port, () => {
    console.log(`Hello World http://localhost:${port}`),
    console.log(`Api information http://localhost:${port}/swagger`)
  })