import {
  Form,
  Select,
  Input,
  Button,
  Upload,
  Rate,
  notification,
  Card,
  Modal
} from 'antd';
import { useWeb3Contract } from "hooks/useWeb3Contract";
// import abi from "contracts/CreatNFT.json";
import abi from "contracts/ToTfun.json";
import { getCollectionsByChain } from "helpers/collections";

import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useMoralisFile, useNativeBalance } from "react-moralis";
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'game/hooks'
import { openCreatNft } from 'stores/CreatNFTStore'
import { useMoralisDapp } from "MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "helpers/networks";



// import 'antd/dist/antd.variable.min.css';
import { useIPFS } from 'hooks/useIPFS';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};

const normFile = (e) => {
  console.log('Upload event:', e);
  return e

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};


const styles = {
  card: {
    width: "430px",
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    fontSize: "16px",
    fontWeight: "500",
    height: "400px"
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
  const { chainId,  } =
    useMoralisDapp();
  const contractAddress = getCollectionsByChain(chainId)?.[0]?.nftAddrs

  const { saveFile, moralisFile, isUploading, error } = useMoralisFile();
  const [metaData, setMetaData] = useState()
  const [metadataURI, setMetadataURI] = useState()
  const dispatch = useAppDispatch()
  const [canCreat, setCanCreat] = useState(false)
  // const {  getBalances, } = useNativeBalance();



  const {
    runContractFunction,
    contractResponse,
    isLoading,
    isRunning,
    error: runContractFunctionErr
  } = useWeb3Contract({
    abi,
    functionName: "mintToken",
    contractAddress: contractAddress,
    params: {
      uri: metadataURI,
    },
  });

  const { resolveLink } = useIPFS()

  useEffect(() => {

    if (!isUploading && moralisFile && canCreat && !metaData && !metadataURI) {
      console.log('image', moralisFile)
      const { name, description, rate } = form.getFieldsValue()
      // console.log(moralisFile.ipfs(), moralisFile)
      const newMetaData = {
        "name": name,
        "description": description,
        "rate": rate,
        "image": resolveLink(moralisFile.ipfs())
      }

      setMetaData(newMetaData)
      saveFile("metadata.json", { base64: btoa(unescape(encodeURIComponent(JSON.stringify(newMetaData)))) }, { saveIPFS: true });
    }


    if (error) {
      console.log(error, 'upload error')
    }
  }, [moralisFile, isUploading, error, form, saveFile, resolveLink, canCreat, metaData, metadataURI]);


  useEffect(() => {
    if (!isUploading && moralisFile && canCreat && metaData && !metadataURI) {
      console.log('url', moralisFile)
      setMetadataURI(resolveLink(moralisFile.ipfs()))
    }
  }, [isUploading, canCreat, moralisFile, resolveLink, metaData, metadataURI]);

  useEffect(() => {
    if (metadataURI && canCreat) {
      console.log(metadataURI)
      runContractFunction()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadataURI, canCreat]);

  useEffect(() => {
    if (!isLoading && !isRunning && contractResponse) {
      // getBalances()
      notification.open({
        placement: "topRight",
        message: "Creat NFT Success",
        description: (
          <a target="_blank" href={`${getExplorer(chainId)}tx/${contractResponse.transactionHash}`} rel="noreferrer"  >{contractResponse.transactionHash}</a>
        ),
      });
     
      setCanCreat(false)
      setMetaData()
      setMetadataURI()
      dispatch(openCreatNft(false))
    }
    if (runContractFunctionErr) {
      setCanCreat(false)
      setMetaData()
      setMetadataURI()
      failPurchase()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractResponse, dispatch, isLoading, isRunning, runContractFunctionErr]);

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const { name, upload, } = values

    await saveFile(name, upload.file, { saveIPFS: true })
    setMetaData()
    setMetadataURI()
    setCanCreat(true)
  };
  const failPurchase = () => {
    let secondsToGo = 3;
    const modal = Modal.error({
      title: "Error!",
      content: `Creat NFT Error`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }


  const disable = !!(isUploading || isLoading || isRunning)


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
        <Form.Item name="name" label="Name" rules={[{ required: true, }, { pattern: new RegExp(/^[0-9a-zA-Z_\s]+$/g), message: 'invalid string!' }]}>
          <Input disabled={disable} />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input disabled={disable} />
        </Form.Item>
        <Form.Item name="rate" label="Rate" rules={[{ required: true }]}>
          <Rate disabled={disable} allowHalf />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="upload"
          label="Upload"
          valuePropName="file"
        // valuePropName="fileList"
        // getValueFromEvent={normFile}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture"
            disabled={disable}
            maxCount={1}
            multiple={false}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 8,
          }}
        >
          <Button loading={isUploading || isLoading || isRunning} type="primary" htmlType="submit">
            Creat NFT
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreatNFT  