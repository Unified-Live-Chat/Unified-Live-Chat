import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BaseSettingsPanel } from '@/components/settings/BaseSettingsPanel';
import ServiceProfile from './ServiceProfile';
import { UserIdentity } from '@supabase/supabase-js';
import { Service } from '@/utils/service-helpers/service-base';
import { createServiceIdentityPairs } from '@/utils/functions';

export const ProfilesPanel: React.FC = () => {
  const [identityPairs, setIdentityPairs] = useState<
    Array<{ service: Service; identity?: UserIdentity }>
  >([]);
  const [identityCount, setIdentityCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabaseUser = await supabase.getUser();
        const identities = supabaseUser.data.user?.identities ?? [];
        setIdentityPairs(createServiceIdentityPairs(identities));
        setIdentityCount(identities.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const sortedIdentityPairs = identityPairs.toSorted((a, b) => {
    if (a.service.name === 'YouTube') return -1;
    if (b.service.name === 'YouTube') return 1;
    return 0;
  });

  return (
    <BaseSettingsPanel title="Connected Accounts">
      {sortedIdentityPairs.map(({ service, identity }, index) => (
        <React.Fragment key={service.name}>
          <ServiceProfile
            service={service}
            identity={identity}
            identityCount={identityCount}
          />
          {index < sortedIdentityPairs.length - 1 && (
            <div className="border-t border-gray-300 w-full" />
          )}
        </React.Fragment>
      ))}
    </BaseSettingsPanel>
  );
};
