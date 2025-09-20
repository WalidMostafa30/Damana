import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicationConfiguration } from "../../store/appConfig/appConfigSlice";
import LoadingPage from "../Loading/LoadingPage";

const AppConfigLoader = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.appConfig);

  useEffect(() => {
    dispatch(fetchApplicationConfiguration());
  }, [dispatch]);

  if (loading || !data) return <LoadingPage />;

  return children;
};

export default AppConfigLoader;
