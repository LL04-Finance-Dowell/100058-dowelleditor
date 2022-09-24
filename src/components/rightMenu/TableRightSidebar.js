import React from 'react'

import $ from 'jquery';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const TableRightSidebar = () => {

  function makeTable() {
    var table = document.createElement('table')
    table.style.border = "2"
    table.id = 'table'
    var row = document.getElementById('rows').value
    var col = document.getElementById('cols').value

    var tableDiv = document.getElementsByClassName('tableInput')

    console.log(table);
    for (var rowIndex = 0; rowIndex < row; rowIndex++) {
      var tr = document.createElement('tr')

      for (var colIndex = 0; colIndex < col; colIndex++) {
        var td = document.createElement('td')
        td.className = "dropp"
        // var text = document.createTextNode("Canel "+colIndex)
        td.innerHTML = "Canel " + `${colIndex}`
        tr.appendChild(td)
      }

      table.appendChild(tr)

      tableDiv[0].appendChild(table)

      var tablee = document.getElementById('table')
      var cells = tablee.getElementsByTagName('td')

      for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = function () {
          if (this.hasAttribute('data-clicked')) {
            return;
          }
          this.setAttribute('data-clicked', 'yes')
          this.setAttribute('data-text', this.innerHtml);

          var input = document.createElement('input')
          input.setAttribute('type', 'text')
          input.value = this.innerHtml;
          input.style.width = this.offsetWidth - (this.clientLeft * 2) + "px"
          input.style.height = this.offsetHeight - (this.clientTop * 2) + "px"
          input.style.border = "0px";
          input.style.fontFamily = "inherit"
          input.style.fontSize = "inherit"
          input.style.textAlign = "inherit"
          input.style.backgroundColor = "LightGoldenRodYellow";

          input.onblur = function () {
            var td = input.parentElement;
            var org_text = input.parentElement.getAttribute('data-text');
            var current_text = this.value;

            if (org_text != current_text) {
              td.removeAttribute('data-clicked')
              td.removeAttribute('data-text')
              td.innerHTML = current_text;
              td.style.cssText = 'padding: 5px';

            } else {
              td.removeAttribute('data-clicked')
              td.removeAttribute('data-text')
              td.innerHTML = org_text;
              td.style.cssText = 'padding: 5px';
            }
          }

          input.onkeydown = function (event) {
            if (event.keyCode == 13) {
              this.onblur();
            }
          }
          this.innerHtml = ''
          this.style.cssText = 'padding: 0px 0px';
          this.append(input)
          this.firstElementChild.select()
        }
      }

    }

    $(function () {
      $(".dropp").sortable({
        connectWith: "td",
        placeholder: "ui-state-highlight"
      }).disableSelection();
    });




  }



  // document.getElementById('make').addEventListener("click", makeTable)
  return (
    <>
      <div>
        <h6 className='pt-4'>Table Size</h6>
        <Form.Label>Enter Number of rows</Form.Label>
        <Form.Control type='number' placeholder="" min="1" id='rows' className='shadow bg-white rounded mb-4' />


        <Form.Label>Enter Number of columns</Form.Label>

        <Form.Control type='number' placeholder="" min="1" id='cols' className='shadow bg-white rounded mb-4' />
      </div>

      <button onClick={makeTable}>Create Table</button>


      <div className='dropdown pt-4'>
        <h5>User permissions</h5>
        <DropdownButton variant="" id="" title="Nothing Selected" className='shadow bg-white rounded'>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className='mt-5 text-center pt-5'>
        <Button variant="primary" className="px-5">Remove Table</Button>
      </div>
    </>
  )
}

export default TableRightSidebar