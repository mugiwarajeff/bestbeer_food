export default interface routerType {
    title: string,
    path: string,
    element: JSX.Element;
    childrens ?: routerType[]
    // eslint-disable-next-line semi
}