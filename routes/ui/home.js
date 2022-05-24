import express from "express";
import con from "../../SQL_connection.js";


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    let sortBy = req.query.sortBy;
    let orderSort = req.query.sorting;

    if (sortBy === undefined || sortBy === "null") {
      sortBy = "id"
    } else {
      sortBy = req.query.sortBy
    }

    if (orderSort === "Dydejanti") {
      orderSort = "ABC"
    } else {
      orderSort = "ZYX"
    }


    const [data] = await con.query(`SELECT blog.id,blog.title,blog.content FROM blogai.blog ORDER BY ${sortBy} ${orderSort}`);
    res.render('home', { blogai: data, title: "everything" })
  } catch (err) {
    console.log("Error")
    res.send({ err: `Error: ${err}` })
  }
})


export default router