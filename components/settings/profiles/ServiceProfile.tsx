interface ServiceProfileProps {
  service: Service;
}

/**
 * Allows the user to manage a specific account they have
 * connected to the app.
 *
 * @param service the service for the account.
 * @returns the component for managing the service's account
 */
function ServiceProfile({ service }: ServiceProfileProps) {
  return (
    <div className="flex flex-row space-x-1 items-center my-2">
      {/* Service icon display */}
      <service.icon className="w-13 h-13 mx-2" />

      <p className="mx-2 font-semibold text-base">{service.name}</p>
    </div>
  );
}

export default ServiceProfile;
