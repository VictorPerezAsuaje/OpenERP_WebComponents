loadSampleCodes();

function selectAll(checkboxItem) {
    checkboxItem.closest('table')
        .querySelectorAll(`input[id^='select_']`)
        .forEach(x => x.checked = checkboxItem.checked)
}