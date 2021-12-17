import {
  Form,
  Select,
  Input,
  Button,
  Upload,
  Rate,
  notification,
  Card
} from 'antd';
import { useWeb3Contract } from "hooks/useWeb3Contract";
import abi from "contracts/CreatNFT.json";

import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useMoralisFile } from "react-moralis";
import { useEffect, useState } from 'react';

import 'antd/dist/antd.variable.min.css';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const contractAddress = "0xEc21E81117BD09Eb3eE2f6d7C2aca80f017eb7CF"

const styles = {
  card: {
    width: "430px",
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    fontSize: "16px",
    fontWeight: "500",
  },
  header: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    outline: "none",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textverflow: "ellipsis",
    appearance: "textfield",
    color: "#041836",
    fontWeight: "700",
    border: "none",
    backgroundColor: "transparent",
  },
  select: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
  },
  textWrapper: { maxWidth: "80px", width: "100%" },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexDirection: "row",
  },
};
const CreatNFT = () => {
  const [form] = Form.useForm();

  const { saveFile, moralisFile, isUploading, error } = useMoralisFile();
  const [metaData, setMetaData] = useState()
  const [metadataURI, setMetadataURI] = useState()


  const {
    runContractFunction,
    contractResponse,
    isLoading,
    isRunning,
  } = useWeb3Contract({
    abi,
    functionName: "mintToken",
    contractAddress: contractAddress,
    params: {
      tokenURI: metadataURI,
    },
  });



  useEffect(() => {
    if (!metaData) {
      if (!isUploading && moralisFile) {
        const { name, description, rate } = form.getFieldsValue()
        const newMetaData = {
          "name": name,
          "description": description,
          "rate": rate,
          "image": moralisFile.ipfs()
        }

        setMetaData(newMetaData)
        saveFile("metadata.json", { base64: btoa(unescape(encodeURIComponent(JSON.stringify(newMetaData)))) }, { saveIPFS: true });
      }
    } else {
      if (!isUploading && moralisFile) {
        setMetadataURI(moralisFile.ipfs())
        // runContractFunction()

      }
    }

    if (error) {
      console.log(error, 'upload error')
    }

  }, [moralisFile, isUploading, error, form, metaData, saveFile, ]);

  useEffect(() => {
    if (metadataURI){
      console.log(metadataURI)
      runContractFunction()
    }
   
  }, [metadataURI, runContractFunction]);

  useEffect(() => {
    if (!isLoading && !isRunning && contractResponse) {
      notification.open({
        placement: "bottomRight",
        message: "🔊 New Transaction",
        description: (
          <a target="_blank" href={`https://testnet.bscscan.com/tx/${contractResponse.transactionHash}`} rel="noreferrer"  >{contractResponse.transactionHash}</a>
        ),
      });
    }
  }, [contractResponse, isLoading, isRunning]);

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const { name, upload, } = values
    await saveFile(name, upload.file, { saveIPFS: true })

  };




  return (
    <Card style={styles.card}>
     
      <Form
        form={form}
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          rate: 4,
        }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="rate" label="Rate" rules={[{ required: true }]}>
          <Rate allowHalf />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="upload"
          label="Upload"
          // valuePropName="fileList"
        >
          <Upload
            beforeUpload={() => false}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button loading={isUploading||isLoading||isRunning} type="primary" htmlType="submit">
            Creat NFT
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreatNFT  