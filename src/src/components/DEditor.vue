<template>
  <div class="d-editor">
    <div class="d-editor-header mb-2" v-if="editable && editor">
      <v-row no-gutters>
        <d-btn-toggle :value="header" active-class="test">
          <d-btn @click="formatParagraph">
            <v-icon>mdi-format-letter-case</v-icon>
          </d-btn>

          <d-btn @click="format('h1')">
            <v-icon>mdi-format-header-1</v-icon>
          </d-btn>

          <d-btn @click="format('h2')">
            <v-icon>mdi-format-header-2</v-icon>
          </d-btn>

          <d-btn @click="format('h3')">
            <v-icon>mdi-format-header-3</v-icon>
          </d-btn>

          <d-btn @click="format('h4')">
            <v-icon>mdi-format-header-4</v-icon>
          </d-btn>

          <d-btn @click="format('h5')">
            <v-icon>mdi-format-header-5</v-icon>
          </d-btn>

          <d-btn @click="format('h6')">
            <v-icon>mdi-format-header-6</v-icon>
          </d-btn>
        </d-btn-toggle>

        <v-divider vertical />

        <d-btn-toggle :value="formatting" :multiple="true">
          <d-btn @click="formatText('bold')">
            <v-icon>mdi-format-bold</v-icon>
          </d-btn>

          <d-btn @click="formatText('italic')">
            <v-icon>mdi-format-italic</v-icon>
          </d-btn>

          <d-btn @click="formatText('underline')">
            <v-icon>mdi-format-underline</v-icon>
          </d-btn>
        </d-btn-toggle>
      </v-row>
      <v-divider />
    </div>

    <div ref="editor" class="d-editor-input" :contenteditable="editable">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";


import {
  $getSelection,
  createEditor,
  LexicalEditor,
  LineBreakNode,
  ParagraphNode,
  TextNode,
  FORMAT_TEXT_COMMAND,
  RangeSelection,
  $isRangeSelection,
  $createParagraphNode,
TextFormatType,
} from 'lexical';

import {
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode
} from '@lexical/list'

import {
  $wrapLeafNodesInElements,
} from '@lexical/selection'

import { HeadingNode, registerRichText, $createHeadingNode, HeadingTagType, $isHeadingNode } from "@lexical/rich-text"
import { isNumber } from "lodash";

const types: { [index: string]: number | string } = {
  bullet: 'Bulleted List',
  check: 'Check List',
  code: 'Code Block',
  paragraph: 0,
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
  number: 'Numbered List',
  quote: 'Quote',
};

const config = {
  namespace: 'MyEditor',
  theme: {
    ltr: 'ltr',
    rtl: 'rtl',
    placeholder: 'editor-placeholder',
    paragraph: 'text-body-1',
    quote: 'editor-quote',
    heading: {
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      h4: 'text-h4',
      h5: 'text-h5',
      h6: 'text-h6',
    },
    list: {
      nested: {
        listitem: 'editor-nested-listitem',
      },
      ol: 'editor-list-ol',
      ul: 'editor-list-ul',
      listitem: 'editor-listitem',
    },
    image: 'editor-image',
    link: 'editor-link',
    text: {
      bold: 'editor-text-bold',
      italic: 'editor-text-italic',
      overflowed: 'editor-text-overflowed',
      hashtag: 'editor-text-hashtag',
      underline: 'text-underline',
      strikethrough: 'editor-text-strikethrough',
      underlineStrikethrough: 'editor-text-underlineStrikethrough',
      code: 'editor-text-code',
    }
  },
  nodes: [
    TextNode,
    LineBreakNode,
    ParagraphNode,
    HeadingNode
  ],
  readonly: false,
  onError: console.error
};

@Component({
  inheritAttrs: false,
  data: () => ({ FORMAT_TEXT_COMMAND })
})
export default class DEditor extends Vue {
  @Prop({ required: false, default: "" })
  value!: string;

  @Prop({ required: false, default: false })
  editable!: boolean;

  editor: LexicalEditor | null = null;

  formatting: number[] = []
  header: number = 0

  mounted() {
    this.editor = createEditor(config);
    this.editor.setRootElement(this.$refs.editor as HTMLElement);

    registerRichText(this.editor, !!this.value && this.value || null);

    this.editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        this.$emit("input", editorState.toJSON());

        const selection = $getSelection() as RangeSelection;

        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode()
          const element
            = anchorNode.getKey() === 'root'
              ? anchorNode
              : anchorNode.getTopLevelElementOrThrow()

          const elementKey = element.getKey();
          const elementDOM = this.editor!.getElementByKey(elementKey);

          this.header = -1;

          if (elementDOM !== null) {
            if ($isListNode(element)) {
              const parentList = $getNearestNodeOfType<ListNode>(
                anchorNode,
                ListNode,
              );
              const type = parentList
                ? parentList.getListType()
                : element.getListType();

                if (isNumber(type)) this.header = type;
            }
            else {
              const type = $isHeadingNode(element)
                ? element.getTag()
                : element.getType();

              if (type in types) {
                const known = types[type];
                if (isNumber(known)) this.header = known;
              }
            }
          }

          this.formatting = [];
          if (selection.hasFormat("bold")) {
            this.formatting.push(0)
          }
          if (selection.hasFormat("italic")) {
            this.formatting.push(1)
          }
          if (selection.hasFormat("underline")) {
            this.formatting.push(2)
          }
        }
      });
    });

    this.editor.setReadOnly(!this.editable);
  }

  format(type: HeadingTagType) {
    if (!this.editor) return;
    this.editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection))
        $wrapLeafNodesInElements(selection, () => $createHeadingNode(type))
    })
  }

  formatParagraph() {
    if (!this.editor) return;
    this.editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection))
        $wrapLeafNodesInElements(selection, () => $createParagraphNode())
    })
  }

  formatText(type: TextFormatType){
    if (!this.editor) return;
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  }

  @Watch("editable")
  onEditableChanged() {
    if (!this.editor) return;

    this.editor.setReadOnly(!this.editable);
  }
}

</script>