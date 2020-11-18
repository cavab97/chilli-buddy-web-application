import React from "react";
import { AntdIcon, Modal, Descriptions, QRCode, Button } from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";
import moment from "moment";

import {
  formHolderStyle,
  inputStyle,
  titleFieldsetStyle,
  labelStyle,
  descLabelStyle,
  submitFieldStyle,
  submitButtonStyle,
  errorStyle,
  InfoContainer,
  Label,
  Link
} from "./styles";


export default ({
    loading,
    covid19Shop,
    submitLoading,
    logo,
    errorReturn,
    dataSource,
    onRecordChange,
    onSubmit,
    onBack,
    submitSuccessControl
}) => {
    const formItem = [
        [
            {
                type: "image",
                src: logo,
                width: 80,
                height: 80,
                FieldsetStyle: titleFieldsetStyle
            }
        ],
        [
            {
                type: "title",
                title: "Covid 19 Self Declaration Form",
                FieldsetStyle: titleFieldsetStyle
            }
        ],
        [
            {
                type: covid19Shop.id && "title",
                title: "Shop: "+covid19Shop.businessName,
                FieldsetStyle: titleFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Name",
                required: { back: true },
            }
        ],
        [
            {
                type: "input",
                placeholder: "Name",
                data: dataSource.name,
                onChange: onRecordChange.bind(this, { key: "name"}),
                InputStyle: errorReturn.name && errorStyle.inputStyle,
                iconRigth: errorReturn.name && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
            }
        ],
        [
            {
                type: "errorlabel",
                label: errorReturn.name && "* " + errorReturn.name,
                FieldsetStyle: errorStyle.fieldsetStyle,
                LabelStyle: errorStyle.labelStyle,
                disableSpace: true,
                hide: errorReturn.name ? false : true
            }
        ],
        /* [
            {
                type: "label",
                label: "IC",
                required: { back: true },
            }
        ],
        [
            {
                type: "input",
                placeholder: "000000-00-0000",
                data: dataSource.identityNumber,
                onChange: onRecordChange.bind(this, { key: "identityNumber"}),
                InputStyle: errorReturn.identityNumber && errorStyle.inputStyle,
                iconRigth: errorReturn.identityNumber && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
            }
        ],
        [
            {
                type: "errorlabel",
                label: errorReturn.identityNumber && "* ic cannot be empty",
                FieldsetStyle: errorStyle.fieldsetStyle,
                LabelStyle: errorStyle.labelStyle,
                disableSpace: true,
                hide: errorReturn.identityNumber ? false : true
            }
        ], */
        [
            {
                type: "label",
                label: "Phone Number",
                required: { back: true },
            }
        ],
        [
            {
                type: "input",
                placeholder: "000 0000000",
                data: dataSource.phoneNumber,
                onChange: onRecordChange.bind(this, { key: "phoneNumber"}),
                InputStyle: errorReturn.phoneNumber && errorStyle.inputStyle,
                iconRigth: errorReturn.phoneNumber && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
            }
        ],
        [
            {
                type: "errorlabel",
                label: errorReturn.phoneNumber && "* " + errorReturn.phoneNumber,
                FieldsetStyle: errorStyle.fieldsetStyle,
                LabelStyle: errorStyle.labelStyle,
                disableSpace: true,
                hide: errorReturn.phoneNumber ? false : true
            }
        ],
        [
            {
                type: "label",
                label: "Temparature",
                required: { back: true},
            }
        ],
        [
            {
                type: "input",
                placeholder: "Temparature",
                data: dataSource.temperature,
                onChange: onRecordChange.bind(this, { key: "temperature"}),
                InputStyle: errorReturn.temperature && errorStyle.inputStyle,
                iconRigth: errorReturn.temperature && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
            }
        ],
        [
            {
                type: "errorlabel",
                label: errorReturn.temperature && "* " + errorReturn.temperature,
                FieldsetStyle: errorStyle.fieldsetStyle,
                LabelStyle: errorStyle.labelStyle,
                disableSpace: true,
                hide: errorReturn.temperature ? false : true
            }
        ],
    ];

    const submitNotice = [
        [
            {
                type: "title",
                title: " Receipt Self Declaration Form",
                FieldsetStyle: titleFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Thank you, Receipt will submit to merchant."
            }
        ],
        [
            {
                type: "label",
                label: "This receipt are use for health verification."
            }
        ],
        [
            {
                type: "horizontalLine"
            }
        ],
        [
            {
                type: covid19Shop.id && "title",
                title: "Shop: "+covid19Shop.businessName,
                FieldsetStyle: titleFieldsetStyle
            }
        ],
        [
            {
                type: "title",
                title: "Receipt content :"
            }
        ],
        [
            {
                type: "label",
                label: "Date: ",
                LabelStyle: descLabelStyle
            },
            {
                type: "label",
                label: moment(new Date()).format("hh:mm a L"), 
            }
        ],
        [
            {
                type: "label",
                label: "Name: ",
                LabelStyle: descLabelStyle
            },
            {
                type: "label",
                label: dataSource.name, 
            }
        ],
        [
            {
                type: "label",
                label: "Phone Number: ",
                LabelStyle: descLabelStyle
            },
            {
                type: "label",
                label: dataSource.phoneNumber, 
            }
        ],
        [
            {
                type: "label",
                label: "Temperature: ",
                LabelStyle: descLabelStyle
            },
            {
                type: "label",
                label: dataSource.temperature, 
            }
        ],
    ];

    return (
        <Form
            loading={loading}
            formItem={submitSuccessControl ? submitNotice : formItem}
            FormHolderStyle={formHolderStyle}
            InputStyle={inputStyle}
            onSubmit={submitSuccessControl ? onBack : onSubmit}
            onSubmitLoading={submitLoading}
            submitFieldStyle={submitFieldStyle}
            submitButtonStyle={submitButtonStyle}
            LabelStyle={labelStyle}
            submitButtonText={submitSuccessControl ? "Back" : "Submit"}
            info={
                <InfoContainer>
                    <Label>Power By gogogain</Label>
                    <Link href={"https://gogogain.com/"}>https://gogogain.com/</Link>
                </InfoContainer>
            }
        />
    );
};
