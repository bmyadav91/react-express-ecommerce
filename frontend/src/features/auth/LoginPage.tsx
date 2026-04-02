import { useMemo, useState } from "react";

// styles 
import styles from "./styles/login.module.css"

// types 
import type { formField } from "../../types/formField";

// components 
import { FormUI } from "../../shared/ui/Form";


const loginFields: formField[] = [
    {
        name: "email",
        type: "text",
        label: "Email",
        placeHolder: "Enter your email ID",
    },
    {
        name: "password",
        type: "password",
        label: "Password",
        placeHolder: "Enter your password",
    },
];

const registerFields: formField[] = [
    {
        name: "name",
        type: "text",
        label: "Name",
        placeHolder: "Enter your name",
    },
    ...loginFields,
];


const LoginPage = () => {
    console.log("Login page re rendered");
    const [mode, setMode] = useState<"login" | "register">("login");

    const fields = useMemo(() => (
        (mode === "login" ? loginFields : registerFields)
    ), [mode])

    const handlesubmit = (data: Record<string, string | number | boolean>) => {
        if (!data?.email || !data?.password) {
            return alert("Email and password required");
        }
        if (mode === "login") {
            console.log("login data => ", data)
        } else {
            if (!data?.name) {
                return alert("Name is required");
            }
            console.log("register data => ", data)
        }
    }

    return (
        <div className={`${styles.container} container`}>
            <FormUI
                fields={fields}
                onSubmit={(formData: Record<string, string | number | boolean>) => handlesubmit(formData)}
            />

            <p style={{ marginTop: "10px", fontSize: ".9rem", color: "#444" }}>
                {mode === "login" ? (
                    <>
                        Don't have an account {" "}
                        <span style={{ cursor: "pointer", color: "blue" }} onClick={() => setMode("register")}>Register</span>
                    </>
                ) : (
                    <>
                        Already have an account? {" "}
                        <span style={{ cursor: "pointer", color: "blue" }} onClick={() => setMode("login")}>Login</span>
                    </>
                )}
            </p>
        </div>
    )
}

export default LoginPage;