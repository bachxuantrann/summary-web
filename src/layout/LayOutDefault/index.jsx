import { Layout } from "antd";
import HeaderComponent from "../../components/Header";
import FooterComponent from "../../components/Footer";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const LayOutDefault = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    padding: "0 24px",
                    background: "#001529",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <HeaderComponent />
            </Header>

            <Content
                style={{
                    padding: "24px", // padding đều 4 phía
                    width: "100%", // full width trình duyệt
                }}
            >
                <div
                    style={{
                        width: "70%",
                        margin: "0 auto", // Canh giữa khi màn to
                        background: "transparent",
                        // f0f2f5
                        padding: "30px",
                        borderRadius: "10px",
                        minHeight: "calc(100vh - 160px)",
                    }}
                >
                    <Outlet />
                </div>
            </Content>

            <Footer
                style={{
                    textAlign: "center",
                    background: "#fff",
                    padding: "12px 0px",
                }}
            >
                <FooterComponent />
            </Footer>
        </Layout>
    );
};
export default LayOutDefault;
