const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authenticateToken = require("./middleware/auth.middleware");
const authRoutes = require("./routes/auth.routes");
const pool = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "You have access to this protected route",
        user: req.user
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "Restaurant System API is running"
    });
});

app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            status: "OK",
            database: "Connected",
            server_time: result.rows[0].now
        });
    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            status: "ERROR",
            database: "Disconnected"
        });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                user_id,
                username,
                first_name,
                last_name,
                email,
                role,
                is_active,
                created_at,
                phone,
                address
            FROM users
            ORDER BY user_id;
        `);

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);

        res.status(500).json({
            message: "Error fetching users"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

