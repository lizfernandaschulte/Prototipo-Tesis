CREATE TABLE users (
    user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    
    role VARCHAR(20) NOT NULL,
    
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(150) NOT NULL,

    CONSTRAINT chk_users_role
        CHECK (role IN ('ADMIN','MANAGER', 'CASHIER', 'WAITER'))
);