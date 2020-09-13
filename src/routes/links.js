const express = require('express');
const router = express.Router();
const pool = require('../database'); // Recibimos el objeto pool.

router.get('/add', (req, res) => {
    res.render('links/add')
});

router.post('/add', async(req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('sucess', 'Link saved sucessfully.');
    res.redirect('/links');
});

router.get('/', async(req, res) => {
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', { links: links });
});

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('sucess', 'Link deleted sucessfully.');
    res.redirect('/links');
});

router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const link = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', { link: link[0] });
});

router.post('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    req.flash('sucess', 'Link updated sucessfully.');
    res.redirect('/links');
});


module.exports = router;