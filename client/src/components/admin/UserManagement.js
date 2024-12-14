import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  Form,
  message
} from 'antd';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  // 사용자 목록 조회
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      message.error('사용자 목록을 불러오는데 실패했습니다.');
    }
  };

  // 사용자 정보 수정
  const handleEdit = async (values) => {
    try {
      await axios.put(`/api/admin/users/${selectedUser._id}`, values);
      message.success('사용자 정보가 수정되었습니다.');
      setEditModalVisible(false);
      fetchUsers();
    } catch (error) {
      message.error('사용자 정보 수정에 실패했습니다.');
    }
  };

  // 사용자 삭제
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/users/${selectedUser._id}`);
      message.success('사용자가 삭제되었습니다.');
      setDeleteModalVisible(false);
      fetchUsers();
    } catch (error) {
      message.error('사용자 삭제에 실패했습니다.');
    }
  };

  const columns = [
    { title: '이름', dataIndex: 'name', key: 'name' },
    { title: '이메일', dataIndex: 'email', key: 'email' },
    { title: '역할', dataIndex: 'role', key: 'role' },
    {
      title: '관리',
      key: 'action',
      render: (_, record) => (
        <>
          <Button 
            type="primary" 
            onClick={() => {
              setSelectedUser(record);
              form.setFieldsValue(record);
              setEditModalVisible(true);
            }}
          >
            수정
          </Button>
          <Button 
            type="danger" 
            onClick={() => {
              setSelectedUser(record);
              setDeleteModalVisible(true);
            }}
            style={{ marginLeft: 8 }}
          >
            삭제
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={users} rowKey="_id" />
      
      {/* 수정 모달 */}
      <Modal
        title="사용자 정보 수정"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleEdit}>
          <Form.Item
            name="name"
            label="이름"
            rules={[{ required: true, message: '이름을 입력해주세요' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="이메일"
            rules={[
              { required: true, message: '이메일을 입력해주세요' },
              { type: 'email', message: '올바른 이메일 형식이 아닙니다' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="역할"
            rules={[{ required: true, message: '역할을 선택해주세요' }]}
          >
            <Select>
              <Select.Option value="user">일반 사용자</Select.Option>
              <Select.Option value="admin">관리자</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 삭제 확인 모달 */}
      <Modal
        title="사용자 삭제"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>{selectedUser?.name} 사용자를 삭제하시겠습니까?</p>
      </Modal>
    </div>
  );
};

export default UserManagement; 