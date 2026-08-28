import { Navigate, Outlet } from 'react-router';
import { useConfigurationStore } from '../../stores/configuration.store.ts';

function RequiredConfigurationLayout() {
  const isValid = useConfigurationStore(state => state.configuration?.isValid);
    
  if (!isValid) {
    return <Navigate to="/configuration" replace />;
  }

  return <Outlet />;
}

export default RequiredConfigurationLayout;
