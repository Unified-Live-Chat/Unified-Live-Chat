import Button from '@mui/material/Button';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { createClient, Provider } from '@supabase/supabase-js'
import { storage } from 'wxt/storage';

const supabaseUrl = import.meta.env.WXT_SUPABASE_URL
const supabaseAnonKey = import.meta.env.WXT_SUPABASE_ANON_KEY

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
  )

export async function authenticate(provider: Provider, scopes: string) {
  storage.setItem('session:provider', provider)
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: chrome.identity.getRedirectURL(),
      scopes: scopes
    },
  });
  if (error) throw error;

  await chrome.tabs.create({ url: data.url });
}

export const OAuthButton = styled(Button)({
    color: grey[800],
    border: '1px solid',
    borderColor: grey[200],
    backgroundColor: grey[100],
    fontWeight: 500,
    '&:hover': {
      backgroundColor: grey[100],
      borderColor: grey[300],
    },
    '&:active': {
      backgroundColor: blue,
      border: '1px solid',
    },
    '&:focus': {
      outline: 'none',
    },
    textTransform: 'none',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    margin: 10,
    flex: 'none',
    width: 'auto',
});
