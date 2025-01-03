import Button from '@mui/material/Button';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

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