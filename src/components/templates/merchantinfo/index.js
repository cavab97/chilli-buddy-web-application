import React from "react";
import { QRCode, Modal, Button,Spin } from "marslab-library-react/components/atoms";
import {
    Content,
    LabelFieldsetStyle,
    DescFieldsetStyle,
    Row,
    RowHolderStyle,
    Image,
    QRContainer,
    MerchantInfoContent,
    ButtonStyle,
    ActionContainer,
    SubContainer,
    InputStyle,
    TextStyle,
    RowStyle
} from "./styles";

function rowContent({label, content, style}) {
    return (
        <MerchantInfoContent>
            <MerchantInfoContent style={RowStyle}>
                <Row style={style}>
                    <b>{label}</b>
                </Row>
            </MerchantInfoContent>
            {label !== "QR Code" &&
                <MerchantInfoContent>
                    <Row style={style}>
                        {content}
                    </Row>
                </MerchantInfoContent>
            }
        </MerchantInfoContent>
    )
}


export default ({
    loading,
    singleDataSource,
    modalActive,
    handleModal,
    photoView,
    onQRCodeDownload,
    merchant,
}) => {
    const ActionButton = ButtonStyle(Button);
    const merchantName = merchant ? merchant.businessName : null

    if (loading) {
        return <Spin size="large" style={{ width: "100%" }} />;
    } else if (loading === false && merchantName === null) {
        return (
            <Content>
                No Merchant Information Found
            </Content>
        )
    } else {
        return (
            <Content>
                {rowContent({
                    label: "Business Name", 
                    style: TextStyle, 
                    content: merchant ? merchant.businessName : ''
                    })
                }

                {rowContent({
                    label: "QR Code", 
                    style: TextStyle, 
                    })
                }

                <QRContainer style={{ paddingLeft: 0 }}>
                    <QRCode
                        id="QRCodeCanvas"
                        value={"chillbuddy:"+merchant.id+merchant.businessName}
                        size={150}
                        //includeMargin={true}
                        style={{ marginLeft: 0, paddingLeft: 0,  }}
                    />
                </QRContainer>

                <ActionButton
                    id="qrDownloadButton"
                    onClick={onQRCodeDownload.bind(this)} 
                    style={{ marginLeft: 0, marginTop: 0 }}
                >
                    Save QR Code
                </ActionButton>
 
                <Modal
                    visible={photoView}
                    // onCancel={imageModal.bind(this)}
                    footer={null}
                >
                    <Image
                        style={{ width: 450, height: 450 }}
                        src={singleDataSource.photoURL}
                    />
                </Modal>

            </Content>
        )
    }

    ;
};
