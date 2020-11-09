const loading = (() => {
    const loading = document.createElement('h1');
    loading.id = 'loading';
    loading.innerText = 'Loading';

    return loading;
})();

export default loading;