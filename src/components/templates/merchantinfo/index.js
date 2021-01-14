import React from "react";
import { QRCode, Modal, Button,Spin } from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";
import moment from "moment";


import {
    Content,
    ActionWrapper,
    LabelFieldsetStyle,
    DescFieldsetStyle,
    RowHolderStyle,
    Image,
    QRContainer,
    ButtonStyle,
    ActionContainer,
    SubContainer,
    InputStyle
} from "./styles";


export default ({
    loading,
    dataSource,
    singleDataSource,
    modalActive,
    handleModal,
    photoView,
    onQRCodeDownload,
    readShopLoading
}) => {
    const ActionButton = ButtonStyle(Button);

    const formItem = [
        [
            {
                type: "label",
                label: "Merchant ID:",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: singleDataSource.photoURL && "image",
                src: singleDataSource.photoURL,
                width: 100,
                height: 100,
                // onClick: imageModal.bind(this)
            }
        ],
        [
            {
                type: "label",
                label: "Shop Name:",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: "sampleeeeeeeeeee",
                FieldsetStyle: DescFieldsetStyle
            }
        ],

        // [
        //     {
        //         type: "label",
        //         label: "Address",
        //         FieldsetStyle: LabelFieldsetStyle
        //     },
        //     {
        //         type: "label",
        //         label:  singleDataSource.address.line1 + ", " +
        //                 singleDataSource.address.line2 + ", " +
        //                 singleDataSource.address.postcode + ", " +
        //                 singleDataSource.address.state + ", " +
        //                 singleDataSource.address.country,
        //         FieldsetStyle: DescFieldsetStyle
        //     }
        // ],

        [
            {
                type: "label",
                label: "Qr Code:",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "Qr",
                id: "QRCodeCanvas",
                value: `#`,
                size: 120,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
    ];

    if (readShopLoading) {
        return <Spin size="large" style={{ width: "100%" }} />;
    } else {
        return (
            <Content>
                <Form
                    formItem={formItem}

                    InputStyle={InputStyle}
                />
                {/* <QRContainer>
                    <QRCode
                        id={"QRCodeCanvas"}
                        value={`#`}
                        size={120}
                        includeMargin={true}
                        style={{ borderRadius: 10 }}
                    />
                </QRContainer> */}
                <SubContainer>
                    <ActionContainer>
                        <ActionButton
                            id="qrDownloadButton"
                            onClick={onQRCodeDownload.bind(this)}
                        >
                            Save QR Code
                                </ActionButton>
                    </ActionContainer>
                </SubContainer>


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
