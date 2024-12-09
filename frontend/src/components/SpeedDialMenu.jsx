import React from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Search as SearchIcon, Print as PrintIcon, CameraAlt as ScanIcon } from '@mui/icons-material';

const SpeedDialMenu = () => {
  const actions = [
    { icon: <SearchIcon />, name: 'Search', onClick: () => console.log('Search action clicked') },
    { icon: <ScanIcon />, name: 'Scan', onClick: () => console.log('Scan action clicked') },
    { icon: <PrintIcon />, name: 'Print', onClick: () => console.log('Print action clicked') },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial menu"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialMenu;