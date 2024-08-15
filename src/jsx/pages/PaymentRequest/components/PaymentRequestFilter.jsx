import Select from "react-select";
import { optionsYear, optionsMonth } from "../utils/mock";
import { Link } from "react-router-dom";
import { Collapse, FormLabel } from "react-bootstrap";
import { useState } from "react";
import { DatePicker } from "rsuite";
import "../utils/style/PaymentRequestFilter.css";

const PaymentRequestFilter = () => {
  const [open, setOpen] = useState(true);
  const [startDate, setStartDate] = useState(new Date("2024/05/08"));

  return (
    <div className="filter cm-content-box box-primary">
      <div className="content-title d-flex justify-content-between align-items-center">
        <div className="cpa">
          <i className="fas fa-filter me-2"></i>Filter
        </div>
        <div className="tools">
          <Link
            to={"#"}
            className={`SlideToolHeader ${open ? "collapse" : "expand"}`}
            onClick={() => setOpen(!open)}
          >
            <i className={`fas fa-angle-${open ? "up" : "down"}`}></i>
          </Link>
        </div>
      </div>

      <Collapse in={open}>
        <div className="cm-content-body form excerpt">
          <div className="card-body">
            <div className="row filter-row">
              {/* First Row */}
              <div className="col-xl-3 col-xxl-6">
                <FormLabel>Period</FormLabel>
                <Select
                  isSearchable
                  options={optionsMonth}
                  placeholder="All Month"
                  className="custom-react-select mb-3"
                />
              </div>
              <div className="col-xl-3 col-xxl-6">
                <FormLabel>&nbsp;</FormLabel>
                <Select
                  isSearchable
                  options={optionsYear}
                  placeholder="All Year"
                  className="custom-react-select mb-3"
                />
              </div>
              <div className="col-xl-3 col-xxl-6">
                <FormLabel>OPB</FormLabel>
                <Select
                  isSearchable
                  options={optionsYear}
                  placeholder="OPB"
                  className="custom-react-select mb-3"
                />
              </div>
              <div className="col-xl-3 col-xxl-6">
                <FormLabel>Company</FormLabel>
                <Select
                  isSearchable
                  options={optionsYear}
                  placeholder="Company"
                  className="custom-react-select mb-3"
                />
              </div>

              {/* Second Row */}
              <div className="col-xl-3 col-xxl-6">
                <FormLabel>Requester</FormLabel>
                <Select
                  isSearchable
                  options={optionsMonth}
                  placeholder="Requester"
                  className="custom-react-select mb-3"
                />
              </div>
              <div className="col-xl-3 col-xxl-6">
                <FormLabel>Beneficiary</FormLabel>
                <Select
                  isSearchable
                  options={optionsYear}
                  placeholder="Beneficiary"
                  className="custom-react-select mb-3"
                />
              </div>
              <div className="col-xl-3 col-xxl-6">
                <FormLabel>Expense Type</FormLabel>
                <Select
                  isSearchable
                  options={optionsYear}
                  placeholder="Expense Type"
                  className="custom-react-select mb-3"
                />
              </div>
              <div className="col-xl-3 col-xxl-6">
                <FormLabel>Department</FormLabel>
                <Select
                  isSearchable
                  options={optionsYear}
                  placeholder="Department"
                  className="custom-react-select mb-3"
                />
              </div>

              {/* Third Row */}
              <div className="col-xl-3 col-xxl-6">
                <FormLabel>PPD</FormLabel>
                <DatePicker
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  className="form-control date-filter_custom"
                  placeholder="Select Date"
                  startDate={startDate}
                />
              </div>
              <div className="col-xl-3 col-xxl-6">
                <FormLabel>Status</FormLabel>
                <Select
                  isSearchable
                  options={optionsMonth}
                  isMulti
                  placeholder="Status"
                  className="custom-react-select mb-3"
                />
              </div>
            </div>
            <div className="col-xl-6 col-xxl-6 d-flex align-items-end">
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
      </Collapse>
    </div>
  );
};

export default PaymentRequestFilter;
