import { useState } from "react";
import Login from "./components/Login";

function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {!user ? (
                <Login onLogin={handleLogin} />
            ) : (
                <div className="min-h-screen flex items-center justify-center px-4">

                    <div className="text-center">

                        <h1 className="text-3xl font-bold text-slate-800">
                            Welcome, {user.first_name}
                        </h1>

                        <p className="mt-3 text-slate-600">
                            Role:{" "}
                            <span className="font-semibold">
                                {user.role}
                            </span>
                        </p>

                        <button
                            onClick={handleLogout}
                            className="mt-6 rounded-lg bg-[#86BEDA] px-5 py-3 font-bold text-slate-800 transition hover:brightness-95"
                        >
                            Sign out
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default App;
