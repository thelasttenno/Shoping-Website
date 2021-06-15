import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");
class Singleorder extends Component {
  constructor(props) {
    super(props);
    this.submitHandler.bind(this);
    this.form = React.createRef();
  }
  state = {
    name: null,
    data: null,
  };
  submitHandler = (e) => {
    e.preventDefault();
    const id = uuidv4();
    const name2 = e.target.name2.value;
    console.log(name2);
    console.log(id);
    //VALIDATE THE DATA FIRST
    if (id && name2) {
      //POST THE NEW Inventory INFO TO OUR BACKEND
      var bodyFormData = new FormData()
      var imagefile= document.querySelector('#file');
      bodyFormData.append('image', imagefile.files[0]);
      bodyFormData.append('id', id);
      bodyFormData.append('name2', name2);

      axios({
          method: "post",
          url: `http://localhost:8080/upload/${id}`,
          data: bodyFormData,
          headers: {"Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}`},
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("There is something wrong..", err);
        });
    } else {
      console.log("There is something FUCKED..");
    }
  };
  render() {
    return (
      <div className="">

        <form
          ref={this.form}
          onSubmit={this.submitHandler}
          className="add-inventory"
        >
          <input type="file" name="file" id="file"/>
          <input type="text" name="name2" id="name" />
          <input type="submit" value="Submit" />
        </form>

      </div>
    );
  }
}

export default Singleorder;
