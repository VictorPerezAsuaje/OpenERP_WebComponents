loadSampleCodes();

function toggleSlotVisibility(cardId, slotName) {
    const card = document.getElementById(cardId);
    card.shadowRoot.querySelector(`slot[name=${slotName}]`).toggleAttribute("hidden");
}