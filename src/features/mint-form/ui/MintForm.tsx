import { ImageFormItem } from "@/entities/form/ui/image-form-item/ImageFormItem";
import { Button, Form, Input } from "antd"
import { FC, useEffect, useState } from "react"
type TMintFormProps = {
    onSubmit: (values: any) => void;
    isSuccess: boolean;
    disabled?: boolean;
    loading: boolean;
}
export const MintForm: FC<TMintFormProps> = ({ onSubmit, disabled, loading, isSuccess }) => {
    const [form] = Form.useForm();
    const [isFormChanged, setIsFormChanged] = useState(false)
    const handleFormChange = () => {
        setIsFormChanged(true)
    }
    useEffect(() => {
        if (isSuccess) {
            form.resetFields()
        }
    }, [form, isSuccess])
    return (
        <Form
            form={form}
            onFinish={onSubmit}
            disabled={disabled}
            className="dark:text-white text-background"
        >
            <Form.Item label={'Name'} className="" name={'name'} >
                <Input placeholder={"Enter your NFT name"} disabled={false} required />
            </Form.Item>
            <Form.Item label={'Description'} className="" name={'description'} >
                <Input placeholder={"Enter your NFT name description"} disabled={false} required />
            </Form.Item>
            <ImageFormItem
                name="image"
                label="Image"
                handleFormChange={handleFormChange}
                isSuccess={isSuccess}
            />
            <Button htmlType="submit" type="primary" loading={loading} disabled={!isFormChanged}>Submit</Button>
        </Form>
    )
}