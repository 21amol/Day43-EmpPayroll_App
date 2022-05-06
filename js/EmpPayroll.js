class EmployeePayrollData {
    get id() {
      return this._id;
    }
  
    set id(id) {
      this._id = id;
    }
  
    get name() {
      return this._name;
    }
  
    set name(name) {
      let nameRegex = RegExp("^[A-Z]{1}[a-z]{1,}$");
      if (nameRegex.test(name)) this._name = name;
      else throw "Incorrect Name";
    }
  
    get profilePic() {
      return this._profilePic;
    }
    set profilePic(profilePic) {
      this._profilePic = profilePic;
    }
  
    get gender() {
      return this._gender;
    }
  
    set gender(gender) {
      this._gender = gender;
    }
  
    get department() {
      return this._department;
    }
  
    set department(department) {
      this._department = department;
    }
  
    get salary() {
      return this._salary;
    }
  
    set salary(salary) {
      this._salary = salary;
    }
  
    get note() {
      return this._note;
    }
  
    set note(note) {
      this._note = note;
    }
  
    get startDate() {
      return this._startDate;
    }
  
    set startDate(startDate) {
      let actualDate = new Date(startDate).getTime();
      let currentDate = new Date().getTime();
      if (actualDate > currentDate) {
        throw "Future Date. Date is Invalid";
      } else this._startDate =stringifyDate(new Date(startDate).toLocaleDateString());
    }

    // method
    toString() {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const empDate = this.startDate === undefined ? "undefined" : this.startDate;
      return ("id=" +this.id +", name=" +this.name +", gender=" +this.gender +", profilePic=" +this.profilePic +
        ", department=" +this.department +", salary=" +this.salary +", " +"gender=" +this.gender +", startDate=" +
        empDate +", notes= " +this.note
      );
    }
  }

  
  window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener("input", function () {
      if (name.value.length == 0) {
        textError.textContent = " ";
      } else {
        try {
          new EmployeePayrollData().name = name.value;
          textError.textContent = " ";
        } catch (e) {
          textError.textContent = e;
        }
      }
    });
});

const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
output.textContent = salary.value;
salary.addEventListener("input", function () {
  output.textContent = salary.value;
});


const save = () => {
    try {
      let employeePayrollData = createEmployeePayroll();
      createAndUpdateStorage(employeePayrollData);
    } catch (e) {
      return;
    }
  };

  const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
    } catch (e) {
      setTextValue(".text-error", e);
      throw e;
    }
    try {
      employeePayrollData.name = getInputValueById("#name");
      let date =
        getInputValueById("#day") +" " +
        getInputValueById("#month") +" " +
        getInputValueById("#year");
      if (date == "  ") 
          throw "Invalid Date";
      employeePayrollData.startDate = date;
      console.log(employeePayrollData.startDate)
    } catch (e) {
      throw e;
    }
    employeePayrollData.profilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.department = getSelectedValues("[name=department]");
    employeePayrollData.salary = getInputValueById("#salary");
    employeePayrollData.note = getInputValueById("#notes");
    employeePayrollData.id = new Date().getTime();
    return employeePayrollData;
  };


  const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach((item) => {
      if (item.checked) selItems.push(item.value);
    });
    return selItems;
  };
  
  const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
  };
  
//   const getInputElementValue = (id) => {
//     let value = documentegetElementBy(id).value;
//     return value;
//   };
  

const resetForm = () => {
  setValue('#name', ' ');
  unsetSelectedValue('[name=profile]');
  unsetSelectedValue('[name=gender]');
  unsetSelectedValue('[name=department]');
  setValue('#salary', '');
  setValue('#notes', '');
  setSelectedIndex('#day', 0);
  setSelectedIndex('#month', 0);
  setSelectedIndex('#year', 0);
}

const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      item.checked = false;
  });
}

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJson ? true : false;
  if (!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
}

const setForm = () => {
  console.log(employeePayrollObj);
  setValue('#name', employeePayrollObj._name);
  setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
  setSelectedValues('[name=gender]', employeePayrollObj._gender);
  setCheckBox('[name=department]', employeePayrollObj._department);
  setValue('#salary', employeePayrollObj._salary);
  setTextValue('.salary-output', employeePayrollObj._salary);
  setValue('#notes', employeePayrollObj._notes);
  let date = stringifyDate(employeePayrollObj._startDate).split("-");
  setValue('#day', date[0])
  setValue('#month', date[1])
  setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      if (Array.isArray(value)) {
          if (value.includes(item.value)) {
              item.checked = true;
          }
      }
      else if (item.value == value)
          item.checked = true;
  });
}
const setCheckBox = (property, values) => {
  let items = document.querySelectorAll(property);
  items.forEach(item => {
      if (values.includes(item.value)) {
          item.checked = true;
      }
  });
}

function createAndUpdateStorage() {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeePayrollList) {
      let employeeData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
      if (!employeeData) employeePayrollList.push(createEmployeePayrollData());
      else {
          const index = employeePayrollList.map(empData => empData._id)
              .indexOf(employeeData._id);
          employeePayrollList.splice(index, 1, createEmployeePayrollData(employeeData._id));
      }
  } else {
      employeePayrollList = [createEmployeePayrollData()];
  }
  console.log(employeePayrollList);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const setEmployeePayrollData = (employeePayrollData) => {
  try{
      employeePayrollData.name = employeePayrollObj._name;
  }catch(e){
      setTextValue('.text-error',e)
      throw e
  }
  employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.note = getInputValueById('#notes');
  try{
      employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
  }catch(e){
      setTextValue('.date-error',e)
      throw e;
  }
  alert(employeePayrollObj.toString());
} 

const createEmployeePayrollData = (id) => {
  let employeePayrollData = new EmployeePayrollData();
  if (!id) employeePayrollData.id = createNewEmployeeId();
  else employeePayrollData.id = id;
  setEmployeePayrollData(employeePayrollData);
  return employeePayrollData;
}

const createNewEmployeeId = () => {
  let empId = localStorage.getTime("EmployeeID");
  empId = !empId ? 1 : (parseInt(empId) + 1).toString();
  localStorage.setItem("EmployeeID", empId);
  return empId;
}

function getCheckBoxValue(boxes) {
  let boxlist = []
  for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
          boxlist.push(boxes[i].value)
      }
  }
  return boxlist;
}

function getRadioValue(radios) {
  for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
          return radios[i].value;
      }
  }
}