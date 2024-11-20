import { Outlet } from "react-router-dom";


const LayoutLogin = () => {
    return (
        <div className="layout-login">
            {/* <div className="layout-border">
            </div> */}
            <div className="layout-content">
                <Outlet/>
            </div>
            {/* <div className="layout-border">
            </div> */}
        </div>
    )
}

export default LayoutLogin;