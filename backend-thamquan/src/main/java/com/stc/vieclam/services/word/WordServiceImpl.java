package com.stc.vieclam.services.word;

import com.aspose.words.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.InputStream;
import java.rmi.ServerException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;


/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 15:47
 * Filename  : WordServiceImpl
 */
@Slf4j
@Service
public class WordServiceImpl implements WordService {
    private final MessageSource messageSource;

    private DateFormat dateFormat = new SimpleDateFormat("hh:mm dd/MM/yyyy");

    @Value("${file.download_dir}")
    private String download;

    public WordServiceImpl(MessageSource messageSource) {
        this.messageSource = messageSource;
    }


    /***
     *
     * @param startCell : Cell bắt đầu merge
     * @param endCell   : merge đến cell
     */
    // Util methods
    public static void mergeCells(Cell startCell, Cell endCell) {
        Table parentTable = startCell.getParentRow().getParentTable();

        // Find the row and cell indices for the start and end cell.
        Point startCellPos = new Point(startCell.getParentRow().indexOf(startCell), parentTable.indexOf(startCell.getParentRow()));
        Point endCellPos = new Point(endCell.getParentRow().indexOf(endCell), parentTable.indexOf(endCell.getParentRow()));
        // Create the range of cells to be merged based off these indices. Inverse each index if the end cell if before the start cell.
        Rectangle mergeRange = new Rectangle(Math.min(startCellPos.x, endCellPos.x), Math.min(startCellPos.y, endCellPos.y), Math.abs(endCellPos.x - startCellPos.x) + 1,
                Math.abs(endCellPos.y - startCellPos.y) + 1);

        for (Row row : parentTable.getRows()) {
            for (Cell cell : row.getCells()) {
                Point currentPos = new Point(row.indexOf(cell), parentTable.indexOf(row));

                // Check if the current cell is inside our merge range then merge it.
                if (mergeRange.contains(currentPos)) {
                    if (currentPos.x == mergeRange.x)
                        cell.getCellFormat().setHorizontalMerge(CellMerge.FIRST);
                    else
                        cell.getCellFormat().setHorizontalMerge(CellMerge.PREVIOUS);

                    if (currentPos.y == mergeRange.y)
                        cell.getCellFormat().setVerticalMerge(CellMerge.FIRST);
                    else
                        cell.getCellFormat().setVerticalMerge(CellMerge.PREVIOUS);
                }
            }
        }
    }//ExEnd:mergeCells

    public static void insertDocument(Node insertAfterNode, Document srcDoc) throws Exception {
        // Make sure that the node is either a paragraph or table.
        if ((insertAfterNode.getNodeType() != NodeType.PARAGRAPH) & (insertAfterNode.getNodeType() != NodeType.TABLE))
            throw new IllegalArgumentException("The destination node should be either a paragraph or table.");

        // We will be inserting into the parent of the destination paragraph.
        CompositeNode dstStory = insertAfterNode.getParentNode();

        // This object will be translating styles and lists during the import.
        NodeImporter importer = new NodeImporter(srcDoc, insertAfterNode.getDocument(), ImportFormatMode.USE_DESTINATION_STYLES);

        // Loop through all sections in the source document.
        for (Section srcSection : srcDoc.getSections()) {
            // Loop through all block level nodes (paragraphs and tables) in the body of the section.
            for (Node srcNode : (Iterable<Node>) srcSection.getBody()) {
                // Let's skip the node if it is a last empty paragraph in a section.
                if (srcNode.getNodeType() == (NodeType.PARAGRAPH)) {
                    Paragraph para = (Paragraph) srcNode;
                    if (para.isEndOfSection() && !para.hasChildNodes())
                        continue;
                }

                // This creates a clone of the node, suitable for insertion into the destination document.
                Node newNode = importer.importNode(srcNode, true);
                // Insert new node after the reference node.
                dstStory.insertAfter(newNode, insertAfterNode);
                insertAfterNode = newNode;
            }
        }
    }

    private void applyLicense() throws Exception {
        Locale locale = LocaleContextHolder.getLocale();
        try {
            InputStream inLicense = new ClassPathResource("/licenses/license.xml").getInputStream();
            License license = new License();
            license.setLicense(inLicense);
        } catch (Exception e) {
            throw new ServerException(messageSource.getMessage("error.license", null, locale));
        }
    }
}
