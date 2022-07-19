import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import store from 'store';

// Queries
import { DELETE_POST_MUTATION, GET_POSTS_QUERY } from '../../apollo/queries/posts';

import { PREFIX } from '../../config';

const Post = ({
  title,
  content,
  id,
  onEdit,
}) => {
  const acessToken = store.get(`${PREFIX}access_token`);

  const [deletePost] = useMutation(DELETE_POST_MUTATION);

  const handleDelete = () => {
    deletePost({
      variables: {
        deletePostId: id
      },
      context: {
        headers: {
          authorization: acessToken,
        },
      },
      refetchQueries: [GET_POSTS_QUERY],
    });
  };

  return (
    <Card border="primary" className="mb-2">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {content}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <Link to={`/posts/${id}`}>Read more</Link>
        <div>
          <Button onClick={() => onEdit(id, title, content)} variant="outline-info me-2">
            <i class="far fa-edit"></i>
          </Button>
          <Button onClick={handleDelete} variant="outline-danger">
            <i class="far fa-trash-alt"></i>
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Post;