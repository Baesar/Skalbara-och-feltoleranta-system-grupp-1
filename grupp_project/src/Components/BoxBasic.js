import * as React from 'react';
import Box from '@mui/system/Box';

export default function BoxBasic() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
      This Box renders as an HTML section element.
    </Box>

  );
}

