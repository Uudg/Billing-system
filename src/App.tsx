import { Outlet } from "react-router-dom";

const App = () => {

    return (
        <>
            <div className="view container">
                <Outlet/>
            </div>
        </>
    )

}

export default App;