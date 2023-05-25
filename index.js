const express = require('express');

const port = 8080;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded());
const path = require('path');

const uploads = path.join('uploads');
const multer = require('multer');
const upload = require('./config/uploads');

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
const db = require('./config/mongoose');

const crud = require('./model/crudtbl');
// dataview 
app.get('/', (req, res) => {
    crud.find({}).then((rec) => {
        return res.render('form', {
            rec,
            user: ""
        });
    }).catch((err) => {
        console.log(err);
    })

})
// datainsert
app.post('/insertdata', upload, (req, res) => {
    const { id, name, price, page, authore, avtar } = req.body;
    if (id) {
        if (!name || !price || !page || !authore) {
            console.log("plz fill the from");
            return res.redirect('/');
        }
        else {
            crud.findByIdAndUpdate(id, {
                name: name,
                price: price,
                page: page,
                authore: authore
            }).then((data) => {
                console.log("updata");
                return res.redirect('/');

            }).catch((err) => {
                console.log(err);
                return res.redirect('/')
            })
        }
    }
    else {
        if (!name || !price || !page || !authore) {
            console.log("plz fill the from");
            return res.redirect('/');
        }
        else {
            let img = ""
            if (req.file) {
                img = req.file.path
            }
            crud.create({
                name: name,
                price: price,
                page: page,
                authore: authore,
                avtar: img
            }).then((data) => {
                console.log("data add");
                return res.redirect('back');
            }).catch((err) => {
                console.log(err);
                return res.redirect('back');
            })
        }
    }


})
// datadelete
app.get('/deletdata/:id', (req, res) => {
    const id = req.params.id
    crud.findByIdAndDelete(id)
        .then((data) => {
            console.log("data deletesuccel");
            res.redirect('back');
        }).catch((err) => {
            console.log(err);
            res.redirect('back');
        })

})

app.get('/editdata/:id', (req, res) => {
    const id = req.params.id;
    crud.findById(id).then((user) => {
        return res.render('form', {
            user,
            rec: []
        })
    }).catch((err) => {
        console.log();
    })
})
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("port is start" + port);
})