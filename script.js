// 大きなカテゴリに対応するトグルのidと、そのトグルが制御するセクションのid
const categories = {
    sensitivityToggle: 'sensitivitySection',
    communicationToggle: 'communicationSection',
    readingWritingToggle: 'readingWritingSection',
    lgbtqToggle: 'lgbtqSection',
};

// 大きなカテゴリのトグルの変更に対応するリスナーの設定
for (let toggleId in categories) {
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
            options: ['lightShieldGlasses', 'SunGlasses'],
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
            options: ['deviceUse', 'writingCommunication', 'proxySpeaking', 'listenToEnd', 'provideClarification'],
            accommodation: 'ことを希望しています。',
            
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
            accommodation: 'の配慮を希望しています。',
        },
        sexualOrientation: {
            label: '特定の性的指向を持っています。',
            options: ['outingProhibitionSexual'],
            accommodation: '配慮を希望しています。',
        },
    };
    
    const categoriesData = {
        sensitivities: sensitivities,
        communications: communications,
        lgbtq: lgbtq,
        readingWriting: readingWriting  // 読み書きのカテゴリデータを追加
    };     

    for (let categoryId in categoriesData) {
        const category = categoriesData[categoryId];
        for (let key in category) {
            const item = category[key];
            const labelText = item.label;
            if (document.getElementById(key).checked) {
                const options = item.options.map(option => document.getElementById(option));
                const selectedOptions = options.filter(option => option.checked);
                const optionsText = selectedOptions.map(option => option.nextElementSibling.textContent.trim()).join('、');
                if (optionsText !== "") {
                    outputText.push(`${labelText} そのため、${optionsText}${item.accommodation}`);
                } else {
                    outputText.push(labelText);
                }
            }
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

  // ダークモードの切り替えを処理する関数
  function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
  }

  // ダークモードの自動切り替えを検出する関数
  function detectDarkMode() {
    var darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkModeMediaQuery.matches) {
      var body = document.body;
      body.classList.add("dark-mode");
    }
  }

  // ページの読み込み完了時に自動切り替えの検出を行う
  window.addEventListener("DOMContentLoaded", detectDarkMode);