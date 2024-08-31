import express from "express";
import cors from 'cors'
import pool from "./db.js";
import bcrypt from 'bcryptjs'

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());


// Routes
// localStorage.setItem('login', 'false');
// Users
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPassword]);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json('User not found');
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json('Invalid password');
        }
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE id = $1",
            [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("DELETE FROM users WHERE id = $1", [
            id
        ]);
        res.json("User deleted");
    } catch (err) {
        console.error(err.message);
    }
});




// Transactions
app.get('/api/transactions', async (req, res) => {
    try {
        const allTransations = await pool.query('SELECT * FROM transactions');
        res.json(allTransations.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});
app.get('/api/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userTransactions = await pool.query('SELECT * FROM transactions WHERE user_id=$1', [id]);
        res.json(userTransactions.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.post('/api/transactions', async (req, res) => {
    try {
        const { user_id, description, amount } = req.body;
        console.log('Request Body:', req.body);
        console.log('User ID:', user_id);
        console.log('Description:', description);
        console.log('Amount:', amount);

        if (!user_id || !description || !amount) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newTransaction = await pool.query(
            `INSERT INTO transactions (user_id, description, amount) VALUES(${user_id}, ${description}, ${amount}) RETURNING *` 
        );
        console.log(newTransaction);
        return res.json(newTransaction.rows[0]);
    } catch (err) {
        console.log(err);
        return err;
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
