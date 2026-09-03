const bcrypt = require("bcrypt");
const pool = require("../src/config/database");

const createTestUser = async () => {
    try {
        const username = "admin";
        const firstName = "System";
        const lastName = "Administrator";
        const email = "admin@example.com";
        const password = "Admin123!";
        const role = "ADMIN";
        const phone = "3121234567";
        const address = "System Address";

        const passwordHash = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `
            INSERT INTO users (
                username,
                first_name,
                last_name,
                email,
                password_hash,
                role,
                phone,
                address
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING
                user_id,
                username,
                first_name,
                last_name,
                email,
                role,
                is_active,
                created_at;
            `,
            [
                username,
                firstName,
                lastName,
                email,
                passwordHash,
                role,
                phone,
                address
            ]
        );

        console.log("User created successfully:");
        console.log(result.rows[0]);

        console.log("\nTest credentials:");
        console.log("Username:", username);
        console.log("Password:", password);

    } catch (error) {
        console.error("Error creating test user:", error);
    } finally {
        await pool.end();
    }
};

createTestUser();