import React, { useState, useEffect } from 'react';
import { Service } from '@/utils/service-helpers/service-base';
import ServiceDisplay from './ServiceDisplay';
import { UserIdentity } from '@supabase/supabase-js';
import { createServiceIdentityPairs } from '@/utils/functions';
import { supabase } from '@/lib/supabase';

interface ServicePanelProps {
  currentService?: Service;
}

/**
 * Displays the services of the app, where the active service is on the left,
 * while all other services are on the right. Users can interact with any
 * service to log in and view their profile.
 *
 * @param currentService The service data of the website that the user is on
 * @returns The UI for all of the services of the app.
 */
function ServicePanel({ currentService }: Readonly<ServicePanelProps>) {
  const [servicePairs, setServicePairs] = useState<
    Array<{ service: Service; identity?: UserIdentity }>
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await supabase.getSession();
        const identities = response.data.session?.user?.identities ?? [];
        setServicePairs(createServiceIdentityPairs(identities));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const alternativeServices = servicePairs.filter(
    (pair) => pair.service.name !== currentService?.name,
  );

  return (
    <div className="flex flex-row items-center justify-center m-2">
      {currentService && (
        <>
          <ServiceDisplay
            service={currentService}
            identity={
              servicePairs.find(
                (pair) => pair.service.name === currentService.name,
              )?.identity
            }
          />
          <div className="border-r h-20 mx-4 border-gray-300" />
        </>
      )}
      <div className="flex flex-col items-center justify-center">
        {alternativeServices.map(({ service, identity }, index) => (
          <React.Fragment key={service.name}>
            <ServiceDisplay service={service} identity={identity} />
            {index < alternativeServices.length - 1 && (
              <div className="border-t w-full my-2 border-gray-300" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ServicePanel;
