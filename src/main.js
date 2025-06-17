const DELAY = 2000;

const targets = [
    'Accéder',
    'valider',
    'question suivante',
];

const domaine = () => {
    return window.location.hostname;
}

const urlHasParams = (param) => {
    const params = new URLSearchParams(window.location.search);
    return params.has(param) || params.get(param) !== null;
}

const reduce = (txt) => {
    return txt.trim().toLowerCase();
}

if (domaine() === 'prepmyfuture.com' && urlHasParams('user_exercise_id')) {
    setInterval(() => {
        const buttons = [
            ...document.querySelectorAll('.btn.btn-primary'),
            ...document.querySelectorAll('button[type="submit"]')
        ];

        buttons.forEach(button => {
            const text = button?.textContent || button?.value || '';
            const hasText = targets.some(targetText => reduce(text).includes(reduce(targetText)));

            console.log(`Checking button: ${text}`);

            if (hasText) {
                button.click();
                console.log(`Button clicked: ${text}`);
            } else {
                console.log(`Button not clicked: ${text} (does not match targets)`);
            }
        });
    }, DELAY);
}