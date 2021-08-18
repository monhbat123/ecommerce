import React from "react";
import { firebase } from "@/main";
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  }
  imageUpload() {
    firebase
      .storage()
      .ref()
      .put(this.state.file)
      .then(function (snapshot) {
        console.log("Uploaded a blob or file!");
      });
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange} />
        <img style={{ height: 200 }} src={this.state.file} />
        <button onClick={this.imageUpload}>upload</button>
      </div>
    );
  }
}
export default Upload;
