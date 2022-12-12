// import documentation from "./documentation.mdx";

import { Item } from './index'

export default {
  title: 'Item',
  component: Item,
  parameters: {
    // docs: {
    //   page: documentation,
    // },
  },
  args: { ...Item.defaultProps },
}

const Template = (args) => <Item {...args} />

export const Default = Template.bind({})
Default.args = {}
