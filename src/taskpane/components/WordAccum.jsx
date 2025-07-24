import {removeStopwords} from "stopword";

export default async function WordAccum(){

     return await Word.run(async (context) => {
        const para = context.document.body.paragraphs;
        para.load("items");
        await context.sync()

        const frequencyDict = {};

        for( let p of para.items){
            const range = p.getRange();
            p.load("text")
        };

        await context.sync();
        const maxValues = [];

        for (let word of para.items){
            const range = word.getRange();
            range.load("text");
            await context.sync();
            const rawText = range.text;
            const allwords = rawText.toLowerCase().replace(/[^\w\s]/g,"").replace(/\s+/g, " ").split(" "); 
            const words = removeStopwords(allwords);
            
            for(const word of words){
                
                if(word.length === 0) continue;
                frequencyDict[word] = (frequencyDict[word]|| 0) + 1;
            }
        }
        

        const mostFreq = Object.entries(frequencyDict).sort((a,b)=> b[1] - a[1]).slice(0,3)
        console.log(mostFreq);
        
        return (mostFreq);
    }) 
    
}