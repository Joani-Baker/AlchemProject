export default async function HeaderInsertion (){

    return await Word.run(async (context) => {
        context.document.sections 
            .getFirst()
            .getHeader(Word.HeaderFooterType.primary)
            .insertParagraph("CUI THIS IS THE CUI MARKING", Word.InsertLocation.end);
        
        context.document.sections
            .getFirst()
            .getFooter(Word.HeaderFooterType.primary)
            .insertParagraph("CUI", Word.InsertLocation.end);

        await context.sync();    
    })  
}