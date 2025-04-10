import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
const HeaderComponent = () => {
    const location = useLocation();

    return (
        <>
            <div
                style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "25px",
                }}
            >
                Summary Text Web
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    background: "transparent",
                    fontSize: "20px",
                }}
            >
                <Menu.Item key="/">
                    <Link to="/">Summary Text</Link>
                </Menu.Item>
                <Menu.Item key="/keyword">
                    <Link to="/keyword">Keyword</Link>
                </Menu.Item>
                <Menu.Item key="/topic">
                    <Link to="/topic">Topic</Link>
                </Menu.Item>
            </Menu>
        </>
    );
};

export default HeaderComponent;
