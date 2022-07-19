import {gql} from "@apollo/client";

export const SINGLE_UPLOAD = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

export const GET_IMAGES = gql`
  query AllImages {
    allImages {
      image
      id
    }
  }
`;