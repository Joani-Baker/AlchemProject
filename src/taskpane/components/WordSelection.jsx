async function fetchContent(word){
    try{
        const graphQlResponse = await fetch("https://graphql.demo.alchemtechnologies.com/graphql", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                "x-api-key":"da2-foajkjzytjeszgrjxcu3r5updu"
            },
            body: JSON.stringify({
                query: `query {
                    validateCompliance(
                        ips: ["${word}"],
                        external_url: "https://alchemtech.sharepoint.com/sites/IFS-External-Demo-B",
                        doc_name: "myfile.eng",
                        user_email: "tom@alchemtechnologies.com"
                    ) {
                        validation_status
                        ips
                        missing_ips
                    }
                }`
            })
        });
        const data = await graphQlResponse.json();
        return data;
    } catch(error) {
        console.log(error);
        return null;

    }
}

export default async function WordSelection(onCustomPropertySaved) {
  
    const keywords = [
        "IP0192",
        "IP0308",
        "IP0261",
        "IP0309",

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
            
            const text = para.text;
            const matchedWords = keywords.filter((word) => text.includes(word));
            matches.push({ paragraph: para.text, i });
            foundWords.push(...matchedWords);  
      
            for(let word of matchedWords){  
                console.log(word);                      
                const selectedWords = para.search(word, {matchCase: false, matchWholeWord: true});
                console.log("calling end point");
                const validationResponse = await fetchContent(word);
                console.log(validationResponse)
                if (validationResponse.data.validateCompliance.validation_status != "Success"){
                    selectedWords.load("items");
                    await context.sync();
                    selectedWords.items.forEach((range) =>{
                        range.font.underline = Word.UnderlineType.single;
                        range.font.color = "green";
                    });     
                }
            };
        };
        await context.sync(); 
        const uniqueWords = Array.from(new Set(foundWords))
        console.log(`${matches.length} matching paragraph(s) found.`);
        const numberOfWords = uniqueWords.length;

        if (onCustomPropertySaved){onCustomPropertySaved(uniqueWords, numberOfWords);

        }
    })
}



    
    
