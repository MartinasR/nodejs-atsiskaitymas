import express from 'express'
import con from '../../SQL_connection.js'



const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const [data] = await con.query("SELECT*FROM blogai.user")
    res.send(data)
  } catch (err) {
    console.log("Kazkas blogai /api/user")
    res.send({ err: `Error: ${err}` })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [data] = await con.query(`SELECT * FROM blogai.user WHERE id= ?`, [req.params.id])
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