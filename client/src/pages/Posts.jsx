import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import store from 'store';

// HOC
import { withAuth } from '../HOC';

// Components
import { Post, Loader } from '../components';

// Queries
import { GET_POSTS_QUERY, ADD_POST_MUTATION, EDIT_POST_MUTATION } from '../apollo/queries/posts';

import { PREFIX } from '../config';

const Posts = ({ children }) => {
  const acessToken = store.get(`${PREFIX}access_token`);

  const [entry, setEntry] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (entry) {
      setPostData({ ...entry });
    } else {
      setPostData({
        title: '',
        content: '',
      });
    }
  }, [entry]);

  const { data: { allPosts = [] } = {}, loading, error } = useQuery(GET_POSTS_QUERY, {
    context: {
      headers: {
        authorization: acessToken
      },
    },
  });

  const [addPost] = useMutation(ADD_POST_MUTATION);
  const [editPost] = useMutation(EDIT_POST_MUTATION);

  const handleChange = ({ target: { name, value } }) => {
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (id, title, content) => {
    setEntry({ editPostId: id, content, title });
  };

  const handleEditCancel = () => {
    setEntry(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (entry) {
      editPost({
        variables: {
          ...postData,
        },
        context: {
          headers: {
            authorization: acessToken,
          },
        },
        refetchQueries: [GET_POSTS_QUERY],
      });
    } else {
      addPost({
        variables: {
          ...postData,
        },
        context: {
          headers: {
            authorization: acessToken,
          },
        },
        refetchQueries: [GET_POSTS_QUERY],
      });
    }

    if (entry) {
      setEntry(null);
    }

    setPostData({
      title: '',
      content: '',
    });
  };

  const postsContent = (
    allPosts && !!allPosts.length && allPosts.map((post) => {
      return (
        <Post
          key={post.id}
          content={post.content}
          title={post.title}
          id={post.id}
          onEdit={handleEdit}
        />
      );
    })
  );

  console.log(allPosts);

  return (
    <div className="pt-2">
      <Container>
        <Row>
          <Col md={12} lg={8}>
            <div className="border rounded p-4">
              {loading ? (
                <Loader />
              ) : (
                postsContent
              )}
            </div>
          </Col>
          <Col md={12} lg={4}>
            <div className="border rounded p-4">
              <h4>Add a post</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Control onChange={handleChange} type="text" name="title" placeholder="Title" required value={postData.title} />
                <Form.Control onChange={handleChange} type="text" name="content" placeholder="Content" required className="my-2" value={postData.content} />
                <Button type="submit" variant="primary">{entry ? 'Save' : 'Add'}</Button>
                {entry && <Button onClick={handleEditCancel} type="button" variant="secondary" className="ms-2">Cancel</Button>}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withAuth(Posts);