import { useState } from "react";
import { Form, Input, Select, Button, Upload, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "./style.scss";
const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const KeyWordPage = () => {
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
            const res = await axios.post("/api/summary", values, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(res.data.keywords);
        } catch (error) {
            message.error("Có lỗi xảy ra khi tiến hành!");
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
            setResult(res.data.keywords);
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
                        Trích xuất từ khóa
                    </Title>
                    <Paragraph className="header_paragraph">
                        Công cụ trích xuất từ khóa là giải pháp tối ưu giúp bạn
                        nhanh chóng nhận diện các từ khóa quan trọng từ văn bản
                        nhập tay hoặc từ các tệp Word được tải lên.
                    </Paragraph>
                    <Paragraph className="header_paragraph">
                        Bằng cách sử dụng các thuật toán xử lý ngôn ngữ tự nhiên
                        tiên tiến, công cụ sẽ phân tích nội dung, xác định các
                        thuật ngữ, ý chính nổi bật, và sắp xếp chúng một cách rõ
                        ràng, dễ hiểu.
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
                                    "Vui lòng nhập nội dung cần trích xuất từ khóa!",
                            },
                        ]}
                    >
                        <TextArea
                            rows={10}
                            placeholder="Copy và dán văn bản cần trích xuất từ khóa tại đây"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Trích xuất từ khóa
                        </Button>
                    </Form.Item>
                </Form>

                {result && (
                    <div className="result-area">
                        <h3>Kết quả các từ khóa được trích xuất</h3>
                        <ul>
                            {result.map((keyword, index) => {
                                <li key={index}>{keyword}</li>;
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};
export default KeyWordPage;
