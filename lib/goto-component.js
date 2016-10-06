'use babel';

import GotoComponentView from './goto-component-view';
import { CompositeDisposable } from 'atom';

export default {

  gotoComponentView: null,
  modalPanel: null,
  subscriptions: null,
  config: {
    templatePath: {
      type: 'string',
      default: '<%= projectPath %>/client/app/pods/components',
    },
    fileName: {
      type: 'string',
      default: 'template.hbs',
    }
  },

  activate(state) {
    this.gotoComponentView = new GotoComponentView(state.gotoComponentViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gotoComponentView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'goto-component:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gotoComponentView.destroy();
  },

  serialize() {
    return {
      gotoComponentViewState: this.gotoComponentView.serialize()
    };
  },

  toggle() {
    const PROJ_PLACEHOLDER = '<%= projectPath %>';

    const workspace = atom.workspace;
    const editor = workspace.getActiveTextEditor();
    const firstCursor = editor.getCursors()[0];
    const lineText = firstCursor.getCurrentBufferLine().trim();
    const projectPath = atom.project.getPaths()[0];
    let customPath = atom.config.get('goto-component.templatePath');
    let customFileName = atom.config.get('goto-component.fileName');

    if (customPath.indexOf(PROJ_PLACEHOLDER) >= 0) {
      customPath = customPath.replace(PROJ_PLACEHOLDER, projectPath);
    }

    let text, componentName, destination;

    if (lineText.indexOf(' ') >= 0) {
      text = lineText.split(' ')[0].trim();
    } else {
      text = lineText.trim();
    }

    if (text.indexOf('{{#') >= 0 ) {
      componentName = text.replace('{{#', '');
    } else {
      componentName = text.replace('{{', '');
    }

    destination = customPath+'/'+componentName+'/'+customFileName;
    workspace.open(destination);
  }

};
