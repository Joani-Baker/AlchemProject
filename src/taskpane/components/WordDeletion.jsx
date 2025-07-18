export default async function WordDeletion(itemsToDelete) {
  
        Word.run(async (context) => {
        const paragraphs = context.document.body.paragraphs;
        paragraphs.load("items");
        await context.sync()
        for( let para of paragraphs.items){
            para.load("Range")};
        await context.sync();
        
        const matches = [];
        const foundWords=[];
        // Find where items to delete are 
        for( let i=0; i < paragraphs.items.length; i ++) {
            const para = paragraphs.items[i];
            const text = para.text;
            console.log(itemsToDelete);
            const matchedWords = itemsToDelete.filter((word) => text.includes(word));
            matches.push({ paragraph: para.text, i });
            foundWords.push(...matchedWords);  
      
            for(let word of matchedWords){                        
                const selectedWords = para.search(word, {matchCase: false, matchWholeWord: true});
                
                selectedWords.load("items");
                await context.sync();
                selectedWords.items.forEach((item) =>{
                    item.delete();
                });
            };
        };
        await context.sync();
    });
}

    
    
