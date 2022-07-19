import { Container, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import store from 'store';

// Components
import { Loader } from '../components';

// Queries
import { GET_POST_QUERY } from '../apollo/queries/posts';

import { PREFIX } from '../config';


const PostDetails = () => {
  const acessToken = store.get(`${PREFIX}access_token`);

  const { postId } = useParams();
  const { data: { post = {} } = {}, loading } = useQuery(GET_POST_QUERY, {
    variables: {
      postId,
    },
    context: {
      headers: {
        authorization: acessToken
      },
    },
  });

  console.log(post);

  return (
    !loading ? (
      <div className="pt-2">
        <Container>
          <Link className="mb-2 d-inline-block" to="/posts">&lt;- Back to posts</Link>
          <div className="border border-primary rounded p-3">
            <h2 className="text-primary mb-0">{post?.title}</h2>
          </div>
          <div className="border border-primary rounded p-3 mt-2">
            <p className="text-primary">
              <b>Content: </b> {post?.content}
            </p>
            <div className="text-primary">
              <p className="mb-0">
                <b>Author:</b>
              </p>
              <p className="mb-0">
                <i>Username: </i> {post?.author?.username}
              </p>
              <p>
                <i>Email: </i> {post?.author?.email}
              </p>
            </div>
            {/* Todo Add Other posts */}
          </div>
        </Container>
      </div>
    ) : (
      <Loader />
    )
  );
};

export default PostDetails;