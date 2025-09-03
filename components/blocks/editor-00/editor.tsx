"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, SerializedEditorState } from "lexical";

import { SharedAutocompleteContext } from "@/components/editor/context/shared-autocomplete-context";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";

import { nodes } from "./nodes";
import { Plugins } from "./plugins";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
}: {
  readonly editorState?: EditorState;
  readonly editorSerializedState?: SerializedEditorState;
  readonly onChange?: (editorState: EditorState) => void;
  readonly onSerializedChange?: (
    editorSerializedState: SerializedEditorState
  ) => void;
}) {
  return (
    <div className="w-full rounded-md border border-input bg-transparent shadow-xs focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] transition-[color,box-shadow] overflow-hidden">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <SharedAutocompleteContext>
            <Plugins />

            <OnChangePlugin
              ignoreSelectionChange={true}
              onChange={(editorState) => {
                onChange?.(editorState);
                onSerializedChange?.(editorState.toJSON());
              }}
            />
          </SharedAutocompleteContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
