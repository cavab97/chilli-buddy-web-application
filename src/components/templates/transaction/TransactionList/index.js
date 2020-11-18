import React from "react";
import { Popconfirm, Modal, Descriptions } from "marslab-library-react/components/atoms";
import Table from "../../../../screens/antTable.style";
import { Form } from "marslab-library-react/components/organisms/Form";
import moment from "moment";

import {
  Content,
  ActionWrapper,
  ButtonFieldsetStyle,
  LabelFieldsetStyle,
  DescFieldsetStyle,
  UrlFieldsetStyle,
  RowHolderStyle,
  Image,
  TableStyle
} from "./styles";


export default ({
    params,
    loading,
    submitLoading,
    dataSource,
    transaction,
    modalActive,
    handleModal,
    photoView,
    imageModal,
    onApproved,
    onRejected,
    onCopyUrl
}) => {
    let Tables = Table;

    if(params.routeTicketID){
        Tables = TableStyle(Table);
    }
    

    dataSource.map((data) => {
        data["status"] = data.approved.by ? "Approved" 
                        : (data.rejected.by ? "Rejected" 
                        : "Pending" );
    });

    const formItem = [
        [
            {
                type: "label",
                label: "Transaction ID",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.id,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Date Create",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: moment(transaction.created.at).format("L"),
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Time Create",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: moment(transaction.created.at).format("hh:mm a"),
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Shop",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.shop.d.title,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "User Name",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.user.displayName,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "User Phone",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.routeTicket. id && transaction.routeTicket.user.phoneNumber,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Route",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.route.title,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Mission",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.mission.d.title,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Route Ticket ID",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.routeTicket.id,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Payment ID",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.payment.paymentId,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Payment Type",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.payment.paymentType,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Resit ID",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.payment.receiptId,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Minimum Spend",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: "RM " + transaction.mission.d.minSpend,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Amount",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: "RM " + transaction.payment.amount,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Resit Url",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: transaction.payment.receiptUrl,
                FieldsetStyle: UrlFieldsetStyle,
                id: "receiptUrl",
            },
            {
                type: transaction.payment.receiptUrl && "button",
                label: "Copy",
                FieldsetStyle: ButtonFieldsetStyle,
                onClick: onCopyUrl.bind(this, "receiptUrl")
            }
        ],
        [
            {
                type: "label",
                label: "Resit Photo Url",
                FieldsetStyle: LabelFieldsetStyle

            },
            {
                type: "label",
                label: transaction.payment.receiptPhotoUrl,
                FieldsetStyle: UrlFieldsetStyle,
                id: "receiptPhotoUrl",
            },
            {
                type: transaction.payment.receiptPhotoUrl && "button",
                label: "Copy",
                FieldsetStyle: ButtonFieldsetStyle,
                onClick: onCopyUrl.bind(this, "receiptPhotoUrl")
            }
        ],
        [
            {
                type: "label",
                label: "Resit Photo",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: transaction.payment.receiptPhotoUrl && "image",
                src: transaction.payment.receiptPhotoUrl,
                width: 100,
                height: 100,
                onClick: imageModal.bind(this)
            }
        ],
        [
            {
                type: "button",
                label: "Approve",
                FieldsetStyle: ButtonFieldsetStyle,
                onClick: onApproved.bind(this, transaction), 
                hide: transaction.approved.by || transaction.rejected.by,
                loading: submitLoading,
            },
            {
                type: "button",
                label: "Reject",
                FieldsetStyle: ButtonFieldsetStyle,
                onClick: onRejected.bind(this, transaction),
                hide: transaction.approved.by || transaction.rejected.by,
                loading: submitLoading,
            },
            {
                type: "button",
                label: "Cancel",
                FieldsetStyle: ButtonFieldsetStyle,
                onClick: handleModal.bind(this, null)
            },
        ],
    ];


    const columns = [
        {
            title: "Transaction ID",
            dataIndex: "id",
            key: "id",
            width: "120px",
            sorter: (a, b) => {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            }
        },
        {
            title: "Date Create",
            dataIndex: ["created", "at"],
            key: "dateCreate",
            width: "120px",
            render: data => {
                return moment(data).format("hh:mm a L");
            },
            sorter: (a, b) => {
              if (a.created.at < b.created.at) return -1;
              if (a.created.at > b.created.at) return 1;
              return 0;
            }
        },
        {
            title: "Shop",
            dataIndex: ["shop", "d", "title"],
            key: "shopTitle",
            width: "120px",
            sorter: (a, b) => {
              if (a.shop.d.title < b.shop.d.title) return -1;
              if (a.shop.d.title > b.shop.d.title) return 1;
              return 0;
            }
        },
        {
            title: "User",
            dataIndex: ["user", "displayName"],
            key: "displayName",
            width: "120px",
            sorter: (a, b) => {
              if (a.user.displayName < b.user.displayName) return -1;
              if (a.user.displayName > b.user.displayName) return 1;
              return 0;
            }
        },
        {
            title: "Route",
            dataIndex: ["route", "title"],
            key: "routeTitle",
            width: "120px",
            sorter: (a, b) => {
              if (a.route.title < b.route.title) return -1;
              if (a.route.title > b.route.title) return 1;
              return 0;
            }
        },
        {
            title: "Mission",
            dataIndex: ["mission", "d", "title"],
            key: "missionTitle",
            width: "120px",
            sorter: (a, b) => {
              if (a.mission.d.title < b.mission.d.title) return -1;
              if (a.mission.d.title > b.mission.d.title) return 1;
              return 0;
            }
        },
        {
          title: "Payment ID",
          dataIndex: ["payment", "paymentId"],
          key: "paymentId",
          width: "120px",
          sorter: (a, b) => {
            if (a.payment.paymentId < b.payment.paymentId) return -1;
            if (a.payment.paymentId > b.payment.paymentId) return 1;
            return 0;
          }
        },

        {
            title: "Amount",
            dataIndex: ["payment", "amount"],
            key: "payment",
            width: "120px",
            sorter: (a, b) => {
              if (a.payment.amount < b.payment.amount) return -1;
              if (a.payment.amount > b.payment.amount) return 1;
              return 0;
            }
        },
        {
          title: "Payment Type",
          dataIndex: ["payment", "paymentType"],
          key: "paymentType",
          width: "120px",
          sorter: (a, b) => {
            if (a.payment.paymentType < b.payment.paymentType) return -1;
            if (a.payment.paymentType > b.payment.paymentType) return 1;
            return 0;
          }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "120px",
            sorter: (a, b) => {
              if (a.status < b.status) return -1;
              if (a.status > b.status) return 1;
              return 0;
            }
        },
        {
            title: 'Actions',
            key: 'action',
            width: '30px',
            className: 'noWrapCell',
            render: (text, row) => {
              return (
                <ActionWrapper>
                  <a onClick={handleModal.bind(this, row)}>
                    <i className="ion-android-create" />
                  </a>
                </ActionWrapper>
              );
            },
        },
    ];


    return (
        <Content>
            <Tables
                rowKey="id"
                columns={columns}
                bordered={true}
                dataSource={dataSource}
                loading={loading || submitLoading}
                pagination={{
                    defaultPageSize: 15,
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
                visible={modalActive}
                title={"Transaction"}
                onCancel={handleModal.bind(this, null)}
                footer={null}
            >
                <Form
                    formItem={formItem}
                    RowHolderStyle={RowHolderStyle}
                />

                <Modal
                    visible={photoView}
                    onCancel={imageModal.bind(this)}
                    footer={null}
                >
                    <Image
                        style={{ width: "100%" }}
                        src={transaction.payment.receiptPhotoUrl}
                    />
                </Modal>
            </Modal>
        </Content>
    );
};
