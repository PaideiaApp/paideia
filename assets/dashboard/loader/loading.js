let theme = localStorage.getItem('theme');
if (theme == "dark") {
    document.write(`
    <div id="spinner" class="dark">
        <img src="/assets/dashboard/img/load.gif">
    </div>
`);
} else {
    document.write(`
    <div id="spinner">
         <img src="/assets/dashboard/img/load.gif">
    </div>
`);
}