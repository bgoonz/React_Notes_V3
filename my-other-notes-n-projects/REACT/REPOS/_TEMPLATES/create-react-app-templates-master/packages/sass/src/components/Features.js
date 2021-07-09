import React, { Component } from 'react';
import { Card, CardText, CardTitle } from 'react-md/lib/Cards';
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList';

import Feature from './Feature';
import FeatureWebsite from './FeatureWebsite';
import features from '../assets/data/features.json';

class Features extends Component {
  createExpansionPanelFooter(website) {
    return (
      <footer style={{ padding: 24, textAlign: 'right' }}>
        <FeatureWebsite website={website} />
      </footer>
    );
  }

  render() {
    const featurePanels = features.map((feature, index) => {
      let { website, ...featureProps } = feature;
      const footer = this.createExpansionPanelFooter(website);

      featureProps = { ...featureProps, footer };

      return <Feature key={index} {...featureProps} />;
    });

    return (
      <Card>
        <CardTitle
          title="Features"
          subtitle="Main packages included with this template"
        />
        <CardText>
          <p>
            For a comprehensive list, refer to the dependencies listed in the
            package.json file.
          </p>
          <ExpansionList>{featurePanels}</ExpansionList>
        </CardText>
      </Card>
    );
  }
}

export default Features;
