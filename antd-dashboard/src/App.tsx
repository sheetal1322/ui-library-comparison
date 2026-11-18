
import { useState } from 'react';
import {
  Layout,
  Menu,
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Form,
  Input,
  Select,
  Button,
  Table,
  Modal,
  Switch,
  Tag,
  Avatar,
  Space,
  ConfigProvider,
  theme,
} from 'antd';

import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';

import type { ColumnsType } from 'antd/es/table';

const { Sider, Header, Content } = Layout;

type Student = {
  id: number;
  name: string;
  email: string;
  role: 'Student' | 'Admin';
};

const initialStudents: Student[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    role: 'Student',
  },
  {
    id: 2,
    name: 'Priya Singh',
    email: 'priya@example.com',
    role: 'Student',
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    email: 'rohan@example.com',
    role: 'Admin',
  },
];

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [form] = Form.useForm();

  const studentCount = students.filter(
    (student) => student.role === 'Student'
  ).length;

  const adminCount = students.filter(
    (student) => student.role === 'Admin'
  ).length;

  const handleAddStudent = (values: {
    name: string;
    email: string;
    role: 'Student' | 'Admin';
  }) => {
    const newStudent: Student = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      role: values.role,
    };

    setStudents((previous) => [...previous, newStudent]);
    form.resetFields();
  };

  const columns: ColumnsType<Student> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Typography.Text strong>{name}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: Student['role']) => (
        <Tag color={role === 'Admin' ? 'purple' : 'blue'}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => setSelectedStudent(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#7565D9',
          borderRadius: 8,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme={darkMode ? 'dark' : 'light'}
          width={220}
          breakpoint="md"
          collapsedWidth="0"
        >
          <div
            style={{
              padding: '24px',
              fontSize: 22,
              fontWeight: 700,
              color: darkMode ? '#fff' : '#7565D9',
            }}
          >
            EduPanel
          </div>

          <Menu
            theme={darkMode ? 'dark' : 'light'}
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            items={[
              {
                key: 'dashboard',
                icon: <DashboardOutlined />,
                label: 'Dashboard',
              },
              {
                key: 'students',
                icon: <TeamOutlined />,
                label: 'Students',
              },
              {
                key: 'settings',
                icon: <SettingOutlined />,
                label: 'Settings',
              },
            ]}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              background: darkMode ? '#141414' : '#fff',
              padding: '0 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography.Title
              level={4}
              style={{
                margin: 0,
                color: darkMode ? '#fff' : '#222',
              }}
            >
              Dashboard
            </Typography.Title>

            <Space>
              {darkMode ? <MoonOutlined /> : <SunOutlined />}
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                aria-label="Toggle dark mode"
              />
            </Space>
          </Header>

          <Content style={{ margin: 24 }}>
            <Typography.Title level={3}>
              Welcome to EduPanel
            </Typography.Title>

            <Typography.Text type="secondary">
              Manage students and view dashboard information.
            </Typography.Text>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Total Records"
                    value={students.length}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Student Accounts"
                    value={studentCount}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Administrators"
                    value={adminCount}
                  />
                </Card>
              </Col>
            </Row>

            <Card
              title="Add New Student"
              style={{ marginTop: 24 }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleAddStudent}
                requiredMark
              >
                <Row gutter={16}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the student name',
                        },
                      ]}
                    >
                      <Input placeholder="Enter full name" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter an email',
                        },
                        {
                          type: 'email',
                          message: 'Enter a valid email',
                        },
                      ]}
                    >
                      <Input placeholder="Enter email address" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Role"
                      name="role"
                      initialValue="Student"
                      rules={[
                        {
                          required: true,
                          message: 'Please select a role',
                        },
                      ]}
                    >
                      <Select
                        options={[
                          { value: 'Student', label: 'Student' },
                          { value: 'Admin', label: 'Admin' },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Button type="primary" htmlType="submit">
                  Add Student
                </Button>
              </Form>
            </Card>

            <Card
              title="Student Directory"
              style={{ marginTop: 24 }}
            >
              <Table<Student>
                columns={columns}
                dataSource={students}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                scroll={{ x: 600 }}
              />
            </Card>
          </Content>
        </Layout>

        <Modal
          title="Student Details"
          open={selectedStudent !== null}
          onCancel={() => setSelectedStudent(null)}
          footer={[
            <Button
              key="close"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </Button>,
          ]}
        >
          {selectedStudent && (
            <Space direction="vertical" size="middle">
              <Avatar size={64} icon={<UserOutlined />} />

              <Typography.Paragraph>
                <strong>Name:</strong> {selectedStudent.name}
              </Typography.Paragraph>

              <Typography.Paragraph>
                <strong>Email:</strong> {selectedStudent.email}
              </Typography.Paragraph>

              <Typography.Paragraph>
                <strong>Role:</strong> {selectedStudent.role}
              </Typography.Paragraph>
            </Space>
          )}
        </Modal>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
