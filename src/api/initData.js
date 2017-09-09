const initData = () => (
    fetch('http://192.168.131.2/api/')// eslint-disable-line
    .then(res => res.json())
);

export default initData;
