import express from "express";
import con from '../SQL_connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isAuthed from "../isAuthed.js";

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const auth = await isAuthed(req)
        res.render('register', { css: 'index.css', isAuthed: auth })

    } catch (err) {
        res.json({ err: err });
    }
});

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password, repeatPassword } = req.body;
        if (password !== repeatPassword) return res.json({ err: 'Pass not match' })
        const [nameCheck] = await con.query(`SELECT name FROM user WHERE name = ?`, [name])
        if (nameCheck.length > 0) return res.json({ err: 'Username exist ' })
        const hashedPassword = await bcrypt.hash(password, 10)
        const registeredUser = await con.query(`
        INSERT INTO user (name, email, password, register_time)
        VALUES(?, ?, ?, ?)
        `, [name, email, hashedPassword, new Date().toLocaleString('LT')]);
        const token = jwt.sign({ name: name, id: registeredUser[0].insertId }, process.env.SECRET_JWT_TOKEN, { expiresIn: '10m' })
        res.cookie('token', token, { maxAge: 100000, httpOnly: true })
            .redirect('/')
    } catch (err) {
        res.json({ err: err })
    }
})

export default router