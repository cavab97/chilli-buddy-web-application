import React from "react";
import { QRCode, Button, ExcelFile, ExcelSheet, ExcelColumn, AntdIcon, Spin, Modal } from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";
import Table from "../../../../screens/antTable.style";
import moment from "moment";

import {
  Content,
  ActionContainer,
  QRContainer,
  SubContainer,
  FilterContainer,
  ButtonStyle,
  InputStyle,
  Label,
  DateRangePicker,
  submitFieldStyle,
  submitButtonStyle,
  errorStyle
} from "./styles";

const countriesList = require("assets/address/countries.json");
const statesList = require("assets/address/Malaysia/states.json");

export default ({
    userId,
    dataSource,
    loading,
    onQRCodeDownload,
    url,
    filterDate,
    onFilterDate,
    covid19Shop,
    errorReturn,
    modalActive,
    readShopLoading,
    onExportPDF,
    onModalControl,
    onShopChange,
    onShopSelectChange,
    onSubmitShop,
    submitShopLoading,
}) => {
    const ActionButton = ButtonStyle(Button);

    const malaysiaStates = statesList.map(state => {
        return { data: state, label: state };
      });

    const allCountry = countriesList.map(country => {
    return { data: country.country, label: country.country };
    });

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: "120px",
            render: (data) => {
                return moment(data).format("L");
            },
            sorter: (a, b) => {
              if (a.date < b.date) return -1;
              if (a.date > b.date) return 1;
              return 0;
            }
        },
        {
            title: "Time",
            dataIndex: "date",
            key: "date",
            width: "120px",
            render: (data) => {
                return moment(data).format("hh:mm a");
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "120px",
            sorter: (a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            }
        },
        /* {
            title: "IC",
            dataIndex: "identityNumber",
            key: "identityNumber",
            width: "120px",
            sorter: (a, b) => {
              if (a.identityNumber < b.identityNumber) return -1;
              if (a.identityNumber > b.identityNumber) return 1;
              return 0;
            }
        }, */
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "120px",
            sorter: (a, b) => {
              if (a.phoneNumber < b.phoneNumber) return -1;
              if (a.phoneNumber > b.phoneNumber) return 1;
              return 0;
            }
        },
        {
            title: "Temperature",
            dataIndex: "temperature",
            key: "temperature",
            width: "120px",
            sorter: (a, b) => {
              if (a.temperature < b.temperature) return -1;
              if (a.temperature > b.temperature) return 1;
              return 0;
            }
        },
    ];

    const formItem = [
        [
            {
                type: !covid19Shop.id && "title",
                title: "* Fill up shop detail to register QR Code."
            }
        ],
        [
            {
                type: "text",
                label: "Business Name",
                data: covid19Shop.businessName,
                onChange: onShopChange.bind(this, { key: "businessName"}),
                required: { back: true },
                //disabled: covid19Shop.id,
                InputStyle: errorReturn.businessName && errorStyle.inputStyle,
                iconRigth: errorReturn.businessName && <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
            }
        ],
        [
            {
                type: "errorlabel",
                label: errorReturn.businessName && "* " + errorReturn.businessName,
                FieldsetStyle: errorStyle.fieldsetStyle,
                LabelStyle: errorStyle.labelStyle,
                hide: errorReturn.businessName ? false : true
            }
        ],
        [
            {
                type: "text",
                label: "SSM Number",
                data: covid19Shop.ssmNumber,
                //disabled: covid19Shop.id,
                onChange: onShopChange.bind(this, { key: "ssmNumber"}),
                required: { back: true },
                InputStyle: errorReturn.ssmNumber && errorStyle.inputStyle,
                iconRigth: errorReturn.ssmNumber && <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
            }
        ],
        [
            {
                type: "errorlabel",
                label: errorReturn.ssmNumber && "* ssm number cannot be empty",
                FieldsetStyle: errorStyle.fieldsetStyle,
                LabelStyle: errorStyle.labelStyle,
                hide: errorReturn.ssmNumber ? false : true
            }
        ],
        [
            {
                type: "text",
                label: "Referral",
                data: covid19Shop.referral,
                //disabled: covid19Shop.id,
                onChange: onShopChange.bind(this, { key: "referral"}),
            }
        ],
        [
            {
                type: "text",
                label: "Address 1",
                data: covid19Shop.address.line1,
                //disabled: covid19Shop.id,
                onChange: onShopChange.bind(this, { key: "address", nestedKey: "line1"}),
            }
        ],
        [
            {
                type: "text",
                label: "Address 2",
                data: covid19Shop.address.line2,
                //disabled: covid19Shop.id,
                onChange: onShopChange.bind(this, { key: "address", nestedKey: "line2"}),
            }
        ],
        [
            {
                type: "text",
                label: "Postcode",
                data: covid19Shop.address.postcode,
                //disabled: covid19Shop.id,
                onChange: onShopChange.bind(this, { key: "address", nestedKey: "postcode"}),
                InputStyle: errorReturn.postcode && errorStyle.inputStyle,
                iconRigth: errorReturn.postcode && <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
            }
        ],
        [
            {
                type: "errorlabel",
                label: errorReturn.postcode && "* " + errorReturn.postcode,
                FieldsetStyle: errorStyle.fieldsetStyle,
                LabelStyle: errorStyle.labelStyle,
                hide: errorReturn.postcode ? false : true
            }
        ],
        [
            {
                type: "text",
                label: "City",
                data: covid19Shop.address.city,
                //disabled: covid19Shop.id,
                onChange: onShopChange.bind(this, { key: "address", nestedKey: "city"}),
            }
        ],
        [
            {
                type: "select",
                label: "State",
                data: covid19Shop.address.state,
                option: malaysiaStates,
                optionTitle: "label",
                optionValue: "data",
                showSearch: true,
                //disabled: covid19Shop.id,
                onChange: onShopSelectChange.bind(this, { key: "address", nestedKey: "state"}),
            }
        ],
        [
            {
                type: "select",
                label: "Country",
                data: covid19Shop.address.country,
                option: allCountry,
                optionTitle: "label",
                optionValue: "data",
                showSearch: true,
                //disabled: covid19Shop.id,
                onChange: onShopSelectChange.bind(this, { key: "address", nestedKey: "country"}),
            }
        ],
    ];

    if(readShopLoading){
        return <Spin size="large" style={{width: "100%"}} />;
    }
    else{
        return ( covid19Shop.id ? 
            (
                <Content>
                    <QRContainer>
                        <QRCode
                            id={"QRCodeCanvas"}
                            value={`https://${url}/${userId}/covid-19_Form`} 
                            size={120}
                            includeMargin={true}
                            style={{borderRadius: 10}}
                        />
                    </QRContainer>

                    <SubContainer>
                        <FilterContainer>
                            <Label>Date Filter :</Label>
                            <DateRangePicker
                                value={[filterDate.startDate, filterDate.endDate]}
                                onChange={onFilterDate.bind(this)}
                            />
                        </FilterContainer>

                        <ActionContainer>
                            <ActionButton onClick={onModalControl}>
                                Shop Detail
                            </ActionButton>

                            <ActionButton onClick={onExportPDF}>
                                Export PDF
                            </ActionButton>
                            {/* <ExcelFile element={<ActionButton>Export Excel</ActionButton>} filename={"Covid 19 Name List"}>
                                <ExcelSheet data={dataSource} name={"Covid 19 Name List"}>
                                    <ExcelColumn label="Date" value={(col => {
                                        return moment(col.date).format("L");
                                    })} />
                                    <ExcelColumn label="Time" value={(col => {
                                        return moment(col.date).format("hh:mm a");
                                    })} />
                                    <ExcelColumn label="Name" value="name" />
                                    <ExcelColumn label="IC" value="identityNumber" />
                                    <ExcelColumn label="Phone Number" value="phoneNumber" />
                                    <ExcelColumn label="Temperature" value="temperature" />
                                </ExcelSheet>
                            </ExcelFile> */}

                            <ActionButton
                                id="qrDownloadButton"
                                onClick={onQRCodeDownload.bind(this)}
                            >
                                Save QR Code
                            </ActionButton>
                        </ActionContainer>
                    </SubContainer>

                    <Table
                        rowKey="id"
                        columns={columns}
                        bordered={true}
                        dataSource={dataSource}
                        loading={loading}
                        pagination={{
                            defaultPageSize: 10,
                            hideOnSinglePage: true,
                            total: dataSource.length,
                            showTotal: (total, range) => {
                            return `Showing ${range[0]}-${range[1]} of ${
                                dataSource.length
                            } Results`;
                            },
                        }}
                    />

                    <Modal
                        title="Shop Detail"
                        visible={modalActive}
                        onCancel={onModalControl.bind(this, "close")}
                        okText="Submit"
                        onOk={onSubmitShop}
                        confirmLoading={submitShopLoading}
                        //footer={null}
                    >
                        <Form
                            formItem={formItem}
                            InputStyle={InputStyle}
                        />
                    </Modal>
                </Content>
            )
                :
            (
                <Content>
                    <Form
                        formItem={formItem}
                        onSubmit={onSubmitShop}
                        onSubmitLoading={submitShopLoading}
                        submitFieldStyle={submitFieldStyle}
                        submitButtonStyle={submitButtonStyle}
                    />
                </Content>
            )
        );
    }
};
