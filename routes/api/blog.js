import express from "express";
import con from '../../SQL_connection.js';

const router = express.Router()

router.get('/:id?', async (req, res) => {
    try {
        const [data] = await con.query(`
        SELECT * FROM blog
        ${req.params.id ? `WHERE id = ?` : ''}
        `, [req.params.id])
        res.json(data)

    } catch (err) {
        res.json({ err: err });
    }
});

export default router