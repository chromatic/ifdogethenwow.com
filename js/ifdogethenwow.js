document.addEventListener('DOMContentLoaded', function(event) {
    const exampleButtons   = document.getElementById('exampleButtons');
    const buttonArray      = exampleButtons.querySelectorAll('button.exampleButton');
    const exampleCode      = document.getElementById('exampleCode').parentNode;
    const exampleForm      = document.getElementById('exampleForm').parentNode;
    const templates        = document.getElementById('codeTemplates');
    const exampleSection   = document.getElementById('actionCreation');

    for (let i = 0; i < buttonArray.length; i++) {
        const button = buttonArray[i];
        const templateName     = button.dataset.template;
        const templateCodeNode = templates.querySelectorAll('#' + templateName + 'Code');
        const templateFormNode = templates.querySelectorAll('#' + templateName + 'Form');
        templateCodeNode[0].innerHTML = JSON.stringify(JSON.parse(templateCodeNode[0].innerHTML), undefined, 4);

        button.addEventListener('click', (e) => {
            exampleSection.className = 'row';
            const replaceCodeChild = exampleCode.firstChild;
            exampleCode.replaceChild(templateCodeNode[0], replaceCodeChild);

            const replaceFormChild = exampleForm.firstChild;
            exampleForm.replaceChild(templateFormNode[0], replaceFormChild);

            exampleForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const data  = new FormData(event.target);
                const value = Object.fromEntries(data.entries());
                templateCodeNode[0].innerHTML = JSON.stringify(value, undefined, 4);
            });
        });
    }
});
