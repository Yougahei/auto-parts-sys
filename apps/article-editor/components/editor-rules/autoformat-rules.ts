import {
    autoformatArrow,
    autoformatLegal,
    autoformatLegalHtml,
    autoformatMath,
    autoformatPunctuation,
    AutoformatRule,
    autoformatSmartQuotes,
} from "@udecode/plate-autoformat";

import { autoformatBlocks } from "./autoformat-blocks";
import { autoformatIndentLists } from "./autoformat-indent-lists";
import { autoformatMarks } from "./autoformat-marks";

export const autoformatRules: AutoformatRule[] = [
    ...autoformatBlocks,
    ...autoformatIndentLists,
    ...autoformatMarks,
    ...autoformatSmartQuotes,
    ...autoformatPunctuation,
    ...autoformatLegal,
    ...autoformatLegalHtml,
    ...autoformatArrow,
    ...autoformatMath,
];
