import * as React from 'react';
import Box from '@mui/system/Box';
import '../WebsiteStyle.css';
export default function BoxBasic({content}) {
  return (
    <Box component="section" className='mybox' >
      {content}
    </Box>
  );
}

