import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from "lexical";
import { AutocompleteNode } from "@/components/editor/nodes/autocomplete-node";

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [ParagraphNode, TextNode, AutocompleteNode];
