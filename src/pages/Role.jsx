import { Fragment, useContext, useState } from "react"
import Container from "../components/conatiner/Container"
import { Button, Col, ConfigProvider, Form, Input, Modal, Row, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Table from "../components/tableComponent/Table";
import { StateContext } from "../components/context/stateContext";

const Role = () => {
  const [form] = Form.useForm();
  const { roles, setRoles } = useContext(StateContext);
  const [editId, setEditId] = useState("");
  const [open, setOpen] = useState(false);


  const onFinish = (values) => {
    const roleId = roles?.length > 0 ? Number(roles[roles.length - 1].roleId) + 1 : 1
    if (editId) {
      const isExistRole = roles?.find((item) => item?.roleName?.toLowerCase() === values.roleName?.toLowerCase() && item.roleId !== editId);
      if (isExistRole) {
        form.setFields([
          {
            name: 'roleName',
            errors: ['Role is aready exist!'],
          },
        ])
      }
      else {
        const newRoles = [...roles];
        const getIndex = roles?.findIndex((item) => item.roleId === editId);
        newRoles[getIndex] = { roleName:values.roleName?.charAt(0).toUpperCase() + values?.roleName?.slice(1), roleId: editId };
        setRoles([...newRoles])
        setEditId("")
        form.resetFields();
        setOpen(false);
      }
    }
    else {
      const isExistRole = roles?.find((item) => item?.roleName?.toLowerCase() === values.roleName?.toLowerCase());
      if (isExistRole) {
        form.setFields([
          {
            name: 'roleName',
            errors: ['Role is aready exist!'],
          },
        ])
      }
      else {
        setRoles([...roles, { roleName:values.roleName?.charAt(0).toUpperCase() + values?.roleName?.slice(1), roleId: roleId }])
        form.resetFields();
        setOpen(false);
      }
    }
  };

  const handleEditRole = (editUser) => {
    form.setFieldsValue({ ...editUser });
    setEditId(editUser.roleId);
    setOpen(true);
  }

  const handleDeleteRole = (deleteId) => {
    const newRoles = roles?.filter((item) => item.roleId !== deleteId);
    setRoles([...newRoles]);
  }

  const columns = [
    {
      title: 'Rolename',
      dataIndex: 'roleName',
      key: 'roleName',
      width: "200px"
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: "200px",
      render: (text, record) => <Fragment>
        <Space>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#fff",
                  colorTextLightSolid: "orange",
                  colorPrimaryHover: "#fff",
                  colorPrimaryActive: "#fff",
                  fontSize: 19
                },
              },
            }}
          >
            <Button type="primary" onClick={() => handleEditRole(record)}><EditOutlined /></Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorTextLightSolid: "#ff4d4f",
                  colorErrorHover: "#fff",
                  colorBorder: "#fff",
                  colorError: "#fff",
                  fontSize: 15
                },
              },
            }}
          >
            <Button type="primary" danger onClick={() => handleDeleteRole(record.roleId)}><DeleteOutlined /></Button>
          </ConfigProvider>
        </Space>
      </Fragment>,
    },
  ]


  return (
    <Fragment>
      <h2 className="margin-0 padding">All Roles</h2>
      <Container>
        <Row className='row'>
          <Col xs={24} className="margin-bottom col">
            <Button type="primary" onClick={() => setOpen(true)}>
              Add Role
            </Button>
          </Col>
          <Col xs={24}>
            <Table columns={columns} width={500} data={roles} />
          </Col>

          <Modal
            open={open}
            title={editId ? "Edit Role" : 'Add Role'}
            okText="Save"
            cancelText="Cancel"
            okButtonProps={{
              autoFocus: true,
              htmlType: 'submit',
            }}
            onCancel={() => { setOpen(false); form.resetFields();setEditId("")}}
            destroyOnClose
            modalRender={(dom) => (
              <Form
                layout="vertical"
                form={form}
                name="form_in_modal"
                initialValues={{
                  modifier: 'public',
                }}
                clearOnDestroy
                onFinish={(values) => onFinish(values)}
              >
                {dom}
              </Form>
            )}
          >
            <Form.Item
              label="Role"
              name="roleName"
              rules={[
                { required: true, message: "Role is required!" },
              ]}
            >
              <Input placeholder="Enter a role!" />
            </Form.Item>
          </Modal>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Role