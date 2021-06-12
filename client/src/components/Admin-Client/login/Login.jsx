import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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
    const name = e.target.name.value;
    const data = e.target.file.value;
    console.log(name);
    console.log(id);
    console.log(data);
    //VALIDATE THE DATA FIRST
    if (id && name && data) {
      //POST THE NEW Inventory INFO TO OUR BACKEND
      console.log(name);
      axios
        .post(`http://localhost:8080/upload/${id}`, {
          id: id,
          data: data,
          name: name,
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

        {/* <form
          ref={this.form}
          onSubmit={this.submitHandler}
          className="add-inventory"
        >
          <input type="file" name="file" />
          <input type="text" name="name" id="name" />
          <input type="submit" value="Submit" />
        </form> */}

        <div>
          <form method="post" enctype="multipart/form-data" action="http://localhost:8080/upload">
            <input type="file" name="file" />
            <input type="text" name="name" id="name" />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Singleorder;
