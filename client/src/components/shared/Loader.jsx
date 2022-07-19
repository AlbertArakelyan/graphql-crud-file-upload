import { Spinner } from "react-bootstrap";


const Loader = () => {
  return (
    <div className="text-center py-2">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;