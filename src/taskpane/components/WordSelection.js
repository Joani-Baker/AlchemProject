export default function WordSelection(onCustomPropertySaved) {
  
    const keywords = [
    "security",
    "discrete",
    "prohibited",
    "sanctioned",
    "secret",
    "classified",
    "restricted",
    "confidential",
    "sensitive",
    "top secret",
    "unclassified",
    "unrestricted",
    "unconfidential",
    "unsanctioned",
    "unsanctioned",
    "unprohibited",
];

    Word.run(async (context) => {
        const paragraphs = context.document.body.paragraphs;
        paragraphs.load("items");

        await context.sync();

        const customProps = context.document.properties.customProperties;
        customProps.load();
        await context.sync() 

        const matches = [];
        const foundWords = [];

        // Find paragraphs with target keywords
        paragraphs.items.forEach((para, index) => {
            const text = para.text.toLowerCase();

            const matchedWords = keywords.filter((word) => text.includes(word));
            if (matchedWords.length >0){
                matches.push({ paragraph: para, index });
                foundWords.push(...matchedWords)
            }
        });

        if (matches.length === 0) {
            console.log("No matching keywords found.");
            return;
        }

        console.log(foundWords);

        foundWords.forEach((word, index) => {
            customProps.add(`Tag${index + 1}`, word);
        });

        await context.sync();

        console.log(`${matches.length} matching paragraph(s) found.`);

        if (onCustomPropertySaved){
            onCustomPropertySaved();
        }
    });

  
    
}