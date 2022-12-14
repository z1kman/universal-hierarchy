// import documentation from "./documentation.mdx";

import { Block } from './index'

export default {
  title: 'Block',
  component: Block,
  parameters: {
  },
  args: { ...Block.defaultProps },
}

const Template = (args) => <Block {...args} />

export const Default = Template.bind({})
Default.args = {}
