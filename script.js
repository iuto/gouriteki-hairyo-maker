// 大きなカテゴリに対応するトグルのidと、そのトグルが制御するセクションのid
const categories = {
    sensitivityToggle: 'sensitivitySection',
    communicationToggle: 'communicationSection',
    readingWritingToggle: 'readingWritingSection',
    lgbtqToggle: 'lgbtqSection',
    visualCharacteristicsToggle: 'visualCharacteristicsSection'
};

// 大きなカテゴリのトグルの変更に対応するリスナーの設定
for (let toggleId in categories) {
    console.log('Setting up listener for', toggleId); // 追加
    const sectionId = categories[toggleId];
    document.getElementById(toggleId).addEventListener('change', function () {
        const section = document.getElementById(sectionId);
        if (this.checked) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

document.getElementById('generateText').addEventListener('click', function() {
    let outputText = [];
    const sensitivities = {
        soundSensitivity: {
            label: '音の過敏さがあります。',
            options: ['earMuffs', 'noiseCancellingEarphones', 'earPlugs', 'digitalEarPlugs'],
            accommodation: 'を使用したいと考えています。',
            
        },
        visualSensitivity: {
            label: '視覚の過敏さがあります。',
            options: ['lightShieldGlasses', 'SunGlasses', 'ColorNote'],
            accommodation: 'を使用したいと考えています。',
            
        },
        tasteSensitivity: {
            label: '味覚の過敏さがあります。',
            options: ['foodChange'],
            accommodation: 'したいと考えています。',
            
        },
        smellSensitivity: {
            label: '嗅覚の過敏さがあります。',
            options: ['placeChange'],
            accommodation: 'の着用を考えています。',
            
        },
        touchSensitivity: {
            label: '触覚の過敏さがあります。',
            options: ['clothesChange'],
            accommodation: 'を考えています。',
            
        },
    };

    const communications = {
        japaneseDifficulty: {
            label: '日本語で話すことが苦手です。',
            options: ['translationService', 'simpleJapanese'],
            accommodation: 'を使用して話したいと考えています。',

        },
        interpretDifficulty: {
            label: '話の意図を汲み取ることが難しいです。',
            options: ['directExpression'],
            accommodation: 'ことを希望しています。',  
        },
        speakingDifficulty: {
            label: '声に出して話すことが難しいです。',
            options: ['useDevice', 'writeConversation', 'speakForMe', 'doNotInterrupt', 'supplementWhenSpeaking'],
            accommodation: 'ことを希望しています。',
        },
    };

    const visualCharacteristics = {
        colorCharacteristic: {
            label: '色覚特性があります。',
            options: ['colorUniversalDesign'],
            accommodation: 'を使用してほしいと考えています。',

        },
        difficultySeeingFar: {
            label: '遠くが見えづらいです。',
            options: ['locationChange'],
            accommodation: 'を希望しています。',  
        },
        speakingDifficulty: {
            label: '視野の範囲が狭いです。',
            
        },           
    };

    const readingWriting = {
        readingDifficulty: {
            label: '読むことが苦手です。',
            options: ['largeText', 'readForMe'],
            accommodation: 'の配慮を希望しています。',
        },
        writingDifficulty: {
            label: '書くことが苦手です。',
            options: ['deviceUseWriting', 'writeForMe'],
            accommodation: 'の配慮を希望しています。',
        },
    };
      

    const lgbtq = {
        genderIdentity: {
            label: '性別違和があります。',
            options: ['hairStyleDressing', 'toiletUse', 'changingRoom', 'surnameUse', 'nicknameUse', 'outingProhibition'],
            accommodation: '配慮を希望しています。',
        },
        sexualOrientation: {
            label: '特定の性的指向を持っています。',
            options: ['outingProhibitionSexual'],
            accommodation: '配慮を希望しています。',
        },
    };

    const categoriesData = {
        sensitivities: { label: '感覚過敏/感覚鈍麻', data: sensitivities },
        visualCharacteristics: { label: '視覚特性', data: visualCharacteristics },
        communications: { label: 'コミュニケーション', data: communications },
        lgbtq: { label: 'LGBTQ+', data: lgbtq },
        readingWriting: { label: '読み書き', data: readingWriting }
    };     
    
    for (let categoryId in categoriesData) {
        const category = categoriesData[categoryId];
        let categoryItems = [];
        for (let key in category.data) {
            const item = category.data[key];
            const labelText = item.label;
            if (document.getElementById(key).checked) {
                if (item.options) { // options property の存在を確認する
                    const options = item.options.map(option => document.getElementById(option));
                    const selectedOptions = options.filter(option => option.checked);
                    const optionsText = selectedOptions.map(option => option.nextElementSibling.textContent.trim()).join('、');
                    if (optionsText !== "") {
                        categoryItems.push(`${labelText} そのため、${optionsText}${item.accommodation}`);
                    } else {
                        categoryItems.push(labelText);
                    }
                } else {
                    categoryItems.push(labelText); // options property が存在しない場合でも labelText を追加する
                }
            }
        }
        if (categoryItems.length > 0) {
            outputText.push(`・${category.label}<br>${categoryItems.join('<br>')}<br>`);
        }
    }       

    document.getElementById('generateText').addEventListener('click', function() {
});

document.getElementById('output').innerHTML = outputText.join('<br>');
    document.getElementById('outputContainer').classList.remove('hidden');
    const text = document.getElementById('output').innerHTML;

    navigator.clipboard.writeText(text)
        .then(function() {
            console.log('テキストがコピーされました');
        })
        .catch(function(err) {
            console.error('テキストのコピー中にエラーが発生しました:', err);
        });
});

document.getElementById('downloadPDF').addEventListener('click', function(){
    var element = document.getElementById('outputContainer');

    // 一時的に非表示にする
    var buttonsToHide = document.querySelectorAll('#copyText, #downloadPDF');
    buttonsToHide.forEach(button => button.style.display = 'none');

    var opt = {
        margin:       1,
        filename:     'output.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
        // PDFをダウンロードした後で再度表示する
        pdf.save();
        buttonsToHide.forEach(button => button.style.display = '');
    });
});

// create an array of objects with the id, trigger element (eg. button), and the content element
const accordionItems = [
    {
        id: 'accordion-example-heading-1',
        triggerEl: document.querySelector('#accordion-example-heading-1'),
        targetEl: document.querySelector('#accordion-example-body-1'),
        active: true
    },
    {
        id: 'accordion-example-heading-2',
        triggerEl: document.querySelector('#accordion-example-heading-2'),
        targetEl: document.querySelector('#accordion-example-body-2'),
        active: false
    },
    {
        id: 'accordion-example-heading-3',
        triggerEl: document.querySelector('#accordion-example-heading-3'),
        targetEl: document.querySelector('#accordion-example-body-3'),
        active: false
    }
];