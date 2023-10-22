const toggleMenuState = (button) => {
    const sidebarMenuOverlay = document.getElementById("sidebarMenuOverlay");
    const sidebarMenu = document.getElementById("sidebarMenu");

    sidebarMenu.classList.toggle("-translate-x-64");
    sidebarMenuOverlay.classList.toggle("invisible");
    button.classList.toggle("translate-x-64");
}

const root = getComputedStyle(document.documentElement);

function updateStyleValueForToken(tokenName, value) {
    document.documentElement.style.setProperty(tokenName, value);
}

function getStyleValueForToken(tokenName) {
    return root.getPropertyValue(designTokens[tokenName])
}

function getStyleValueForTokens(tokenObjectName) {
    const currentThemeName = document.documentElement.getAttribute("data-theme") ?? "default";
    const theme = globalConfiguration.themes.filter(x => x.name == currentThemeName)[0];

    if (!theme) return;

    const requestedTokenList = theme[tokenObjectName]

    return Object.keys(requestedTokenList).map(x => {
        return {
            name: requestedTokenList[x],
            value: root.getPropertyValue(requestedTokenList[x])
        }
    });
}

function loadTokenTable(tableId, tokenObjectName) {
    let table = document.getElementById(tableId);

    getStyleValueForTokens(tokenObjectName).forEach(x => {
        let tr = document.createElement("tr");
        tr.className = "bg-white border-b";

        if (x.value.startsWith("#")) {
            tr.innerHTML = `
                    <td class="px-6 py-4">${x.name}</td>
                    <td class="px-6 py-4 flex flex-col">
                        <input type="color" value="${x.value}" oninput="updateStyleValueForToken('${x.name}' , this.value)"
                        onchange="this.nextElementSibling.textContent = this.value"
                        />
                        <span>${x.value}</span>
                    </td>
            `;
        }
        else {
            tr.innerHTML = `
                    <td class="px-6 py-4">${x.name}</td>
                    <td class="px-6 py-4 flex flex-col">
                        <input class="p-1" type="text" value="${x.value}" oninput="updateStyleValueForToken('${x.name}' , this.value)" />
                    </td>
            `;
        }


        table.tBodies[0].appendChild(tr);
    });
}

const copyTextContent = (itemId) => {
    const item = document.getElementById(itemId);
    navigator.clipboard.writeText(item.textContent.trim());
}

const setAttributeToExample = (sampleId, name, value) => {
    const sample = document.getElementById(sampleId);

    sample.setAttribute(name, value);
    document.getElementById('sampleCode').textContent = sample.outerHTML;
    Prism.highlightAll();
}

const loadSampleCodes = () => {
    document.querySelectorAll("[data-load-from]").forEach(x => {
        const sampleFrom = x.getAttribute("data-load-from");
        const sample = document.getElementById(sampleFrom);
        x.textContent = sample.innerHTML.replaceAll(` fouc="loaded"`, "").trim();
    });
}
