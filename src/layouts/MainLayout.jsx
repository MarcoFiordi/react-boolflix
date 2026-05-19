import { Outlet } from "react-router";
import Footer from "../components/Footer";

function MainLayout() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;