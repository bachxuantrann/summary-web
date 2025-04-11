import { useState } from "react";
import { Form, Input, Select, Button, Upload, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "./style.scss";
const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const TopicPage = () => {
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
            const res = await axios.post(
                "http://127.0.0.1:8000/summarize",
                values,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setResult(res.data.topics);
        } catch (error) {
            message.error("Có lỗi xảy ra khi trích xuất chủ đề!");
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
            const res = await axios.post(
                "http://127.0.0.1:8000/summarize",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setResult(res.data.topics);
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
                        Trích xuất chủ đề
                    </Title>
                    <Paragraph className="header_paragraph">
                        Công cụ trích xuất chủ đề là một giải pháp thông minh hỗ
                        trợ người dùng nhanh chóng xác định và tổng hợp nội dung
                        chính mà một đoạn văn bản muốn truyền tải.
                    </Paragraph>
                    <Paragraph className="header_paragraph">
                        Sử dụng các thuật toán xử lý ngôn ngữ tự nhiên, công cụ
                        này có khả năng phân tích ngữ cảnh, tìm ra các chủ đề
                        cốt lõi và trình bày chúng dưới dạng khái quát, rõ ràng
                        và dễ hiểu.
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
                                message:
                                    "Vui lòng nhập nội dung cần trích xuất!",
                            },
                        ]}
                    >
                        <TextArea
                            rows={10}
                            placeholder="Copy và dán văn bản cần trích xuất vào ô này"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Trích xuất chủ đề
                        </Button>
                    </Form.Item>
                </Form>

                {result && (
                    <div className="result-area">
                        <h3>Kết quả các chủ đề trích xuất </h3>
                        <ul>
                            {result.map((topic) => (
                                <li>{topic.label}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};
export default TopicPage;
