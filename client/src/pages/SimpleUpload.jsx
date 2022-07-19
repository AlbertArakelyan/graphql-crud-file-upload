import {useState} from "react";
import {Container} from "react-bootstrap";
import {useMutation} from "@apollo/client";
import store from "store";

// Components
import {Images} from "../components";

// Queries
import {SINGLE_UPLOAD, GET_IMAGES} from "../apollo/queries/upload";


import {PREFIX} from "../config";

// import img from '@images/PTEM58051641638939719.JPG';

const SimpleUpload = () => {
  const [uploadedFile, setUploadedFile] = useState();
  const [uploadFile, {loading, error, data}] = useMutation(SINGLE_UPLOAD);
  const accessToken = store.get(`${PREFIX}access_token`);

  console.log(data, 'ov ka tuny?');

  console.log(uploadedFile, 'uploadedFile');

  const handleChange = (e) => {
    const {target: {files}} = e;

    if (files && files[0]) {
      setUploadedFile(files[0]);
    }

  };

  const handleSubmit = () => {
    uploadFile({
      variables: {
        file: uploadedFile
      },
      context: {
        headers: {
          authorization: accessToken
        },
      },
      refetchQueries: GET_IMAGES
    });
  };

  return (
    <div className="pt-2">
      <Container>
        <div className="d-flex flex-column align-items-center justify-content-start">
          <label htmlFor="file" className="btn btn-info">
            Upload image
            <input type="file" id="file" onChange={handleChange} accept="image/*" hidden/>
          </label>
          {uploadedFile && <>
            <div className="w-25 mt-4">
              <img className="w-100 d-block" src={URL.createObjectURL(uploadedFile)} alt="preview"/>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary mt-2">Submit</button>
          </>}


        </div>
        {/*<img style={{maxWidth: 500}} src={require('@images/PTEM58051641638939719.JPG').default} alt="ddd" />*/}
        <Images />
      </Container>
    </div>
  );
};

export default SimpleUpload;