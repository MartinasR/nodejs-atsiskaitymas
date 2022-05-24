import express from 'express'
import connect from '../../SQL_connection.js'



const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const [data] = await connect.query("SELECT*FROM blogai.blog")
    res.send(data)
  } catch (err) {
    console.log("Kazkas blogai /api/blog")
    res.send({ err: `Error: ${err}` })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [data] = await connect.query(`SELECT * FROM blogai.blog WHERE id= ?`, [req.params.id])
    if (data.length === 0) {
      res.send("Something went wrong")
    } else {
      res.send(data)
    }

  } catch (err) {
    console.log("Error")
    res.send({ err: `Error: ${err}` })
  }
})



export default router