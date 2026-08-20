const allElements = document.querySelectorAll('*');

allElements.forEach(element => changeStyle(element));

function changeStyle(el) {
    const styles = window.getComputedStyle(el)

    if (styles) {
        if (styles.backgroundColor){
            el.style.backgroundColor = "#242424"
        }
        el.style.color = "#F0F0F0"
    }
}