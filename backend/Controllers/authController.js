import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/db.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedpassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `
            INSERT INTO users(username,email,password)
            VALUES($1,$2,$3)
            RETURNING id,username,email
            `, [username, email, hashedpassword]
        );
        res.json({
            message: "user registered!",
            user: result.rows[0]

        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Registration failed",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );
        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Login failed",
        });
    }
}
export const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ message: "logout successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "logout failed!" })
    }
}
export const getCurrentUser = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT id, username, email
            FROM users
            WHERE id = $1
            `,
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(result.rows[0]);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Failed to fetch user"
        });

    }

};