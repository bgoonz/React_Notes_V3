import React from 'react';
import Button from 'react-md/lib/Buttons';

const FeatureWebsite = ({ website }) => (
  <Button raised primary href={website} target="_blank">
    Visit Website
  </Button>
);

export default FeatureWebsite;
