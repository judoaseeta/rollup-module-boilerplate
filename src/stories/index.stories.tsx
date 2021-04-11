import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import  HelloWorld, { HelloWorldProps } from '../';

export default {
  title: 'Hello World',
  component: HelloWorld,
  args : {
    name: 'judo'
  }
} as Meta;

const Template: Story<HelloWorldProps> = (args) => <HelloWorld {...args} />;

export const Primary = Template.bind({});
