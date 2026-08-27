import { Navigate, Outlet } from 'react-router';
import { useConfigurationStore } from '../../stores/configuration.store.ts';

function RequiredConfigurationLayout() {
  const isConfigured = useConfigurationStore(state => state.configuration?.isConfigured);
    
  if (!isConfigured) {
    return <Navigate to="/configuration" replace />;
  }

  return <Outlet />;
}

export default RequiredConfigurationLayout;
