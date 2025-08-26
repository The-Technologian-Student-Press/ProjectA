import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { Menu, ChevronDown } from "lucide-react";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { ClearFormattingToolbarPlugin } from "@/components/editor/plugins/toolbar/clear-formatting-toolbar-plugin";
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { FontSizeToolbarPlugin } from "@/components/editor/plugins/toolbar/font-size-toolbar-plugin";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { LinkToolbarPlugin } from "@/components/editor/plugins/toolbar/link-toolbar-plugin";
import { SubSuperToolbarPlugin } from "@/components/editor/plugins/toolbar/subsuper-toolbar-plugin";
import { AutocompletePlugin } from "@/components/editor/plugins/autocomplete-plugin";
import { ActionsPlugin } from "@/components/editor/plugins/actions/actions-plugin";
import { CounterCharacterPlugin } from "@/components/editor/plugins/actions/counter-character-plugin";
import { ImportExportPlugin } from "@/components/editor/plugins/actions/import-export-plugin";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      {/* Desktop Toolbar */}
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="editor-toolbar">
            {/* Block Format Group */}
            <div className="editor-toolbar-group editor-toolbar-dropdown">
              <BlockFormatDropDown>
                <FormatParagraph />
                <FormatHeading levels={["h1", "h2", "h3"]} />
                <FormatNumberedList />
                <FormatBulletedList />
                <FormatCheckList />
                <FormatQuote />
              </BlockFormatDropDown>
            </div>

            <div className="editor-toolbar-separator editor-toolbar-dropdown" />

            {/* Text Format Group */}
            <div className="editor-toolbar-group editor-toolbar-dropdown">
              <FontFormatToolbarPlugin format="bold" />
              <FontFormatToolbarPlugin format="italic" />
              <FontFormatToolbarPlugin format="underline" />
              <FontFormatToolbarPlugin format="strikethrough" />
            </div>

            <div className="editor-toolbar-separator editor-toolbar-dropdown" />

            {/* Font Size Group */}
            <div className="editor-toolbar-group editor-toolbar-dropdown">
              <FontSizeToolbarPlugin />
            </div>

            <div className="editor-toolbar-separator editor-toolbar-dropdown" />

            {/* Alignment Group */}
            <div className="editor-toolbar-group editor-toolbar-dropdown">
              <ElementFormatToolbarPlugin />
            </div>

            <div className="editor-toolbar-separator editor-toolbar-dropdown" />

            {/* Special Format Group */}
            <div className="editor-toolbar-group editor-toolbar-dropdown">
              <SubSuperToolbarPlugin />
              <LinkToolbarPlugin />
            </div>

            <div className="editor-toolbar-separator editor-toolbar-dropdown" />

            {/* History Group */}
            <div className="editor-toolbar-group editor-toolbar-dropdown">
              <HistoryToolbarPlugin />
            </div>

            <div className="editor-toolbar-separator editor-toolbar-dropdown" />

            {/* Clear Format Group */}
            <div className="editor-toolbar-group editor-toolbar-dropdown">
              <ClearFormattingToolbarPlugin />
            </div>

            {/* Mobile Menu Button */}
            <div className="editor-toolbar-mobile">
              <Collapsible
                open={isMobileMenuOpen}
                onOpenChange={setIsMobileMenuOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Menu className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="editor-toolbar-mobile-menu">
                  {/* Block Format Mobile */}
                  <div className="editor-toolbar-mobile-group">
                    <div className="editor-toolbar-mobile-group-title">
                      Block Format
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <BlockFormatDropDown>
                        <FormatParagraph />
                        <FormatHeading levels={["h1", "h2", "h3"]} />
                        <FormatNumberedList />
                        <FormatBulletedList />
                        <FormatCheckList />
                        <FormatQuote />
                      </BlockFormatDropDown>
                    </div>
                  </div>

                  {/* Text Format Mobile */}
                  <div className="editor-toolbar-mobile-group">
                    <div className="editor-toolbar-mobile-group-title">
                      Text Format
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <FontFormatToolbarPlugin format="bold" />
                      <FontFormatToolbarPlugin format="italic" />
                      <FontFormatToolbarPlugin format="underline" />
                      <FontFormatToolbarPlugin format="strikethrough" />
                    </div>
                  </div>

                  {/* Font Size Mobile */}
                  <div className="editor-toolbar-mobile-group">
                    <div className="editor-toolbar-mobile-group-title">
                      Font Size
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <FontSizeToolbarPlugin />
                    </div>
                  </div>

                  {/* Alignment Mobile */}
                  <div className="editor-toolbar-mobile-group">
                    <div className="editor-toolbar-mobile-group-title">
                      Alignment
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <ElementFormatToolbarPlugin />
                    </div>
                  </div>

                  {/* Special Format Mobile */}
                  <div className="editor-toolbar-mobile-group">
                    <div className="editor-toolbar-mobile-group-title">
                      Special Format
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <SubSuperToolbarPlugin />
                      <LinkToolbarPlugin />
                    </div>
                  </div>

                  {/* History Mobile */}
                  <div className="editor-toolbar-mobile-group">
                    <div className="editor-toolbar-mobile-group-title">
                      History
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <HistoryToolbarPlugin />
                    </div>
                  </div>

                  {/* Clear Format Mobile */}
                  <div className="editor-toolbar-mobile-group">
                    <div className="editor-toolbar-mobile-group-title">
                      Clear Format
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <ClearFormattingToolbarPlugin />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        )}
      </ToolbarPlugin>

      {/* Editor Content */}
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="editor-content">
              <div className="" ref={onRef}>
                <ContentEditable
                  placeholder={"Start typing ..."}
                  className="ContentEditable__root relative block min-h-full overflow-auto px-4 py-3 focus:outline-none"
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <CheckListPlugin />
        <HistoryPlugin />
        <TabIndentationPlugin />
        <AutocompletePlugin />
      </div>

      {/* Actions Bar */}
      <ActionsPlugin>
        <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t bg-muted/30 p-2">
          <div className="flex flex-1 justify-start">
            {/* left side action buttons */}
          </div>
          <div className="flex items-center gap-2">
            <CounterCharacterPlugin charset="UTF-16" />
            {/* center action buttons */}
          </div>
          <div className="flex flex-1 justify-end">
            {/* right side action buttons */}
            <ImportExportPlugin />
          </div>
        </div>
      </ActionsPlugin>
    </div>
  );
}
