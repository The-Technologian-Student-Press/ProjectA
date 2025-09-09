import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { AutocompletePlugin } from "@/components/editor/plugins/autocomplete-plugin";
import { ActionsPlugin } from "@/components/editor/plugins/actions/actions-plugin";
import { CounterCharacterPlugin } from "@/components/editor/plugins/actions/counter-character-plugin";
import { ImportExportPlugin } from "@/components/editor/plugins/actions/import-export-plugin";

export function Plugins() {
  return (
    <div className="relative w-full">
      {/* Editor Toolbar - Only History (Undo/Redo) */}
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="editor-toolbar">
            <div className="editor-toolbar-group">
              <HistoryToolbarPlugin />
            </div>
          </div>
        )}
      </ToolbarPlugin>

      {/* Editor Content */}
      <div className="relative bg-transparent w-full">
        <RichTextPlugin
          contentEditable={
            <div className="editor-content">
              <div className="">
                <ContentEditable
                  placeholder={"Start typing ..."}
                  className="ContentEditable__root relative block min-h-full overflow-auto px-3 py-2 focus:outline-none bg-transparent box-border text-base md:text-sm selection:bg-primary selection:text-primary-foreground"
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
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
