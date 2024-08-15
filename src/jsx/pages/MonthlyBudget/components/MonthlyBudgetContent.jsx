import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Collapse from "react-bootstrap/Collapse";
import { options, tableData } from "../utils/mock";
import "../../../../assets/css/content-table.css";
import { Dropdown } from "react-bootstrap";

const MonthlyBudgetTable = () => {
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);

  const [data, setData] = useState(
    document.querySelectorAll("#content_wrapper tbody tr")
  );
  const sort = 8;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  const chackboxFun = (type) => {
    setTimeout(() => {
      const chackbox = document.querySelectorAll(".customer_shop_single input");
      const motherChackBox = document.querySelector(".customer_shop input");
      for (let i = 0; i < chackbox.length; i++) {
        const element = chackbox[i];
        if (type === "all") {
          if (motherChackBox.checked) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        } else {
          if (!element.checked) {
            motherChackBox.checked = false;
            break;
          } else {
            motherChackBox.checked = true;
          }
        }
      }
    }, 100);
  };

  const chack = (i) => (
    <div className={`form-check custom-checkbox ms-2`}>
      <input
        type="checkbox"
        className="form-check-input "
        id={`checkAll${i}`}
        required=""
        onClick={() => chackboxFun()}
      />
      <label className="form-check-label" htmlFor={`checkAll${i}`}></label>
    </div>
  );

  const drop = (
    <Dropdown>
      <Dropdown.Toggle
        variant=""
        className="btn btn-primary tp-btn-light sharp i-false"
      >
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24"></rect>
            <circle fill="#000000" cx="5" cy="12" r="2"></circle>
            <circle fill="#000000" cx="12" cy="12" r="2"></circle>
            <circle fill="#000000" cx="19" cy="12" r="2"></circle>
          </g>
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#">Edit</Dropdown.Item>
        <Dropdown.Item href="#" className="text-danger">
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll("#content_wrapper tbody tr"));
    //chackboxFun();
  }, [test]);

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  const [deleteItem, setDeleteItem] = useState(tableData);
  const handleDelete = (ind) => {
    setDeleteItem((oldValues) => {
      return oldValues.filter((_, i) => i !== ind);
    });
  };
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="filter cm-content-box box-primary">
            <div className="content-title">
              <div className="cpa">
                <i className="fas fa-filter me-2"></i>Filter
              </div>
              <div className="tools">
                <Link
                  to={"#"}
                  className={`SlideToolHeader ${open ? "collapse" : "expand"}`}
                  onClick={() => setOpen(!open)}
                >
                  <i className="fas fa-angle-up"></i>
                </Link>
              </div>
            </div>

            <Collapse in={open}>
              <div className="cm-content-body form excerpt">
                <div className="card-body">
                  <div className="row filter-row">
                    <div className="col-xl-3 col-xxl-6">
                      <input
                        type="text"
                        className="form-control mb-xl-0 mb-3"
                        id="exampleFormControlInput1"
                        placeholder="Title"
                      />
                    </div>
                    <div className="col-xl-3 col-xxl-6">
                      <Select
                        isSearchable={false}
                        options={options}
                        className="custom-react-select mb-3 mb-xxl-0 "
                      />
                    </div>
                    <div className="col-xl-3 col-xxl-6">
                      <input
                        type="date"
                        name="datepicker"
                        className=" form-control mb-xxl-0 mb-3"
                      />
                    </div>
                    <div className="col-xl-3 col-xxl-6">
                      <button
                        className="btn btn-primary me-2"
                        title="Click here to Search"
                        type="button"
                      >
                        <i className="fa fa-search me-1"></i>Filter
                      </button>
                      <button
                        className="btn btn-danger light"
                        title="Click here to remove filter"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
          <div className="mb-3">
            <Link to={"/add-content"} className="btn btn-primary">
              Add New Budget Request
            </Link>
          </div>
          <div className="filter cm-content-box box-primary mt-5">
            <div className={`content-title`}>
              <div className="cpa">
                <i className="fas fa-file-word me-2"></i>PR List
              </div>
              <div className="tools">
                <Link
                  to={"#"}
                  className={`SlideToolHeader ${open2 ? "collapse" : "expand"}`}
                  onClick={() => setOpen2(!open2)}
                >
                  <i className="fas fa-angle-up"></i>
                </Link>
              </div>
            </div>
            <Collapse in={open2}>
              <div className="cm-content-body form excerpt">
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="content_wrapper"
                      className="dataTables_wrapper no-footer"
                    >
                      <table className="table mb-0 table-striped">
                        <thead>
                          <tr>
                            <th className="customer_shop">
                              <div className="form-check custom-checkbox mx-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="checkAll"
                                  onClick={() => chackboxFun("all")}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="checkAll"
                                ></label>
                              </div>
                            </th>
                            <th>No.</th>
                            <th>NYA</th>
                            <th>Period</th>
                            <th>Company</th>
                            <th>Req ID</th>
                            <th>Department</th>
                            <th>Currency</th>
                            <th>Req By</th>
                            <th>Note</th>
                            <th>Total Amount</th>
                            <th>Submit At</th>
                            <th>Benef Account Number</th>
                            <th>Last Approval At</th>
                            <th>Beneficiary Bank</th>
                            <th>Payment Plan</th>
                            <th>Transfer Date</th>
                            <th>Status</th>
                            <th className="text-end actions-column">Actions</th>
                          </tr>
                        </thead>
                        <tbody id="customers">
                          {deleteItem.map((item, ind) => (
                            <tr key={ind}>
                              <td className="customer_shop_single">
                                {chack(item.id)}
                              </td>
                              <td>{item.id}</td>
                              <td>No</td>
                              <td>{item.period}</td>
                              <td>{item.company}</td>
                              <td>{item.reqId}</td>
                              <td>{item.department}</td>
                              <td>IDR</td>
                              <td>{item.reqBy}</td>
                              <td>{item.title}</td>
                              <td>{item.title}</td>
                              <td>{item.title}</td>
                              <td>{item.title}</td>
                              <td>{item.title}</td>
                              <td>{item.title}</td>
                              <td>{item.title}</td>
                              <td>{item.status}</td>
                              <td>18 Feb, 2023</td>
                              <td className="py-2 text-right actions-column">
                                {drop}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <div
                      id="content_wrapper"
                      className="dataTables_wrapper no-footer"
                    >
                      <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                        <div className="dataTables_info">
                          Showing {activePag.current * sort + 1} to{" "}
                          {data.length > (activePag.current + 1) * sort
                            ? (activePag.current + 1) * sort
                            : data.length}{" "}
                          of {data.length} entries
                        </div>
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="example2_paginate"
                        >
                          <Link
                            className="paginate_button previous disabled"
                            to="/"
                            onClick={() =>
                              activePag.current > 0 &&
                              onClick(activePag.current - 1)
                            }
                          >
                            <i
                              className="fa fa-angle-double-left"
                              aria-hidden="true"
                            ></i>
                          </Link>
                          <span>
                            {paggination.map((number, i) => (
                              <Link
                                key={i}
                                to="/"
                                className={`paginate_button  ${
                                  activePag.current === i ? "current" : ""
                                } `}
                                onClick={() => onClick(i)}
                              >
                                {number}
                              </Link>
                            ))}
                          </span>
                          <Link
                            className="paginate_button next"
                            to="/"
                            onClick={() =>
                              activePag.current + 1 < paggination.length &&
                              onClick(activePag.current + 1)
                            }
                          >
                            <i
                              className="fa fa-angle-double-right"
                              aria-hidden="true"
                            ></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
};
export default MonthlyBudgetTable;
