import { Routes, Route } from 'react-router-dom';

// Components
import { Header } from './components';

// Pages
import {
  Auth,
  Posts,
  PostDetails,
  Profile,
    SimpleUpload,
} from './pages';


const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/simple-upload" element={<SimpleUpload/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
