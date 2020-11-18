import React from "react";
import { Modal, AntdIcon, Button } from 'marslab-library-react/components/atoms';
import Table from '../../../../screens/antTable.style';
import { Form } from 'marslab-library-react/components/organisms/Form';
import ListCard from "marslab-library-react/components/organisms/ListCard";

import {
    RouteContent,
    TitleWrapper,
    ButtonHolders,
    TableFieldsetStyle,
    RowHolderStyle,
    FieldsetStyle,
    LabelStyle,
    SelectStyle,
    ButtonStyle,
    InputStyle,
    DatePickerStyle,
    TableStyle,
    ActionButtonStyle,
} from "./styles";

import { Link } from "react-router-dom";

export default ({ dataSource, routeData, columns, modalVisible, onModalView, onModalCancel, onModalChange}) => {
    const Tables = TableStyle(Table);
    const ActionBtn = ActionButtonStyle(Button);

    return (
        <RouteContent>
            Mission Home Page
            
        </RouteContent>
    );
}