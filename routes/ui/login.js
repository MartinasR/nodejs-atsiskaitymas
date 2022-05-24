import express from "express";
import con from '../SQL_connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isAuthed from '../isAuthed.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const auth = await isAuthed(req)
        res.render('login', { css: 'index.css', isAuthed: auth })

    } catch (err) {
        res.json({ err: err });
    }
});

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const { name, password } = req.body;
        const [user] = await con.query(`SELECT * FROM user WHERE name = ?`, [name])
        if (user.length === 0) return res.json({ err: 'No such user' })
        const compare = await bcrypt.compare(password, user[0].password)
        if(!compare) return res.json({ err: 'Wrong password' })
        const token = jwt.sign({ name: user[0].name, id: user[0].id }, process.env.SECRET_JWT_TOKEN, { expiresIn: '10m' })
        res.cookie('token', token, { maxAge: 100000, httpOnly: true })
            .redirect('/')
    } catch (err) {
        res.json({ err: err })
    }
})

export default router