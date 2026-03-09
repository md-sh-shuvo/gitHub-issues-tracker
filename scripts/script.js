

const handleTab = (e) => {
    const tabs =  document.querySelectorAll('.tab')
    tabs.forEach(tab => {
        tab.classList.remove('active')
    })
    e.target.classList.add('active')
}