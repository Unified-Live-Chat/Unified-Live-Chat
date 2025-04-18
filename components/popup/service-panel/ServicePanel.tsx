import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Service, Services } from '@/utils/constants';
import ServiceDisplay from './ServiceDisplay';

interface ServicePanelProps {
  currentService?: Service;
}

/**
 * Displays the services of the app, where the active service is on the left,
 * while all other services are on the right. Users can interact with any
 * service to log in and view their profile.
 *
 * @param currentService The service data of the website that the user is on.
 * @returns The UI for all of the services of the app.
 */
function ServicePanel({ currentService }: ServicePanelProps) {
  const alternativeServices = Object.values(Services).filter(
    (service) => service.name !== currentService?.name,
  );

  return (
    <div className="flex flex-row items-center justify-center">
      {currentService && (
        <>
          <ServiceDisplay service={currentService} />
          <Separator orientation="vertical" decorative className="min-h-full" />
        </>
      )}
      <div className="flex flex-col items-center justify-center">
        {alternativeServices.map((service, index) => (
          <React.Fragment key={service.name}>
            <ServiceDisplay service={service} />
            {index < alternativeServices.length - 1 && (
              <Separator
                orientation="horizontal"
                decorative
                className="min-w-full"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ServicePanel;
