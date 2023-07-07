document.getElementById('sensitivityToggle').addEventListener('change', function () {
    const sensitivitySection = document.getElementById('sensitivitySection');
    if (this.checked) {
        sensitivitySection.classList.remove('hidden');
    } else {
        sensitivitySection.classList.add('hidden');
    }
});

document.getElementById('generateText').addEventListener('click', function() {
    let outputText = [];
    const sensitivities = {
        soundSensitivity: {
            label: '音の過敏さがあります。',
            options: ['earMuffs', 'noiseCancellingEarphones', 'earPlugs', 'digitalEarPlugs'],
            accommodation: 'を使用したいと考えています。',
            editingRequired: true,
        },
        visualSensitivity: {
            label: '視覚の過敏さがあります。',
            options: ['lightShieldGlasses'],
            accommodation: 'を使用したいと考えています。',
            editingRequired: true,
        },
        tasteSensitivity: {
            label: '味覚の過敏さがあります。',
            options: ['foodChange'],
            accommodation: 'したいと考えています。',
            editingRequired: true,
        },
        smellSensitivity: {
            label: '嗅覚の過敏さがあります。',
            options: ['placeChange'],
            accommodation: 'の着用を考えています。',
            editingRequired: true,
        },
        touchSensitivity: {
            label: '触覚の過敏さがあります。',
            options: ['clothesChange'],
            accommodation: 'を考えています。',
            editingRequired: true,
        },
    };

    for (let key in sensitivities) {
        const sensitivity = sensitivities[key];
        if (document.getElementById(key).checked) {
            const options = sensitivity.options.map(option => document.getElementById(option));
            const selectedOptions = options.filter(option => option.checked);
            if (selectedOptions.length > 0 && sensitivity.editingRequired) {
                const optionsText = selectedOptions.map(option => option.nextElementSibling.textContent.trim()).join('、');
                const itemsText = `そのため、${optionsText}${sensitivity.accommodation}`;
                outputText.push(`${sensitivity.label}${itemsText}`);
            } else {
                outputText.push(sensitivity.label);
            }
        }
    }

    document.getElementById('output').innerHTML = outputText.join('<br>');
});
