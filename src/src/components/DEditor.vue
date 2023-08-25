<template>
  <div class="d-editor">
    <div class="d-editor-header mb-2" v-if="editable && editor">
      <div class="d-flex">
        <d-btn-toggle :value="header">
          <d-btn icon style="border-radius: 5px;" @click="formatParagraph">
            <d-icon> mdi-format-letter-case </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="format('h1')">
            <d-icon> mdi-format-header-1 </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="format('h2')">
            <d-icon> mdi-format-header-2 </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="format('h3')">
            <d-icon> mdi-format-header-3 </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="format('h4')">
            <d-icon> mdi-format-header-4 </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="format('h5')">
            <d-icon> mdi-format-header-5 </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="format('h6')">
            <d-icon> mdi-format-header-6 </d-icon>
          </d-btn>
        </d-btn-toggle>

        <v-divider vertical />

        <d-btn-toggle :value="formatting" :multiple="true">
          <d-btn icon style="border-radius: 5px;" @click="formatText('bold')">
            <d-icon> mdi-format-bold </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="formatText('italic')">
            <d-icon> mdi-format-italic </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="formatText('underline')">
            <d-icon> mdi-format-underline </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="formatText('strikethrough')">
            <d-icon> mdi-format-strikethrough </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="formatText('code')">
            <d-icon> mdi-code-tags </d-icon>
          </d-btn>
        </d-btn-toggle>

        <v-divider vertical />

        <d-btn-toggle :value="align">
          <d-btn icon style="border-radius: 5px;" @click="formatElement('left')">
            <d-icon> mdi-format-align-left </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="formatElement('center')">
            <d-icon> mdi-format-align-center </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="formatElement('right')">
            <d-icon> mdi-format-align-right </d-icon>
          </d-btn>
          <d-btn icon style="border-radius: 5px;" @click="formatElement('justify')">
            <d-icon> mdi-format-align-justify </d-icon>
          </d-btn>
        </d-btn-toggle>
      </div>
      <v-divider />
    </div>

    <div ref="editor" class="d-editor-input" :contenteditable="editable">

    </div>
  </div>
</template>

<script lang="ts">
import { isNumber } from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { $getSelection, createEditor, LexicalEditor, LineBreakNode, ParagraphNode, TextNode, FORMAT_TEXT_COMMAND, RangeSelection, $isRangeSelection, $createParagraphNode, TextFormatType, FORMAT_ELEMENT_COMMAND, ElementFormatType } from "lexical";
import { HeadingNode, $createHeadingNode, HeadingTagType, $isHeadingNode, registerRichText } from "@lexical/rich-text";
import { $wrapLeafNodesInElements } from "@lexical/selection";
import { $getNearestNodeOfType } from "@lexical/utils";
import { $isListNode, ListNode } from "@lexical/list";

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
      underline: 'editor-text-underline',
      strikethrough: 'editor-text-strikethrough',
      code: 'editor-text-code',
    }
  },
  nodes: [
    HeadingNode,
    LineBreakNode,
    ParagraphNode,
    TextNode
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

  @Prop({ required: false, default: () => [] })
  parameters!: { [key: string]: string };

  editor: LexicalEditor | null = null;

  header: number = 0;
  formatting: number[] = [];
  align: number = 0;

  innerEditableValue: string = "";
  innerValue: string = "";

  mounted(): void {
    this.innerValue = this.value;
    this.innerEditableValue = this.value;

    this.editor = createEditor(config);
    this.editor.setRootElement(this.$refs.editor as HTMLElement);

    registerRichText(this.editor, !!this.value && this.value || null);

    this.editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        this.innerValue = JSON.stringify(editorState.toJSON());
        if (this.editable) {
          this.$emit("input", this.innerValue);
        }

        const selection = $getSelection() as RangeSelection;

        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode()
          const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow()

          const elementKey = element.getKey();
          const elementDOM = this.editor!.getElementByKey(elementKey);

          this.header = -1;

          if (elementDOM !== null) {
            if ($isListNode(element)) {
              const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
              const type = parentList ? parentList.getListType() : element.getListType();

              if (isNumber(type)) {
                this.header = type;
              }
            }
            else {
              const type = $isHeadingNode(element) ? element.getTag() : element.getType();

              if (type in types) {
                const known = types[type];
                if (isNumber(known)) {
                  this.header = known;
                }
              }
            }
          }

          this.formatting = [];
          if (selection.hasFormat("bold")) {
            this.formatting.push(0);
          }
          if (selection.hasFormat("italic")) {
            this.formatting.push(1);
          }
          if (selection.hasFormat("underline")) {
            this.formatting.push(2);
          }
          if (selection.hasFormat("strikethrough")) {
            this.formatting.push(3);
          }
          if (selection.hasFormat("code")) {
            this.formatting.push(4);
          }
        }
      });
    });
    this.editor.setEditable(this.editable);
    this.replaceParameters();
  }

  formatParagraph(): void {
    if (!this.editor) {
      return;
    }
    this.editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapLeafNodesInElements(selection, () => $createParagraphNode());
      }
    });
  }

  format(type: HeadingTagType): void {
    if (!this.editor) {
      return;
    }
    this.editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapLeafNodesInElements(selection, () => $createHeadingNode(type));
      }
    });
  }

  formatText(type: TextFormatType): void {
    if (!this.editor) {
      return;
    }
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  }

  formatElement(type: ElementFormatType): void {
    if (!this.editor) {
      return;
    }
    this.editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, type);
  }

  replaceParameters(): void {
    if (!this.editor) {
      return;
    }
    if (this.editable) {
      registerRichText(this.editor, !!this.innerEditableValue && this.innerEditableValue || null);
    }
    else {
      this.innerEditableValue = this.innerValue;
      if (!!this.innerValue && this.innerValue) {
        const value = JSON.parse(this.innerValue);
        const regex = new RegExp(Object.keys(this.parameters).join("|"),"gi");
        
        for (const node of value.root.children) {
          this.replaceParametersInNode(node, regex)
        }
        registerRichText(this.editor, JSON.stringify(value));
      }
    }
  }

  replaceParametersInNode(node: any, regex: RegExp): void {
    if (node != null) {
      if (node.text != null) {
        node.text = node.text.replace(regex, (match: any) =>  this.parameters[match]);
      }
      if (node.children != null) {
        for (const child of node.children) {
          this.replaceParametersInNode(child, regex)
        }
      }
    }
  }

  @Watch("value")
  onValueChange(): void {
    if (this.value !== this.innerValue && this.editor != null) {
      this.innerValue = this.value;
      registerRichText(this.editor!, !!this.value && this.value || null);
      this.replaceParameters();
    }
  }

  @Watch("editable")
  onEditableChange(): void {
    if (!this.editor) {
      return;
    }
    this.editor.setEditable(this.editable);
    this.replaceParameters();
  }
}

</script>

<style scoped>
::v-deep .editor-text-underline {
  text-decoration: underline;
}

::v-deep .editor-text-strikethrough {
  text-decoration: line-through;
}

::v-deep .editor-text-underline.editor-text-strikethrough {
  text-decoration: underline line-through;
}
</style>