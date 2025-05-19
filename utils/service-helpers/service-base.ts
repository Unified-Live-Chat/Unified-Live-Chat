import { Provider } from '@supabase/supabase-js';
import { ComponentType, SVGProps } from 'react';
import { PopupSupabaseClient } from '@/lib/supabase';

export class Service {
  name: string;
  providerName: string;
  url: URL;
  scopes: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  authIcon: ComponentType<SVGProps<SVGSVGElement>>;
  provider?: Provider;
  authenticate?: (
    supabase: PopupSupabaseClient,
    provider: Provider,
    scopes: string,
  ) => Promise<void>;
  constructor(
    name: string,
    providerName: string,
    url: URL,
    scopes: string,
    icon: ComponentType<SVGProps<SVGSVGElement>>,
    authIcon: ComponentType<SVGProps<SVGSVGElement>>,
    provider?: Provider,
    authenticate?: (
      supabase: PopupSupabaseClient,
      provider: Provider,
      scopes: string,
    ) => Promise<void>,
  ) {
    this.name = name;
    this.providerName = providerName;
    this.url = url;
    this.scopes = scopes;
    this.icon = icon;
    this.authIcon = authIcon;
    this.provider = provider;
    this.authenticate = authenticate;
  }
}
