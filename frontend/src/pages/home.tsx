
import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { showCustomFeedbackToast, showLoadingIndicator } from "../redux/actions";
import { useAppDispatch } from "../hooks";
const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      showCustomFeedbackToast(
        "Welcome to my hybrid Django-React project",
        "info",
      ),
    );
  }, []);
  const load = () => {
    dispatch(showLoadingIndicator(true));
    setTimeout(() => {
        dispatch(showLoadingIndicator(false));
    }, 3000);

  };
  return (
    
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4">My Bootstrapped Hybrid Django-React Project</h1>
      <Button variant="primary" size="lg" onClick={load}>
        Test Loader
      </Button>
    </Container>
  );
};

export default Home;
