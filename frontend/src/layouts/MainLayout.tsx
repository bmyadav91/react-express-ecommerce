import { Outlet } from "react-router-dom";
import { Header } from "../shared/components/Header/Header";

export const MainLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};