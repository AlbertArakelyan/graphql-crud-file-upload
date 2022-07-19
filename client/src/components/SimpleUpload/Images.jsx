import {Row, Col} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import store from "store";

// Queries
import {GET_IMAGES} from "../../apollo/queries/upload";

// Utils

import {PREFIX} from "../../config";

const Images = () => {
  const accessToken = store.get(`${PREFIX}access_token`);

  const {data: {allImages = []} = {}} = useQuery(GET_IMAGES, {
    context: {
      headers: {
        authorization: accessToken
      }
    }
  });

  console.log(allImages);

  const imagesContent = (
    allImages ? allImages.map(({image, id}) => {
      const imgPathArr = image.split('/');
      const imgName = imgPathArr[imgPathArr.length - 1];

      return (
        <Col key={id} xs={12} sm={6} md={4} lg={3} className="mb-2">
          <img className="w-100 d-block" src={require(`@images/${imgName}`).default} alt="img"/>
        </Col>
      );
    }) : (
      <p>
        No images
      </p>
    )
  );

  return (
    <Row className="mt-2">
      {imagesContent}
    </Row>
  );
};

export default Images;