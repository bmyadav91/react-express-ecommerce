import { useMemo, useState } from "react";

// context 
import { Helmet } from "react-helmet-async";

// hooks 
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
    const navigation = useNavigate();
    const [mode, setMode] = useState<"login" | "register">("login");

    const fields = useMemo(() => (
        (mode === "login" ? loginFields : registerFields)
    ), [mode]);

    const { loading, error, Login, Register } = useAuth();

    const handlesubmit = async (data: Record<string, string | number | boolean>) => {
        if (!data?.email || !data?.password) {
            return alert("Email and password required");
        }
        if (mode === "login") {
            const loginRes = await Login(
                data?.email as string,
                data?.password as string
            )
            if (loginRes) {
                navigation("/")
            }
        } else {
            const registerRes = await Register(
                data?.email as string,
                data?.password as string,
                data?.name as string
            )
            if (registerRes) {
                navigation("/")
            }
        }
    }

    return (
        <div className={`${styles.container} container`}>
            <Helmet>
                <title>{`Login/Sign up`}</title>
                <meta name="description" content={"auth"} />
            </Helmet>

            <FormUI
                fields={fields}
                onSubmit={(formData: Record<string, string | number | boolean>) => handlesubmit(formData)}
                isButtonDisabled={loading}
                isButtonProcessing={loading}
            />

            {error && (
                <p className="text-center text-danger">{error}</p>
            )}

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