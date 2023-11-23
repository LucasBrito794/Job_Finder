const express = require('express');
const router  = express.Router();
const Job     = require('../models/Job');   

// Rota de teste
router.get('/test', (req, res) => {
    res.send('Deu certo');
});

// Detalhe da vaga
router.get('/view/:id', (req, res) => Job.findOne({
    where: {id: req.params.id}
})
.then(job => {
    res.render('./layouts/view', {job});
})
.catch(err => console.log(err)));
    
// Form da rota de envio
router.get('/add', (req, res) => {
    res.render('./layouts/add');
});

// Add job via POST
router.post('/add', (req, res) => {
    let {title, salary, company, email, new_job, description} = req.body;

    // Insert
    Job.create({
        title,
        salary,
        company,
        email,
        new_job,
        description
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));        
});

module.exports = router