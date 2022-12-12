// import documentation from "./documentation.mdx";

import { PinnedBlock } from './index'

export default {
  title: 'PinnedBlock',
  component: PinnedBlock,
  parameters: {
    // docs: {
    //   page: documentation,
    // },
  },
  args: { ...PinnedBlock.defaultProps },
}

const Template = (args) => <PinnedBlock {...args} />

export const Default = Template.bind({})
Default.args = {}
