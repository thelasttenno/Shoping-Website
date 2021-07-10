import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");
class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    // this.submitHandler.bind(this);
    this.form = React.createRef();
  }
  state = {
    name: null,
    data: null,
  };
  // submitHandler = (e) => {
  //   e.preventDefault();
  //   const id = uuidv4();
  //   const name2 = e.target.name2.value;
  //   console.log(name2);
  //   console.log(id);
  //   //VALIDATE THE DATA FIRST
  //   if (id && name2) {
  //     //POST THE NEW Inventory INFO TO OUR BACKEND
  //     var bodyFormData = new FormData()
  //     var imagefile= document.querySelector('#file');
  //     var totalFiles = imagefile.length
  //     bodyFormData.append('image', imagefile.files[totalFiles]);
  //     bodyFormData.append('id', id);
  //     bodyFormData.append('name2', name2);

  //     axios({
  //         method: "post",
  //         url: `/upload/${id}`,
  //         data: bodyFormData,
  //         headers: {"Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}`},
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log("There is something wrong..", err);
  //       });
  //   } else {
  //     console.log("There is something FUCKED..");
  //   }
  // };
  render() {
    return (

      //needs to be in a form like login is?]

      <div className="">

        {/* <form
          // ref={this.form}
          // onSubmit={this.submitHandler}
          // className="add-inventory"
        > */}
          {/* <input type="file" name="filemulti" id="filemulti" multiple /> */}
          {/* <input type="text" name="name4" id="name4" /> */}
          <input type="file" name="file1" id="file" />
          <input type="text" name="name1" id="name1" />
          <input type="file" name="file2" id="file2"/>
          <input type="text" name="name2" id="name2" />
          <input type="file" name="file3" id="file3"/>
          <input type="text" name="name3" id="name3" />
        {/* </form> */}
      </div>
    );
  }
}

export default PhotoUpload;
