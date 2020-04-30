import components from '../components/index'

export const renderComponent = (componentEntry, i) => {
  if (components[componentEntry]) {
    const Component = components[componentEntry]
    return <Component key={i} />
  }
}
