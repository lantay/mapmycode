'use babel'

import MapmycodeView from './mapmycode-view'
import { CompositeDisposable } from 'atom'

export default {

  mapmycodeView: null,
  modalPanel: null,
  subscriptions: null,

  activate (state) {
    this.mapmycodeView = new MapmycodeView(state.mapmycodeViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.mapmycodeView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mapmycode:toggle': () => this.toggle()
    }))
  },

  deactivate () {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.mapmycodeView.destroy()
  },

  serialize () {
    return {
      mapmycodeViewState: this.mapmycodeView.serialize()
    }
  },

  toggle () {
    console.log('Mapmycode was toggled!')
    return (
      this.modalPanel.isVisible()
      ? this.modalPanel.hide()
      : this.modalPanel.show()
    )
  }

}
