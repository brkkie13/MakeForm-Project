'use client';
import { useRef } from 'react';
import { Form } from './FormsSearch.styles';
import SearchIcon from '../icons/SearchIcon';

function FormsSearch(props) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    props.onSearch(selectedYear, selectedMonth);
  }

  return (
    <Form onSubmit={submitHandler}>
      <div className="control">
        <select id="year" ref={yearInputRef} placeholder="년도">
          <option value="2023">2023</option>
        </select>
      </div>

      <div className="control">
        <select id="month" ref={monthInputRef} placeholder="월">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>

      <div className="control">
        <label>
          <SearchIcon />
          <input placeholder="제목으로 검색" />
        </label>
      </div>
    </Form>
  );
}

export default FormsSearch;
