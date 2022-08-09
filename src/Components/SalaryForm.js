import "../Styles/SalaryForm.css";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Col, Divider, Row } from "antd";

import {
  CloseCircleOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const SalaryForm = () => {
  const [form] = Form.useForm();

  const [salaryDetails, setSalaryDetails] = useState({
    BasicSalary: 0,
    Earnings: [],
    Deductions: [],
  });

  const onValuesChange = (changedValues, allValues) => {
    setSalaryDetails(allValues);
    console.log(allValues);
  };

  //Reset fields
  const onReset = () => {
    form.resetFields();
  };

  const grossCount = () => {
    let basic = salaryDetails.BasicSalary;
    let earnings = 0;
    if (salaryDetails.Earnings && salaryDetails.Earnings.length > 0) {
      let sub = 0;
      for (let i = 0; i < salaryDetails.Earnings.length; i++) {
        if (
          salaryDetails.Earnings[i] &&
          salaryDetails.Earnings[i].amount !== undefined
        ) {
          sub = Number(salaryDetails.Earnings[i].amount) + Number(sub);
        }
      }
      earnings = sub;
    }
    let total = Number(basic) + Number(earnings);
    return total;
  };

  const deductionAmount = () => {
    let Deductions = 0;
    if (salaryDetails.Deductions && salaryDetails.Deductions.length > 0) {
      let sub = 0;
      for (let i = 0; i < salaryDetails.Deductions.length; i++) {
        if (
          salaryDetails.Deductions[i] &&
          salaryDetails.Deductions[i] !== undefined
        ) {
          sub = Number(salaryDetails.Deductions[i]) + Number(sub);
        }
      }
      Deductions = sub;
    }
    return Deductions;
  };

  const employeeEPFAmount = () => {
    let basic = salaryDetails.BasicSalary;
    let earnings = 0;
    if (salaryDetails.Earnings && salaryDetails.Earnings.length > 0) {
      let sub = 0;
      for (let i = 0; i < salaryDetails.Earnings.length; i++) {
        if (
          salaryDetails.Earnings[i] &&
          salaryDetails.Earnings[i].amount !== undefined &&
          salaryDetails.Earnings[i].Checked
        ) {
          sub = Number(salaryDetails.Earnings[i].amount) + Number(sub);
        }
      }
      earnings = sub;
    }
    let total = Number(basic) + Number(earnings);
    return total * 0.08;
  };
  const employeerEPFAmount = () => {
    let basic = salaryDetails.BasicSalary;
    let earnings = 0;
    if (salaryDetails.Earnings && salaryDetails.Earnings.length > 0) {
      let sub = 0;
      for (let i = 0; i < salaryDetails.Earnings.length; i++) {
        if (
          salaryDetails.Earnings[i] &&
          salaryDetails.Earnings[i].amount !== undefined &&
          salaryDetails.Earnings[i].Checked
        ) {
          sub = Number(salaryDetails.Earnings[i].amount) + Number(sub);
        }
      }
      earnings = sub;
    }
    let total = Number(basic) + Number(earnings);
    return total * 0.12;
  };
  const employeerETFAmount = () => {
    let basic = salaryDetails.BasicSalary;
    let earnings = 0;
    if (salaryDetails.Earnings && salaryDetails.Earnings.length > 0) {
      let sub = 0;
      for (let i = 0; i < salaryDetails.Earnings.length; i++) {
        if (
          salaryDetails.Earnings[i] &&
          salaryDetails.Earnings[i].amount !== undefined &&
          salaryDetails.Earnings[i].Checked
        ) {
          sub = Number(salaryDetails.Earnings[i].amount) + Number(sub);
        }
      }
      earnings = sub;
    }
    let total = Number(basic) + Number(earnings);
    return total * 0.03;
  };

  const netSalary = () => {
    return (
      Number(grossCount()) -
      Number(deductionAmount()) -
      Number(employeeEPFAmount())
    );
  };
  const totalCost = () => {
    return (
      Number(employeerEPFAmount()) +
      Number(grossCount()) +
      Number(employeerETFAmount()) -
      Number(deductionAmount())
    );
  };
  return (
    <>
      <div className="SalaryForm">
        <div className="Container1">
          <p className="Tittle">Calculate Your Salary</p>
          <p className="Reset">
            <ReloadOutlined />
            <Button htmlType="button" onClick={onReset} className="btdReset">
              Reset
            </Button>
          </p>
        </div>
        <div className="Container">
          <Form
            form={form}
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Basic Salary"
              name="BasicSalary"
              rules={[
                { required: true, message: "Please input your Basic Salary!" },
              ]}
            >
              <Input
                placeholder=""
                style={{ width: "380px", height: "48px" }}
              />
            </Form.Item>
            <Form.Item label="Earnings"></Form.Item>
            <p className="subtittle">
              Allowance, Fixed Allowance, Bonus and etc.
            </p>
            <Form.List
              name="Earnings"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error(""));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields &&
                    fields.length > 0 &&
                    fields.map(({ key, name, ...restField }) => (
                      <Form.Item required={false} key={key}>
                        <Form.Item
                          {...restField}
                          name={[name, "amount"]}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Allowance or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder=""
                            style={{ width: "380px", height: "48px" }}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "Checked"]}
                          valuePropName="checked"
                          style={{ marginLeft: 420, marginTop: -30 }}
                        >
                          <Checkbox>EPF/ETF</Checkbox>
                        </Form.Item>
                        {fields.length > 1 ? (
                          <CloseCircleOutlined
                            className="dynamic-delete-button1"
                            onClick={() => remove(name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                  <Form.Item>
                    <Button
                      className="btnAd"
                      type="text"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add New Allowance
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item label="Deductions"></Form.Item>
            <p className="subtittle">
              Salary Advances, Loan Deductions and all
            </p>
            <Form.List
              name="Deductions"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error(""));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields &&
                    fields.length > 0 &&
                    fields.map(({ key, name, ...restField }) => (
                      <Form.Item required={false} key={key}>
                        <Form.Item
                          {...restField}
                          name={[name]}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Allowance or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder=""
                            style={{ width: "380px", height: "48px" }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <CloseCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                  <Form.Item>
                    <Button
                      className="btnAd"
                      type="text"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add New Deduction
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </div>
      </div>
      <div className="SalaryDetails">
        <div>
          <p className="YourSalary">Your Salary</p>
          <div className="listContainer" style={{ color: "#757575" }}>
            <p>Items</p>
            <p>Amount</p>
          </div>
          <div className="listContainer">
            <p>Gross Earning</p>
            <p>{grossCount()}</p>
          </div>

          <div className="listContainer">
            <p>Gross Deduction</p>
            <p>{deductionAmount()}</p>
          </div>
          <div className="listContainer">
            <p>Employee EPF (8%)</p>
            <p>{employeeEPFAmount()}</p>
          </div>
          <div
            className="listContainer"
            style={{
              fontWeight: "bold",
              border: "groove",
              borderRadius: 10,
            }}
          >
            <p>Net Salary (Take Home)</p>
            <p>{netSalary()}</p>
          </div>
          <div className="titleContainer">
            <p>Contribution from the Employer</p>
          </div>
          <div className="listContainer">
            <p>Employeer EPF (12%)</p>
            <p>{employeerEPFAmount()}</p>
          </div>
          <div className="listContainer">
            <p>Employeer ETF (3%)</p>
            <p>{employeerETFAmount()}</p>
          </div>
          <div className="listContainer">
            <p>CTC (Cost to Company)</p>
            <p>{totalCost()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalaryForm;
