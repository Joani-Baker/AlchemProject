import { useState, useEffect } from "react";

export default async function WordSelection(onCustomPropertySaved) {
  
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
    "unprohibited",
];

        Word.run(async (context) => {
        const paragraphs = context.document.body.paragraphs;
        paragraphs.load("items");

        await context.sync();

        const matches = [];
        const foundWords = [];

        // Find paragraphs with target keywords
        paragraphs.items.forEach((para, index) => {
            const text = para.text.toLowerCase();
            const matchedWords = keywords.filter((word) => text.includes(word));
            if (matchedWords.length >0){
                matches.push({ paragraph: para.text, index });
                foundWords.push(...matchedWords);
                }
        });
        const uniqueWords = Array.from(new Set(foundWords))
         console.log(`${matches.length} matching paragraph(s) found.`);

        if (onCustomPropertySaved){onCustomPropertySaved(uniqueWords);

        }
    })
}

    
    
