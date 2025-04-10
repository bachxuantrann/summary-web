import { useState } from "react";
import { Form, Input, Select, Button, Upload, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "./style.scss";
const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const SummaryText = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const handleSummarize = async (values) => {
        if (!values.text || !values.text.trim()) {
            message.warning("Vui lòng nhập nội dung!");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post("/api/summary", values);
            setResult(res.data.summary);
        } catch (error) {
            message.error("Có lỗi xảy ra khi tóm tắt!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const beforeUpload = (file) => {
        const isDocx =
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        const isDocxExtension = file.name.slice(-5).toLowerCase() === ".docx";

        if (!isDocx || !isDocxExtension) {
            message.error("Chỉ cho phép upload file Word (.docx)!");
            return false; // Ngăn upload
        }
        return true;
    };
    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            setLoading(true);
            const res = await axios.post("/api/summary-docx", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(res.data.summary);
        } catch (error) {
            message.error("Có lỗi xảy ra khi upload file!");
            console.log(error);
        } finally {
            setLoading(false);
        }
        return false; // Ngăn upload tự động
    };
    return (
        <>
            <div className="summary-tool">
                <header className="header">
                    <Title className="header_title" level={2}>
                        Tóm tắt văn bản
                    </Title>
                    <Paragraph className="header_paragraph">
                        Công cụ tóm tắt văn bản giúp cô đọng, tổng hợp ý chính
                        của bài việt hoặc bài tiểu luận, tài liệu 1 cách nhanh
                        chóng và hiệu quả.
                    </Paragraph>
                    <Paragraph className="header_paragraph">
                        Công cụ tóm tắt hỗ trợ hai ngôn ngữ chính là Tiếng Anh
                        và Tiếng Việt.
                    </Paragraph>
                </header>
                <Form form={form} layout="vertical" onFinish={handleSummarize}>
                    <Form.Item>
                        <Upload
                            beforeUpload={beforeUpload}
                            customRequest={async ({
                                file,
                                onSuccess,
                                onError,
                            }) => {
                                try {
                                    await handleUpload(file);
                                    onSuccess("ok");
                                } catch (err) {
                                    onError(err);
                                }
                            }}
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload Docx
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Nội dung"
                        name="text"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập nội dung cần tóm tắt!",
                            },
                        ]}
                    >
                        <TextArea
                            rows={10}
                            placeholder="Copy và dán văn bản cần tóm tắt vào ô này"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Tóm Tắt
                        </Button>
                    </Form.Item>
                </Form>

                {result && (
                    <div className="result-area">
                        <h3>Kết quả tóm tắt</h3>
                        <p>{result}</p>
                    </div>
                )}
            </div>
        </>
    );
};
export default SummaryText;
