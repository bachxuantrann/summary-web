import { Menu } from "antd";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <Menu theme="dark" mode="inline">
            <Menu.Item key="text">
                <Link to="/">Summary Text</Link>
            </Menu.Item>
            <Menu.Item key="keyword">
                <Link to="/keyword">Keyword</Link>
            </Menu.Item>
            <Menu.Item key="topic">
                <Link to="/topic">Topic</Link>
            </Menu.Item>
        </Menu>
    );
};

export default SideBar;
