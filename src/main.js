const DELAY = 2000;
const DOMAIN = 'prepmyfuture.com';
const STORAGE_KEY = 'autoClickEnabled';

const targets = ['Accéder', 'valider', 'question suivante'];

const domaine = () => window.location.hostname;

const urlHasParams = (payload) => {
    const params = new URLSearchParams(window.location.search);
    if (typeof payload === 'string') return params.has(payload);
    if (Array.isArray(payload)) return payload.some(p => params.has(p));
};

const reduce = (txt) => txt.trim().toLowerCase();

const runInterval = () => {
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
                console.log(`Button not clicked: ${text}`);
            }
        });
    }, DELAY);
};

if (domaine() === DOMAIN && urlHasParams(['user_exercise_id', 'study_plan_activity_id', 'id'])) {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
        if (result[STORAGE_KEY]) {
            runInterval();
        } else {
            console.log('Auto click is disabled in storage.');
        }
    });
}
