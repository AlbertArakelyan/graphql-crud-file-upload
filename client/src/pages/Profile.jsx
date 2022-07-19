import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import store from 'store';

// Components
import { Loader, Avatar } from '../components';

// Queries
import { getMeQuery } from '../apollo/queries/users';

import { PREFIX } from '../config';

const Profile = () => {
  const acessToken = store.get(`${PREFIX}access_token`);

  const { data: { me = {} } = {}, loading, error } = useQuery(getMeQuery, {
    context: {
      headers: {
        authorization: acessToken
      },
    },
  });

  console.log(me);

  return (
    <div className="pt-2">
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col sm={12} md={10}>
              <p>
                <b>Username: </b> {me.username}
              </p>
              <p>
                <b>E-mail: </b> {me.email}
              </p>
            </Col>
            <Col sm={12} md={2}>
              <div>
                <Avatar className="w-100 d-block" />
              </div>
              <label className="mt-2 d-block btn btn-secondary" htmlFor="avatar">
                Upload photo
                <input type="file" hidden id="avatar" />
              </label>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Profile;