const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const users = require('./MOCK_DATA.json')

const app = express()

const port = 8000

app.use(express.urlencoded({ extended: false }))


// Schema 
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    job_title: {
        type: String
    }
})

const user = mongoose.model("user", userSchema)

// connection
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1").then(() => {
    console.log("mongoDb connected");
}).catch((err) => {
    console.log(err.message);
})

app.get('/users', (req, res) => {
    const html = `<ul>${users.map(user => `<li>${user.first_name}</li>`).join("")}</ul>`
    res.send(html)
})

// Routes
app.get('/api/users', (req, res) => {
    return res.json(users)
})

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const User = users.find(user => user.id === id)
    return res.json(User)
})
    .patch((req, res) => {
        const id = Number(req.params.id);
        const { first_name, last_name, email, gender, job_title } = req.body;

        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (first_name) users[userIndex].first_name = first_name;
        if (last_name) users[userIndex].last_name = last_name;
        if (email) users[userIndex].email = email;
        if (gender) users[userIndex].gender = gender;
        if (job_title) users[userIndex].job_title = job_title;

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to update user data' });
            }
            return res.json({ status: 'Success', user: users[userIndex] });
        });
    })
    .delete((req, res) => {
        const id = Number(req.params.id);

        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        users.splice(userIndex, 1);

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to delete user' });
            }
            return res.json({ status: 'Success', message: 'User deleted successfully' });
        });
    })

app.post('/api/users', (req, res) => {
    // TODO create new user
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, result) => {
        return res.json({ status: "Success", id: users.length })
    })
})



app.listen(port, () => {
    console.log(`Server started at the port ${port}`);
})
