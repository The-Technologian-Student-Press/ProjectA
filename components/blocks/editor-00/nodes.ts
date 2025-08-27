import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from "lexical";
import { AutocompleteNode } from "@/components/editor/nodes/autocomplete-node";

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    AutocompleteNode,
  ];
