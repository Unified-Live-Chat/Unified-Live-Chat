import { Provider } from '@supabase/supabase-js';
import { ComponentType, SVGProps } from 'react';

export class Service {
  name: string;
  providerName: string;
  url: URL;
  scopes: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  authIcon: ComponentType<SVGProps<SVGSVGElement>>;
  provider?: Provider;
  authenticate?: () => Promise<void>;
  revoke?: () => Promise<void>;
  constructor(
    name: string,
    providerName: string,
    url: URL,
    scopes: string,
    icon: ComponentType<SVGProps<SVGSVGElement>>,
    authIcon: ComponentType<SVGProps<SVGSVGElement>>,
    provider?: Provider,
    authenticate?: () => Promise<void>,
    revoke?: () => Promise<void>,
  ) {
    this.name = name;
    this.providerName = providerName;
    this.url = url;
    this.scopes = scopes;
    this.icon = icon;
    this.authIcon = authIcon;
    this.provider = provider;
    this.authenticate = authenticate;
    this.revoke = revoke;
  }
}
