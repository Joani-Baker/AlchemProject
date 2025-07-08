import { useState, useEffect } from "react";

export default async function WordSelection(onCustomPropertySaved) {
  
    const keywords = [
    "banana",
    "apple",
    "cherry",
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
    "unprohibited",
];

        Word.run(async (context) => {
        const paragraphs = context.document.body.paragraphs;
        paragraphs.load("items");
        await context.sync()
        for( let para of paragraphs.items){
            para.load("Range")};
        await context.sync();
        
        const matches = [];
        const foundWords = [];
        // Find paragraphs with target keywords
        for( let i=0; i < paragraphs.items.length; i ++) {
            const para = paragraphs.items[i];
            
            const text = para.text.toLowerCase();
            
            const matchedWords = keywords.filter((word) => text.includes(word));
            matches.push({ paragraph: para.text, i });
            foundWords.push(...matchedWords);  
      
            for(let word of matchedWords){  
                para.load("Range");
                await context.sync();                       
                const selectedWords = para.search(word, {matchCase: false, matchWholeWord: true});
                
                selectedWords.load("items");
                await context.sync();
                selectedWords.items.forEach((range) =>{
                    range.font.underline = Word.UnderlineType.single;
                    range.font.color = "green";
                    });
                await context.sync();

            };

        };
        const uniqueWords = Array.from(new Set(foundWords))
        console.log(`${matches.length} matching paragraph(s) found.`);
        const numberOfWords = uniqueWords.length;

        if (onCustomPropertySaved){onCustomPropertySaved(uniqueWords, numberOfWords);

        }
    })
}

    
    
