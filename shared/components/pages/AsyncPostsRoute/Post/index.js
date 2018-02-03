import { asyncComponent } from 'react-async-component'

export default asyncComponent({
  resolve: () => System.import('./Post'),
  serverMode: 'boundary',
  name: 'Post',
})
