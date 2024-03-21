import { autoformatMarks } from "./autoformat-marks";
import { autoformatBlocks } from "./autoformat-blocks";
import {
    autoformatArrow,
    autoformatLegal,
    autoformatLegalHtml,
    autoformatMath,
    autoformatPunctuation,
    autoformatSmartQuotes,
} from '@udecode/plate-autoformat';
import { MyAutoformatRule } from "./plate-types";
import { autoformatIndentLists } from "./autoformat-indent-lists";

export const autoformatRules = [
    ...autoformatBlocks,
    ...autoformatIndentLists,
    ...autoformatMarks,
    ...(autoformatSmartQuotes as MyAutoformatRule[]),
    ...(autoformatPunctuation as MyAutoformatRule[]),
    ...(autoformatLegal as MyAutoformatRule[]),
    ...(autoformatLegalHtml as MyAutoformatRule[]),
    ...(autoformatArrow as MyAutoformatRule[]),
    ...(autoformatMath as MyAutoformatRule[]),
];
