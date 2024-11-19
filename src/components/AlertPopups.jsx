import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const AlertPopups = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showWarning = () => {
    confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        message.success('Items deleted successfully');
      },
      onCancel() {
        message.info('Action canceled');
      },
    });
  };

  const showSuccess = () => {
    message.success('The process was successful!');
  };

  const showError = () => {
    message.error('An error occurred!');
  };

  return (
    <div>
      <Button className="alert-button" onClick={showWarning}>
        Show Warning Modal
      </Button>
      <Button className="alert-button" onClick={showSuccess}>
        Show Success Message
      </Button>
      <Button className="alert-button" onClick={showError}>
        Show Error Message
      </Button>
    </div>
  );
};

export default AlertPopups;
