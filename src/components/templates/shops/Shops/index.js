import React from "react";
import { Popconfirm, AntdIcon } from "marslab-library-react/components/atoms";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "marslab-library-react/components/organisms/Form";
import { StepModal } from "marslab-library-react/components/organisms/StepModal";
import moment from "moment";

import { ActionBtn, ButtonHolders, ActionWrapper, Content, TableWrapper } from "./styles";

export default ({
  handleModal,
  modalActive,
  readLoading,
  submitLoading,
  modalCurrentPage,
  dataSource,
  onRowClick,
  onButtonClick,
  getColumnSearchProps,
  shopCategories,
}) => {
  const categoriesArray = [];

  //Shop category in shop list
  //   Object.keys(shopCategories).map((category, index) => {
  //     console.log(shopCategories[category].label);
  //     return categoriesArray.push({
  //       ...shopCategories[category].label,
  //     });
  //   });

  const columns = [
    {
      title: "Shop Name",
      dataIndex: "title",
      key: "title",
      width: "120x",
      sorter: (a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      },
      ...getColumnSearchProps("title"),
    },
    {
      title: "Business Name",
      dataIndex: "displayTitle",
      key: "displayTitle",
      width: "120x",
      sorter: (a, b) => {
        if (a.displayTitle < b.displayTitle) return -1;
        if (a.displayTitle > b.displayTitle) return 1;
        return 0;
      },
      ...getColumnSearchProps("displayTitle"),
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      width: "120x",
      //   render: (data) => {
      //     //console.log(data);
      //     if (data === ["1576652646288"]) return "yes";
      //     //console.log(data);
      //   },
      sorter: (a, b) => {
        if (a.categories < b.categories) return -1;
        if (a.categories > b.categories) return 1;
        return 0;
      },
      ...getColumnSearchProps("categories"),
    },
    // {
    //     title: "Promotion Status",
    //     dataIndex: "isPromote",
    //     key: "isPromote",
    //     width: "120x",
    //     // render: (data) => {
    //     //     if(data)
    //     //         return "Active";
    //     //     else
    //     //         return "Inactive";
    //     // },
    //     sorter: (a, b) => {
    //         if (a.isPromote < b.isPromote) return -1;
    //         if (a.isPromote > b.isPromote) return 1;
    //         return 0;
    //     },
    //     ...getColumnSearchProps('isPromote')
    // },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "120x",
      sorter: (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      },
      ...getColumnSearchProps("id"),
    },
    /**{
        title: "Actions",
        key: "action",
        width: "60px",
        className: "noWrapCell",
        render: (text, row) => {
            return (
                <ActionWrapper>
                    <a
                        onClick={this.handleModal.bind(this, {
                        toggle: true,
                        nextPage: 0,
                        data: row
                    })}
                        href="# "
                    >
                        <i className="ion-android-create" />
                    </a>

                    <Popconfirm
                        title="Are you sure to delete this shop？"
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                        onConfirm={this.handleRecord.bind(this, "delete", row)}
                    >
                        <a className="deleteBtn" href="# ">
                            <i className="ion-android-delete" />
                        </a>
                    </Popconfirm>
                </ActionWrapper>
            );
        }
    }*/
  ];

  /**const formShop = [
        [
        {
            type: "upload",
            uploadType: "pictureWall",
            onUploadFile: this.onUploadFile.bind(this, { key: "logo", target: shop.id }), 
            uploadLoading : uploadLoading,
            uploadProgress : uploadProgress,
            uploadResult: uploadResult,
            onChange : this.onSelectChange.bind(this,{ key: "logo" }),
            defaultFileList : shop.logo,
            maxFiles: 1,
            label: "Logo (800 x 600)",
            disabled: uploadKey && uploadKey !== "logo",
            UploadStyle: UploadStyle
        }
        ], 
        [
        {
            type: "upload",
            uploadType: "pictureWall",
            onUploadFile: this.onUploadFile.bind(this, { key: "images", target: shop.id }),
            uploadLoading : uploadLoading,
            uploadProgress : uploadProgress,
            uploadResult: uploadResult,
            onChange : this.onSelectChange.bind(this,{ key: "images" }),
            defaultFileList : shop.images,
            maxFiles: 1,
            label: "Images (800 x 600)",
            disabled: uploadKey && uploadKey !== "images" ,
            UploadStyle: UploadStyle
        }
        ], 
    ];

    const stepDetails = [
        {
        title: "Information",
        description: "",
        okText: "Next",
        onOk: shop.id
            ? this.handleRecord.bind(this, "update", shop)
            : this.handleRecord.bind(this, "insert", shop),
        cancelText: "Close",
        onCancel: this.handleModal.bind(this, {
            toggle: true,
            nextPage: 0,
            data: null
        }),
        confirmLoading: submitLoading
        },
        {
        title: "Photo",
        description: "",
        okText: "Finish",
        onOk: this.handleRecord.bind(this, "update", shop),
        cancelText: "Back",
        onCancel: this.handleModal.bind(this, {
            toggle: false,
            nextPage: modalCurrentPage - 1,
            data: null
        }),
        confirmLoading: submitLoading
        }
    ];

    const modalContent = [
        {
        content: (
            <Form
            formItem={formItem}
            RowHolderStyle={RowHolderStyle}
            FieldsetStyle={FieldsetStyle}
            LabelStyle={LabelStyle}
            SelectStyle={SelectStyle}
            ButtonStyle={ButtonStyle}
            DatePickerStyle={DatePickerStyle}
            InputStyle={InputStyle}
            />
        )
        },
        {
        content: (
            <Form
            formItem={formShop}
            FieldsetStyle={FieldsetStyle}
            LabelStyle={LabelStyle}
            SelectStyle={SelectStyle}
            ButtonStyle={ButtonStyle}
            DatePickerStyle={DatePickerStyle}
            />
        )
        }
    ];*/

  return (
    <Content>
      <ButtonHolders>
        <ActionBtn type="primary" onClick={onButtonClick}>
          Add new shop
        </ActionBtn>
      </ButtonHolders>

      {/* <StepModal
              currentPage={modalCurrentPage}
              visible={modalActive}
              title="Add New Shop"
              stepDetails={stepDetails}
              modalContent={modalContent}
              closable={false}
            /> */}

      <TableWrapper
        rowKey="id"
        columns={columns}
        bordered={true}
        dataSource={dataSource}
        loading={readLoading || submitLoading}
        className="isoSimpleTable"
        onRow={(record, rowIndex) => {
          return {
            onClick: onRowClick.bind(this, record),
          };
        }}
        pagination={{
          hideOnSinglePage: true,
          total: dataSource.length,
          showTotal: (total, range) => {
            return `Showing ${range[0]}-${range[1]} of ${dataSource.length} Results`;
          },
        }}
      />
    </Content>
  );
};
